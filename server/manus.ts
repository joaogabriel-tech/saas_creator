/**
 * Manus AI Integration Router
 * 
 * Este módulo gerencia a integração com a API Manus para:
 * - Análise de vídeos de criadores de referência
 * - Geração de roteiros personalizados
 * - Descoberta de tendências diárias (Trend Hunter)
 */

import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";

// Configuração da API Manus
const MANUS_API_URL = "https://api.manus.im/v1";
const MANUS_API_KEY = process.env.MANUS_API_KEY || "";

if (!MANUS_API_KEY) {
  console.warn("⚠️  MANUS_API_KEY não configurada! Configure via webdev_request_secrets");
}

/**
 * Tipos de resposta da API Manus
 */
interface ManusTaskResponse {
  task_id: string;
  task_title: string;
  task_url: string;
  share_url?: string;
}

interface ManusTaskStatus {
  id: string;
  status: "pending" | "running" | "completed" | "failed";
  error?: string;
  output?: Array<{
    role: "user" | "assistant";
    content: Array<{
      type: "output_text" | "output_file";
      text?: string;
      fileUrl?: string;
    }>;
  }>;
  credit_usage?: number;
}

/**
 * Função auxiliar para chamar a API Manus
 */
async function callManusAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${MANUS_API_URL}${endpoint}`;
  
  console.log(`[Manus API] ${options.method || 'GET'} ${url}`);
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "API_KEY": MANUS_API_KEY,
        "Content-Type": "application/json",
        "Accept": "application/json",
        ...options.headers,
      },
    });

    console.log(`[Manus API] Response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[Manus API] Error response:`, errorText);
      throw new Error(`Manus API Error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    console.log(`[Manus API] Success:`, JSON.stringify(data).substring(0, 200));
    return data;
  } catch (error: any) {
    console.error(`[Manus API] Exception:`, error.message);
    throw error;
  }
}

/**
 * Polling para aguardar conclusão de tarefa
 */
async function waitForTaskCompletion(
  taskId: string,
  maxAttempts = 150,
  intervalMs = 2000
): Promise<ManusTaskStatus> {
  console.log(`[Manus] Iniciando polling para task ${taskId} (max ${maxAttempts} tentativas)`);
  
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const status = await callManusAPI<ManusTaskStatus>(`/tasks/${taskId}`, {
      method: "GET",
    });

    console.log(`[Manus] Tentativa ${attempt + 1}/${maxAttempts} - Status: ${status.status}`);

    if (status.status === "completed") {
      console.log(`[Manus] ✅ Tarefa completada! Créditos: ${status.credit_usage || 'N/A'}`);
      return status;
    }

    if (status.status === "failed") {
      console.error(`[Manus] ❌ Tarefa falhou:`, status.error);
      throw new Error(status.error || "Tarefa falhou sem mensagem de erro");
    }

    // Aguardar antes de tentar novamente
    await new Promise(resolve => setTimeout(resolve, intervalMs));
  }

  console.error(`[Manus] ⏱️  Timeout atingido após ${maxAttempts} tentativas`);
  throw new Error("Timeout: Tarefa não completou no tempo esperado");
}

/**
 * Extrair texto da resposta do assistente
 */
function extractAssistantResponse(task: ManusTaskStatus): string {
  if (!task.output || task.output.length === 0) {
    throw new Error("Nenhuma resposta encontrada na tarefa");
  }

  // Encontrar última mensagem do assistente
  const assistantMessages = task.output.filter(msg => msg.role === "assistant");
  
  if (assistantMessages.length === 0) {
    throw new Error("Nenhuma resposta do assistente encontrada");
  }

  const lastMessage = assistantMessages[assistantMessages.length - 1];
  
  // Extrair texto do conteúdo
  const textContent = lastMessage.content.find(c => c.type === "output_text");
  
  if (!textContent || !textContent.text) {
    throw new Error("Nenhum texto encontrado na resposta do assistente");
  }

  return textContent.text;
}

/**
 * Router tRPC para funcionalidades Manus
 */
export const manusRouter = router({
  /**
   * Analisar vídeo de criador de referência
   */
  analyzeReference: publicProcedure
    .input(
      z.object({
        videoUrl: z.string().url("URL do vídeo inválida"),
        niche: z.string().optional(),
        creatorName: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      console.log(`[Manus] Iniciando análise de referência:`, { videoUrl: input.videoUrl, niche: input.niche, creatorName: input.creatorName });
      
      // Construir prompt contextualizado
      const prompt = `
Analise este vídeo de criador de conteúdo e identifique:

1. **Tom e Estilo de Comunicação**: Como o criador se expressa? Formal, informal, humorístico, inspirador?
2. **Estrutura Narrativa**: Como o conteúdo é organizado? Gancho inicial, desenvolvimento, call-to-action?
3. **Padrões de Engajamento**: Quais técnicas usa para manter atenção? Perguntas, storytelling, edição dinâmica?
4. **Personalidade e Voz Única**: O que torna este criador único? Bordões, maneirismos, estilo visual?
5. **Público-Alvo**: Para quem este conteúdo é direcionado?

${input.niche ? `Nicho: ${input.niche}` : ""}
${input.creatorName ? `Nome do Criador: ${input.creatorName}` : ""}

Forneça uma análise detalhada e estruturada que possa ser usada para replicar o estilo deste criador.
      `.trim();

      // Criar tarefa na API Manus
      const createResponse = await callManusAPI<ManusTaskResponse>("/tasks", {
        method: "POST",
        body: JSON.stringify({
          prompt,
          agentProfile: "manus-1.6-max", // Perfil mais avançado para análise profunda
          attachments: [
            {
              url: input.videoUrl,
            },
          ],
          locale: "pt-BR",
        }),
      });

      console.log(`[Manus] Tarefa criada com sucesso! Task ID: ${createResponse.task_id}`);

      // Aguardar conclusão
      const completedTask = await waitForTaskCompletion(createResponse.task_id);

      // Extrair análise
      const analysis = extractAssistantResponse(completedTask);

      return {
        success: true,
        taskId: createResponse.task_id,
        analysis,
        creditUsage: completedTask.credit_usage || 0,
      };
    }),

  /**
   * Gerar roteiro baseado em análise de referência
   */
  generateScript: publicProcedure
    .input(
      z.object({
        theme: z.string().min(3, "Tema muito curto"),
        referenceAnalysis: z.string().optional(),
        previousTaskId: z.string().optional(),
        duration: z.enum(["short", "medium", "long"]).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const durationGuide = {
        short: "30-60 segundos (ideal para Shorts/Reels)",
        medium: "3-5 minutos (vídeo padrão YouTube)",
        long: "10-15 minutos (conteúdo aprofundado)",
      };

      const prompt = `
Gere um roteiro completo de vídeo sobre: "${input.theme}"

${input.referenceAnalysis ? `\n**Estilo de Referência:**\n${input.referenceAnalysis}\n` : ""}

${input.duration ? `**Duração:** ${durationGuide[input.duration]}` : ""}

O roteiro deve incluir:
1. **Gancho Inicial** (primeiros 3-5 segundos para capturar atenção)
2. **Introdução** (apresentação do tema e promessa de valor)
3. **Desenvolvimento** (conteúdo principal dividido em seções claras)
4. **Conclusão** (resumo e call-to-action)
5. **Sugestões de Edição** (cortes, transições, elementos visuais)

${input.referenceAnalysis ? "Mantenha o tom, estilo e estrutura identificados na análise de referência." : "Use um tom envolvente e acessível."}

Formate o roteiro de forma clara e pronta para gravação.
      `.trim();

      // Criar tarefa (com contexto se houver previousTaskId)
      const createResponse = await callManusAPI<ManusTaskResponse>("/tasks", {
        method: "POST",
        body: JSON.stringify({
          prompt,
          agentProfile: "manus-1.6",
          taskId: input.previousTaskId, // Multi-turn para manter contexto
          locale: "pt-BR",
        }),
      });

      // Aguardar conclusão
      const completedTask = await waitForTaskCompletion(createResponse.task_id);

      // Extrair roteiro
      const script = extractAssistantResponse(completedTask);

      return {
        success: true,
        taskId: createResponse.task_id,
        script,
        creditUsage: completedTask.credit_usage || 0,
      };
    }),

  /**
   * Buscar tendências diárias para geração de ideias
   */
  getDailyTrends: publicProcedure
    .input(
      z.object({
        niche: z.string().optional(),
        count: z.number().min(1).max(20).default(10),
      })
    )
    .mutation(async ({ input }) => {
      const prompt = `
Liste ${input.count} tendências de conteúdo em alta HOJE (${new Date().toLocaleDateString("pt-BR")}) ${input.niche ? `no nicho de ${input.niche}` : "em geral"}.

Para cada tendência, forneça:
1. **Título/Tema** (conciso e chamativo)
2. **Descrição** (2-3 frases explicando a tendência)
3. **Viral Score** (0-100, baseado em potencial de viralização)
4. **Justificativa do Score** (por que tem esse potencial)
5. **Categoria** (Para Você / Notícias / Evergreen)
6. **Ângulo de Conteúdo** (como abordar o tema de forma única)

Priorize tendências recentes, eventos atuais e tópicos com alto engajamento nas redes sociais.

Formate a resposta como JSON array:
\`\`\`json
[
  {
    "title": "...",
    "description": "...",
    "viralScore": 85,
    "justification": "...",
    "category": "Notícias",
    "angle": "..."
  }
]
\`\`\`
      `.trim();

      // Criar tarefa
      const createResponse = await callManusAPI<ManusTaskResponse>("/tasks", {
        method: "POST",
        body: JSON.stringify({
          prompt,
          agentProfile: "manus-1.6-lite", // Perfil mais rápido para tarefas simples
          locale: "pt-BR",
        }),
      });

      // Aguardar conclusão
      const completedTask = await waitForTaskCompletion(createResponse.task_id);

      // Extrair resposta
      const responseText = extractAssistantResponse(completedTask);

      // Tentar parsear JSON da resposta
      let trends = [];
      try {
        // Extrair JSON do markdown code block se presente
        const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/);
        const jsonText = jsonMatch ? jsonMatch[1] : responseText;
        trends = JSON.parse(jsonText);
      } catch (error) {
        console.error("Erro ao parsear trends JSON:", error);
        // Fallback: retornar resposta como texto
        trends = [
          {
            title: "Tendências do Dia",
            description: responseText,
            viralScore: 50,
            justification: "Análise gerada pela IA",
            category: "Para Você",
            angle: "Veja a análise completa",
          },
        ];
      }

      return {
        success: true,
        taskId: createResponse.task_id,
        trends,
        creditUsage: completedTask.credit_usage || 0,
      };
    }),

  /**
   * Verificar status de uma tarefa específica
   */
  getTaskStatus: publicProcedure
    .input(
      z.object({
        taskId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const status = await callManusAPI<ManusTaskStatus>(`/tasks/${input.taskId}`, {
        method: "GET",
      });

      return {
        taskId: input.taskId,
        status: status.status,
        completed: status.status === "completed",
        failed: status.status === "failed",
        error: status.error,
        creditUsage: status.credit_usage,
      };
    }),
});
