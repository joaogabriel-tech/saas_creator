# Integração API Manus - Documentação Completa

## 📋 Visão Geral

Este documento descreve a integração completa entre a plataforma KRYO e a API Manus para análise de vídeos, geração de roteiros e descoberta de tendências.

## 🏗️ Arquitetura

```
Frontend (React + tRPC)
    ↓
Backend (Express + tRPC)
    ↓
API Manus (https://api.manus.im/v1)
```

### Fluxo de Dados

1. **Frontend** envia requisição via `trpc.manus.*`
2. **Backend** valida inputs com Zod
3. **Backend** cria tarefa na API Manus
4. **Backend** faz polling até conclusão (max 5 minutos)
5. **Backend** extrai resposta e retorna ao frontend
6. **Frontend** atualiza UI com resultado

## 🔑 Configuração

### Variáveis de Ambiente

A API key está configurada como secret do projeto:

```env
MANUS_API_KEY=sua_chave_aqui
```

**Importante:** A chave já foi configurada via `webdev_request_secrets` e validada com testes.

## 📡 Endpoints Disponíveis

### 1. Análise de Referências

**Endpoint:** `trpc.manus.analyzeReference`

**Descrição:** Analisa vídeos de criadores para identificar tom, estilo, estrutura narrativa e padrões de engajamento.

**Input:**
```typescript
{
  videoUrl: string;        // URL do YouTube, Shorts, Reels, TikTok
  niche?: string;          // Nicho do conteúdo (opcional)
  creatorName?: string;    // Nome do criador (opcional)
}
```

**Output:**
```typescript
{
  success: boolean;
  taskId: string;
  analysis: string;        // Análise detalhada em texto
  creditUsage: number;     // Créditos consumidos
}
```

**Exemplo de uso:**
```typescript
const { data } = await trpc.manus.analyzeReference.useMutation({
  videoUrl: "https://www.youtube.com/watch?v=abc123",
  creatorName: "Nome do Criador",
  niche: "Finanças"
});
```

---

### 2. Geração de Roteiros

**Endpoint:** `trpc.manus.generateScript`

**Descrição:** Gera roteiros personalizados baseados em análise de referência e tema específico.

**Input:**
```typescript
{
  topic: string;           // Tema do roteiro
  referenceAnalysis?: string;  // Análise prévia (opcional)
  duration?: string;       // Duração desejada (ex: "30s", "5min")
  tone?: string;           // Tom desejado (ex: "informal", "profissional")
}
```

**Output:**
```typescript
{
  success: boolean;
  taskId: string;
  script: string;          // Roteiro completo
  creditUsage: number;
}
```

---

### 3. Tendências Diárias

**Endpoint:** `trpc.manus.getDailyTrends`

**Descrição:** Busca tendências diárias com Viral Score para inspiração de conteúdo.

**Input:**
```typescript
{
  niche?: string;          // Filtrar por nicho (opcional)
  limit?: number;          // Quantidade de tendências (padrão: 10)
}
```

**Output:**
```typescript
{
  success: boolean;
  taskId: string;
  trends: Array<{
    title: string;
    description: string;
    viralScore: number;
    category: string;
  }>;
  creditUsage: number;
}
```

---

### 4. Status de Tarefa

**Endpoint:** `trpc.manus.getTaskStatus`

**Descrição:** Consulta status de tarefa em andamento.

**Input:**
```typescript
{
  taskId: string;
}
```

**Output:**
```typescript
{
  status: "pending" | "running" | "completed" | "failed";
  progress?: number;
  result?: any;
}
```

## 🔧 Implementação Backend

### Arquivo Principal: `server/manus.ts`

#### Configuração

```typescript
const MANUS_API_URL = "https://api.manus.im/v1";
const MANUS_API_KEY = process.env.MANUS_API_KEY || "";
```

#### Função de Chamada à API

```typescript
async function callManusAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T>
```

**Features:**
- Logs detalhados de requisição e resposta
- Tratamento de erros HTTP
- Headers automáticos (API_KEY, Content-Type)
- Try-catch para exceções

#### Sistema de Polling

```typescript
async function waitForTaskCompletion(
  taskId: string,
  maxAttempts = 150,      // 5 minutos
  intervalMs = 2000       // 2 segundos
): Promise<ManusTaskStatus>
```

**Features:**
- Polling a cada 2 segundos
- Timeout de 5 minutos (150 tentativas)
- Logs de progresso
- Detecção de falhas

#### Extração de Resposta

```typescript
function extractAssistantResponse(task: ManusTaskStatus): string
```

Extrai texto da última mensagem do assistente no campo `output`.

## 🎨 Implementação Frontend

### Arquivo Principal: `client/src/pages/References.tsx`

#### Hook tRPC

```typescript
const analyzeReferenceMutation = trpc.manus.analyzeReference.useMutation();
```

#### Fluxo de Análise

1. Usuário preenche formulário (URL + campos opcionais)
2. Clica em "Analisar"
3. Card "Analisando..." aparece com badge "PROCESSANDO"
4. Mutation aguarda resposta do backend
5. Ao completar:
   - Sucesso: Toast verde + card atualizado
   - Erro: Toast vermelho + card removido

#### Estados

```typescript
const [references, setReferences] = useState<Reference[]>([]);
const [url, setUrl] = useState("");
const [creatorName, setCreatorName] = useState("");
const [niche, setNiche] = useState("");
```

## 🧪 Testes

### Arquivo: `server/manus.test.ts`

```typescript
describe("Manus API Integration", () => {
  it("deve ter a chave de API configurada", () => {
    expect(process.env.MANUS_API_KEY).toBeDefined();
  });

  it("deve validar a chave de API com uma requisição simples", async () => {
    const response = await fetch("https://api.manus.im/v1/tasks", {
      method: "GET",
      headers: { "API_KEY": process.env.MANUS_API_KEY! }
    });
    expect(response.status).not.toBe(401);
  });
});
```

**Executar testes:**
```bash
pnpm test server/manus.test.ts
```

## 📊 Logs e Debugging

### Logs Disponíveis

O backend gera logs detalhados em cada etapa:

```
[Manus] Iniciando análise de referência: { videoUrl, niche, creatorName }
[Manus API] POST https://api.manus.im/v1/tasks
[Manus API] Response status: 200
[Manus API] Success: {"task_id":"..."}
[Manus] Tarefa criada com sucesso! Task ID: abc123
[Manus] Iniciando polling para task abc123 (max 150 tentativas)
[Manus] Tentativa 1/150 - Status: running
[Manus] Tentativa 2/150 - Status: running
...
[Manus] ✅ Tarefa completada! Créditos: 85
```

### Verificar Logs

Via Management UI:
1. Abrir painel "Dashboard"
2. Clicar em "View Logs"

Via shell:
```bash
cd /home/ubuntu/content_creator_saas
# Logs aparecem no output do dev server
```

## 🐛 Troubleshooting

### Problema: Card fica em "PROCESSANDO" indefinidamente

**Possíveis causas:**
1. URL de vídeo inválida ou privada
2. Timeout atingido (>5 minutos)
3. Erro na API Manus

**Solução:**
1. Verificar logs do servidor
2. Testar com URL de vídeo público e válido
3. Verificar se API key tem permissões

### Problema: Erro 401 Unauthorized

**Causa:** API key inválida ou expirada

**Solução:**
```bash
# Verificar se a chave está configurada
echo $MANUS_API_KEY

# Reconfigurar via Management UI → Settings → Secrets
```

### Problema: Erro 404 Task Not Found

**Causa:** URL da API incorreta ou task_id inválido

**Solução:**
- Verificar se `MANUS_API_URL` está correto: `https://api.manus.im/v1`
- Não usar `.ai`, usar `.im`

## 📈 Consumo de Créditos

Estimativas aproximadas:

- **Análise de vídeo curto (30s-1min):** 50-80 créditos
- **Análise de vídeo longo (10min+):** 100-200 créditos
- **Geração de roteiro:** 30-60 créditos
- **Tendências diárias:** 20-40 créditos

## 🚀 Próximos Passos

1. **Teste com URL real:** Usar vídeo público do YouTube/Shorts
2. **Persistência:** Salvar análises no banco de dados
3. **Cache:** Evitar reprocessar mesmos vídeos
4. **Webhooks:** Receber notificações quando tarefa completar
5. **Progresso em tempo real:** WebSocket para updates live

## 📚 Referências

- [Documentação Oficial API Manus](https://open.manus.im/docs)
- [Tasks API](https://open.manus.im/docs/api-reference/tasks/create-task)
- [Webhooks Guide](https://open.manus.im/docs/webhooks-guide/overview)

---

**Última atualização:** 14 Jan 2026  
**Versão:** 1.0.0
