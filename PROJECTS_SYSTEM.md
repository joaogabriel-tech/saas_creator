# Sistema de Projetos/Personas - KRYO Platform

## Visão Geral

O sistema de projetos permite que usuários organizem seu conteúdo por **personas** ou **nichos** diferentes. Cada projeto é uma identidade separada (ex: "DJ de Funk", "Expert em Finanças") que contém suas próprias referências, ideias e roteiros isolados.

## Arquitetura

### 1. Schema do Banco de Dados

**Tabela `projects`:**
```sql
- id: INT (PK, auto_increment)
- userId: INT (FK → users.id)
- name: VARCHAR(255) - Nome do projeto
- persona: VARCHAR(255) - Persona/nicho (ex: "DJ de Funk")
- description: TEXT (nullable) - Descrição opcional
- avatar: TEXT (nullable) - URL da imagem do avatar
- color: VARCHAR(7) - Cor hex para identificação visual (#3b82f6)
- createdAt: TIMESTAMP
- updatedAt: TIMESTAMP
```

**Tabelas Relacionadas:**
- `references` (videoUrl, analysis, status, projectId, userId)
- `ideas` (title, description, viralScore, projectId, userId)
- `scripts` (title, content, format, tone, projectId, userId)

### 2. Backend (tRPC)

**Router:** `server/projectsRouter.ts`

**Endpoints Disponíveis:**
- `projects.list` - Lista todos os projetos do usuário
- `projects.getById` - Busca projeto específico por ID
- `projects.getStats` - Retorna estatísticas (refs, ideias, roteiros)
- `projects.create` - Cria novo projeto
- `projects.update` - Atualiza projeto existente
- `projects.delete` - Deleta projeto e dados relacionados (cascade)

**Validações:**
- Nome e persona são obrigatórios
- Cor deve ser formato hex válido (#RRGGBB)
- Avatar deve ser URL válida ou vazio
- Verifica ownership antes de update/delete

### 3. Frontend

**Context:** `client/src/contexts/ProjectContext.tsx`

Gerencia estado global do projeto ativo:
```typescript
{
  activeProject: Project | null,
  setActiveProject: (project) => void,
  projects: Project[],
  isLoading: boolean,
  refetchProjects: () => void
}
```

**Persistência:** localStorage (`activeProjectId`)

**Componentes:**
- `NewProjectDialog` - Modal de criação de projeto
- `Projects` (página) - Listagem e gerenciamento
- `ProjectCard` - Card individual com estatísticas

## Fluxo de Uso

### Criar Novo Projeto

1. Usuário clica em "Novo Projeto" no sidebar
2. Modal abre com formulário:
   - Nome do Projeto (obrigatório)
   - Persona/Nicho (obrigatório)
   - Descrição (opcional)
   - Cor de identificação (8 opções)
3. Submissão chama `trpc.projects.create.mutate()`
4. Backend cria projeto no banco
5. Frontend atualiza lista e fecha modal
6. Toast de sucesso

### Selecionar Projeto Ativo

1. Usuário acessa `/projects`
2. Clica em "Selecionar Projeto" em um card
3. `setActiveProject()` atualiza context
4. ID salvo no localStorage
5. Toast de confirmação

### Deletar Projeto

1. Usuário clica no ícone de lixeira no card
2. AlertDialog pede confirmação
3. Se confirmado, chama `trpc.projects.delete.mutate()`
4. Backend deleta projeto e dados relacionados (cascade)
5. Frontend atualiza lista
6. Toast de sucesso

## Funcionalidades Implementadas

✅ **Backend Completo**
- CRUD completo de projetos
- Validações e tratamento de erros
- Cascade delete para dados relacionados
- Endpoint de estatísticas

✅ **Context e State Management**
- ProjectContext com useState
- Persistência em localStorage
- Integrado no App via ProjectProvider

✅ **UI/UX**
- Modal de criação com seletor de cores
- Página de listagem com cards responsivos
- Estatísticas por projeto (refs, ideias, roteiros)
- Confirmação antes de deletar
- Estados de loading

## Funcionalidades Pendentes

⏳ **Seletor de Projeto no Header**
- Dropdown no header para trocar projeto ativo rapidamente
- Badge com cor do projeto

⏳ **Filtros por Projeto**
- Página de Referências: filtrar por `projectId`
- Página de Ideias: filtrar por `projectId`
- Página de Roteiros: filtrar por `projectId`

⏳ **Dashboard por Projeto**
- Métricas isoladas do projeto ativo
- Gráficos e insights específicos

⏳ **Edição de Projetos**
- Modal de edição (reutilizar NewProjectDialog)
- Atualizar nome, persona, descrição, cor

⏳ **Testes**
- Vitest para fluxo completo de projetos
- Validar CRUD, cascade delete, stats

## Próximos Passos

1. **Adicionar Seletor de Projeto no Header**
   - Criar componente `ProjectSelector`
   - Dropdown com lista de projetos
   - Badge colorido do projeto ativo

2. **Implementar Filtros**
   - Atualizar `References.tsx` para usar `activeProject.id`
   - Modificar queries para incluir `projectId`
   - Mostrar mensagem quando nenhum projeto selecionado

3. **Dashboard Contextual**
   - Filtrar métricas por projeto ativo
   - Adicionar indicador visual do projeto

4. **Testes e Documentação**
   - Criar `server/projects.test.ts`
   - Validar todos os endpoints
   - Documentar casos de uso

## Exemplos de Código

### Usar Projeto Ativo no Frontend

```typescript
import { useProject } from "@/contexts/ProjectContext";

function MyComponent() {
  const { activeProject } = useProject();
  
  if (!activeProject) {
    return <div>Selecione um projeto primeiro</div>;
  }
  
  // Usar activeProject.id nas queries
  const { data } = trpc.references.list.useQuery({
    projectId: activeProject.id
  });
}
```

### Criar Endpoint Filtrado por Projeto

```typescript
// server/referencesRouter.ts
list: protectedProcedure
  .input(z.object({ projectId: z.number() }))
  .query(async ({ ctx, input }) => {
    const db = await getDb();
    return db!
      .select()
      .from(references)
      .where(
        and(
          eq(references.userId, ctx.user.id),
          eq(references.projectId, input.projectId)
        )
      );
  })
```

## Considerações de Design

**Cores de Identificação:**
- 8 cores predefinidas para escolha rápida
- Cores vibrantes para fácil distinção visual
- Aplicadas em badges, borders e accents

**UX de Seleção:**
- Projeto ativo persiste entre sessões
- Primeiro projeto selecionado automaticamente
- Indicador visual claro do projeto ativo

**Isolamento de Dados:**
- Cada projeto é completamente isolado
- Cascade delete garante limpeza completa
- Ownership verificado em todas as operações

## Troubleshooting

**Erro: "Projeto não encontrado"**
- Verificar se projeto pertence ao usuário logado
- Confirmar que projectId existe no banco

**Projeto não aparece após criação**
- Chamar `refetchProjects()` após mutation
- Invalidar cache: `utils.projects.list.invalidate()`

**Dados não filtram por projeto**
- Verificar se `activeProject` está definido
- Confirmar que query inclui `projectId`
- Checar se tabela tem coluna `projectId`

---

**Última atualização:** 2026-01-20
**Status:** Em Progresso (70% completo)
