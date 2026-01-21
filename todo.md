# Project TODO - KRYO Platform

## ✅ Design e UI (Concluído)
- [x] Atualizar `index.css` com paleta de cores clara (Soft Minimalist)
- [x] Trocar fontes no `index.html` para Inter/Geist (mais clean e moderna)
- [x] Refatorar `Layout.tsx` para remover sidebar de vidro e usar navegação lateral limpa
- [x] Atualizar `Dashboard.tsx` removendo elementos escuros e simplificando cards
- [x] Atualizar `Pricing.tsx` para estilo clean com sombras suaves
- [x] Atualizar `References.tsx` e `Scripts.tsx` para consistência visual
- [x] Gerar imagem `artificial-brain.png` para o card de Insight Diário
- [x] Atualizar `Dashboard.tsx` para usar a nova imagem
- [x] Adicionar animação `animate-pulse-slow` no `index.css`
- [x] Aplicar classe de animação na imagem do cérebro em `Dashboard.tsx`
- [x] Gerar logo `kryo-brain-logo.png` (Conceito: Cérebro Minimalista Tech)
- [x] Gerar logo `kryo-luxury-logo.png` (Conceito: Luxo Minimalista)

## ✅ Backend - Integração API Manus (Concluído)
- [x] Router tRPC para API Manus (`server/manus.ts`)
- [x] Endpoint `analyzeReference` - Análise de vídeos de criadores
- [x] Endpoint `generateScript` - Geração de roteiros personalizados
- [x] Endpoint `getDailyTrends` - Busca de tendências diárias
- [x] Endpoint `getTaskStatus` - Monitoramento de tarefas
- [x] Sistema de polling automático com timeout de 5 minutos
- [x] Logs detalhados para debugging
- [x] Tratamento de erros e validação com Zod
- [x] Testes vitest para validação da API key
- [x] Configuração de secrets (MANUS_API_KEY)
- [x] Correção da URL da API Manus (.ai → .im)

## ✅ Frontend - Página de Referências (Concluído)
- [x] Interface com tabs (YouTube, Shorts/Reels, Upload)
- [x] Formulário de análise com campos opcionais
- [x] Integração com backend via tRPC
- [x] Estatísticas em tempo real
- [x] Biblioteca de referências com status
- [x] Toast notifications com Sonner
- [x] Estados de loading e erro

## 🔄 Em Progresso
- [ ] Teste end-to-end com URL de vídeo real
- [ ] Validação do fluxo completo de análise

## 📋 Próximas Funcionalidades

### Página de Ideias
- [ ] Interface para geração de ideias baseadas em tendências
- [ ] Integração com `manus.getDailyTrends`
- [ ] Sistema de filtros por nicho
- [ ] Salvar ideias favoritas

### Página de Roteiros
- [ ] Gerador de roteiros baseado em referências
- [ ] Integração com `manus.generateScript`
- [ ] Editor de roteiros com preview
- [ ] Exportação em múltiplos formatos

### Teleprompter
- [ ] Interface de teleprompter integrada
- [ ] Controle de velocidade de rolagem
- [ ] Suporte a controle remoto/teclado
- [ ] Modo espelhado para câmera

### Melhorias Gerais
- [ ] Persistência de dados no banco (referências, roteiros, ideias)
- [ ] Sistema de projetos/pastas
- [ ] Histórico de análises
- [ ] Dashboard com métricas e insights
- [ ] Sistema de créditos e planos
- [ ] Autenticação e perfis de usuário

## ✅ Sistema de Autenticação e Créditos (Concluído)
- [x] Atualizar schema do banco com campo `credits` na tabela `user`
- [x] Adicionar campo `creditsUsed` para estatísticas
- [x] Criar migration para adicionar campos
- [x] Implementar lógica de validação de créditos no backend
- [x] Criar middleware `requireCredits` para proteção de endpoints
- [x] Implementar dedução automática de créditos após operações
- [x] Atualizar frontend para exibir saldo de créditos na sidebar
- [x] Adicionar mensagens de erro quando créditos insuficientes
- [x] Criar testes vitest para fluxo de créditos (7 testes passando)
- [x] Documentar sistema de créditos

## ✅ Responsividade Mobile (Concluído)
- [x] Analisar Dashboard e identificar problemas mobile
- [x] Ajustar grid de cards do Dashboard para mobile (1 col mobile, 2 tablet, 4 desktop)
- [x] Ajustar tipografia e espaçamentos do Dashboard (responsivos)
- [x] Ajustar header do Dashboard (botões empilham em mobile)
- [x] Ajustar card Insight Diário para mobile (padding e texto)
- [x] Ajustar action cards para mobile (1 col mobile, 2 tablet)
- [x] Ajustar Roteiros Recentes para mobile (padding reduzido)
- [x] Analisar página de Referências e identificar problemas mobile
- [x] Ajustar tabs e formulários de Referências para mobile
- [x] Ajustar cards de referências para mobile (layout vertical)
- [x] Verificar DashboardLayout mobile (sidebar já tem suporte nativo)

## 🔄 Próximas Melhorias de Responsividade
- [ ] Ajustar Home page (não autenticada) para mobile
- [ ] Ajustar páginas de Ideias, Roteiros e Planos
- [ ] Testar em breakpoints reais: 375px, 768px, 1024px
- [ ] Validar touch targets (mínimo 44x44px)
- [ ] Otimizar imagens para mobile (lazy loading)

## ✅ Correções de Bugs
- [x] Corrigir erro de acessibilidade: DialogContent sem DialogTitle

## 🎭 Sistema de Projetos/Personas (Em Progresso)
- [x] Criar tabela `projects` no schema do banco
- [x] Criar tabelas `references`, `ideas`, `scripts` com relacionamento a projetos
- [x] Implementar backend tRPC para CRUD de projetos
- [x] Criar ProjectContext para gerenciar projeto ativo globalmente
- [x] Implementar modal de criação de novo projeto
- [x] Implementar página de listagem de projetos
- [x] Conectar botão "Novo Projeto" ao modal
- [x] Implementar exclusão de projetos com confirmação
- [ ] Adicionar seletor de projeto ativo no header/sidebar
- [ ] Atualizar página de Referências para filtrar por projeto
- [ ] Atualizar página de Ideias para filtrar por projeto
- [ ] Atualizar página de Roteiros para filtrar por projeto
- [ ] Atualizar Dashboard para mostrar métricas do projeto ativo
- [ ] Implementar edição de projetos
- [ ] Criar testes vitest para fluxo de projetos

## ✅ Navegação e Visualização de Projetos
- [x] Adicionar item "Projetos" no menu de navegação do sidebar
- [x] Criar card "Total de Projetos" no Dashboard
- [x] Fazer card clicável para navegar até /projects
- [x] Card mostra contagem real de projetos do usuário
- [x] Card de Créditos AURA mostra saldo real

## ✅ Dashboard Isolado por Projeto
- [x] Criar ProjectLayout com navegação contextual (Dashboard, Referências, Ideias, Roteiros)
- [x] Implementar página ProjectDashboard com estatísticas do projeto
- [x] Criar rotas aninhadas `/project/:id/dashboard`, `/project/:id/references`, etc
- [x] Atualizar botão "Selecionar Projeto" para navegar ao dashboard do projeto
- [x] Implementar botão "Voltar para Projetos" no ProjectLayout
- [x] Cards de estatísticas clicáveis para navegarção rápida
- [x] Sidebar responsiva com menu mobile
- [ ] Adaptar página de Referências para funcionar dentro do contexto do projeto
- [ ] Adaptar página de Ideias para funcionar dentro do contexto do projeto
- [ ] Adaptar página de Roteiros para funcionar dentro do contexto do projeto

## ✅ Referências por Projeto
- [x] Criar router tRPC `referencesRouter` para CRUD de referências
- [x] Endpoint `list` filtrando por projectId
- [x] Endpoint `create` salvando referência associada ao projeto
- [x] Endpoint `delete` para remover referência
- [x] Endpoint `getById` para buscar referência específica
- [x] Criar página ProjectReferences adaptada do References.tsx
- [x] Integrar análise de vídeos salvando no banco com projectId
- [x] Atualizar rota /project/:id/references no App.tsx
- [x] Formulário com tabs (YouTube, Shorts/Reels)
- [x] Biblioteca de referências com cards
- [x] Botão de deletar referência com confirmação
- [x] Link externo para abrir vídeo original
- [x] Atualização automática de estatísticas do projeto

## 🔧 Correção de Análise de Referências
- [x] Adicionar delay de 3s antes do primeiro polling
- [x] Adicionar logs detalhados da resposta de criação de tarefa
- [x] Reiniciar servidor com correções
- [ ] Testar fluxo completo com vídeo real
- [ ] Validar salvamento no banco de dados
- [ ] Verificar exibição de referências salvas

## ✅ Correção: Tarefa Falhou Sem Mensagem
- [x] Verificar logs do servidor durante falha
- [x] Melhorar tratamento de status "failed" no waitForTaskCompletion
- [x] Adicionar logs detalhados do objeto de status completo
- [x] Retornar mensagem de erro mais descritiva ao frontend
- [x] Tentar extrair erro do campo output se error estiver vazio
- [x] Adicionar mensagem genérica amigável para usuário
- [ ] Testar com vídeo público curto (1-3 min)

## ✅ Página de Visualização de Análise
- [x] Criar página ReferenceDetail em /project/:id/reference/:refId
- [x] Layout responsivo com header e botões de ação
- [x] Embed de vídeo do YouTube (suporta youtube.com, youtu.be, shorts)
- [x] Markdown rendering para análise com Streamdown
- [x] Botões: Voltar, Abrir Vídeo, Gerar Roteiro
- [x] Card de metadados (data, nicho, criador)
- [x] Adicionar rota no App.tsx
- [x] Adicionar botão "Ver Análise Completa" nos cards de referências
- [x] Loading e error states

## ✅ Sistema de Consumo de Créditos Krio
- [x] Renomear "Créditos AURA" para "Créditos Krio" no Dashboard
- [x] Atualizar backend para calcular custo: credit_usage_manus * 2
- [x] Integrar dedução de créditos no analyzeReference
- [x] Retornar manusCredits, krioCredits e newBalance ao frontend
- [x] Mostrar custo no toast de sucesso (ProjectReferences)
- [x] Atualizar References.tsx para usar krioCredits
- [x] Remover validação prévia (dedução só após sucesso)
- [ ] Testar fluxo completo com vídeo real

## ✅ Validação de Créditos no Frontend
- [x] Consultar saldo de créditos antes de iniciar análise
- [x] Estimar custo da operação (análise = 150 créditos)
- [x] Criar componente InsufficientCreditsDialog
- [x] Mostrar modal de aviso quando créditos insuficientes
- [x] Desabilitar botão "Analisar" quando sem créditos
- [x] Adicionar link para página de Planos no modal
- [x] Implementar em ProjectReferences.tsx
- [x] Mensagem de aviso abaixo do botão quando créditos insuficientes
- [x] Atualizar CREDITS_SYSTEM.md com documentação
- [ ] Testar cenário com saldo suficiente (requer teste manual)
- [ ] Testar cenário com saldo insuficiente (requer teste manual)

## ✅ Roteiros por Projeto
### Backend
- [x] Criar router tRPC `scriptsRouter` em server/api/routers/scripts.ts
- [x] Endpoint `list` filtrando por projectId
- [x] Endpoint `create` salvando roteiro associado ao projeto
- [x] Endpoint `delete` para remover roteiro
- [x] Endpoint `getById` para buscar roteiro específico
- [x] Endpoint `update` para editar roteiro
- [x] Integrar com `manus.generateScript` para geração via IA
- [x] Atualizar generateScript para retornar manusCredits e krioCredits
- [x] Dedução automática após geração bem-sucedida (2x Manus)
- [x] Registrar scriptsRouter no routers.ts

### Frontend
- [x] Criar página ProjectScripts.tsx em /project/:id/scripts
- [x] Formulário de geração de roteiro com campos:
  - [x] Seleção de referências do projeto (dropdown)
  - [x] Campo de tema/tópico
  - [x] Seleção de tom (informal, formal, humorístico, inspirador, educativo)
  - [x] Duração estimada do vídeo (curto/médio/longo)
- [x] Validação de créditos antes de gerar (modal InsufficientCreditsDialog)
- [x] Botão desabilitado quando créditos insuficientes
- [x] Mensagem de aviso quando créditos < 150
- [x] Biblioteca de roteiros salvos com cards
- [x] Botão de deletar roteiro com confirmação
- [x] Botão "Ver Roteiro" navegando para página de detalhe
- [x] Estados de loading, sucesso e erro
- [x] Toast notifications com custo de créditos

### Página de Visualização
- [x] Criar página ScriptDetail.tsx em /project/:id/script/:scriptId
- [x] Layout com header e botões de ação
- [x] Exibição do roteiro formatado (markdown com Streamdown)
- [x] Card de metadados (data, tom, formato)
- [x] Botões: Voltar, Editar (disabled), Teleprompter (disabled), Exportar
- [x] Função de exportar como .txt
- [x] Loading skeleton e error handling

### Integração
- [x] Atualizar rota no App.tsx para /project/:id/scripts
- [x] Atualizar rota no App.tsx para /project/:id/script/:scriptId
- [x] Atualizar estatísticas do projeto após criar/deletar roteiro
- [x] Invalidar cache de créditos após geração

### Testes
- [ ] Testar geração de roteiro com referências
- [ ] Testar cenário com créditos insuficientes
- [ ] Testar salvamento e listagem
- [ ] Testar deletar roteiro
- [ ] Validar atualização de estatísticas do projeto

## ✅ Remover Páginas Universais
- [x] Remover arquivo `/client/src/pages/References.tsx`
- [x] Remover arquivo `/client/src/pages/Ideas.tsx`
- [x] Remover arquivo `/client/src/pages/Scripts.tsx`
- [x] Remover rotas `/references`, `/ideas`, `/scripts` do App.tsx
- [x] Remover imports de References, Scripts, Ideas do App.tsx
- [x] Atualizar Layout.tsx removendo links para páginas universais (Video, Lightbulb, FileText)
- [x] Remover imports não utilizados do Layout.tsx
- [x] Atualizar Dashboard.tsx removendo CTAs "Adicionar Referência" e "Gerar Roteiro"
- [x] Substituir por botão "Ver Projetos" no Dashboard
- [x] Testar navegação após remoção (sidebar limpo, dashboard com botão Ver Projetos)

## ✅ Projetos Recentes no Sidebar
- [x] Criar query `getRecent` no projectsRouter retornando últimos 5 projetos
- [x] Ordenar por `updatedAt DESC` com `.limit(5)`
- [x] Atualizar Layout.tsx para buscar projetos via tRPC
- [x] Adicionar lista de projetos abaixo da aba "Projetos"
- [x] Exibir bolinha colorida + nome do projeto (truncado se longo)
- [x] Link direto para `/project/:id/dashboard`
- [x] Indicador visual de projeto ativo (bolinha primary + fundo primary/5)
- [x] Ícone ChevronRight aparece no hover e quando ativo
- [x] Loading skeleton enquanto carrega (3 linhas animadas)
- [x] Condicional: só mostra se houver projetos
- [x] Funciona no sidebar desktop e mobile sheet (mesmo SidebarContent)

## ✅ Melhorias de UX de Autenticação
### Página de Login
- [x] Criar página `/login` com design luxuoso KRYO
- [x] Botão "Entrar com Manus OAuth" estilizado
- [x] Background com gradientes e elementos visuais (bolhas animadas)
- [x] Animações suaves de entrada (fade-in-up)
- [x] Mensagem de boas-vindas personalizada
- [x] Logo KRYO com efeito de brilho (drop-shadow)
- [x] Badge com Sparkles icon
- [x] Lista de features com bolinhas coloridas
- [x] Footer com links de Termos e Privacidade
- [x] Redirect automático se já logado

### Loading States
- [x] Criar componente `ProtectedRoute` com loading elegante
- [x] Spinner com logo KRYO animado (pulse + spin)
- [x] Evitar "flash" de conteúdo não autenticado
- [x] Transições suaves entre estados
- [x] Mensagem "Verificando autenticação..."

### Proteção de Rotas
- [x] Criar componente `ProtectedRoute` wrapper
- [x] Verificar autenticação antes de renderizar via useAuth()
- [x] Redirect para `/login` se não autenticado
- [x] Loading state durante verificação (logo + spinner)
- [x] Não renderizar children se não autenticado

### Logout Funcional
- [x] Integrar botão "Sair" com `trpc.auth.logout.useMutation()`
- [x] AlertDialog de confirmação antes de sair
- [x] Redirect para `/login` após logout
- [x] Loading state no botão ("Saindo...")
- [x] Botão desabilitado durante logout
- [x] Estilo destrutivo no botão de confirmação

### Rotas Protegidas
- [x] Envolver todas rotas principais com ProtectedRoute
- [x] Envolver rotas de projeto com ProtectedRoute
- [x] Rota `/login` pública (sem proteção)
- [x] Atualizar App.tsx com nova estrutura

## ✅ Dados Dinâmicos do Usuário no Sidebar
### Backend
- [x] Criar endpoint `users.getCurrentPlan` retornando plano atual
- [x] Retornar nome do plano (Free/Pro/Enterprise)
- [x] Retornar status (active/expired)
- [x] Retornar limites do plano (créditos mensais: 1000/5000/10000)
- [x] Lógica baseada em saldo de créditos do usuário
- [x] Registrar usersRouter no routers.ts

### Componente UserAvatar
- [x] Criar componente `UserAvatar.tsx`
- [x] Gerar iniciais automaticamente do nome (ex: "João Gabriel" → "JG")
- [x] Função de hash do nome para cor de fundo consistente (8 cores)
- [x] Suporte para imagem de avatar se disponível (avatarUrl prop)
- [x] Tamanhos variáveis (sm, md, lg)
- [x] Border e shadow para destaque
- [x] Fallback para "U" se nome não disponível

### Layout Sidebar
- [x] Substituir "João Gabriel" hardcoded por `useAuth().user.name`
- [x] Usar componente UserAvatar no header
- [x] Buscar plano via `trpc.users.getCurrentPlan.useQuery()`
- [x] Exibir nome do plano dinamicamente no card ("Plano {Free/Pro/Enterprise}")
- [x] Badge de status (Ativo/Expirado) com cores (verde/vermelho)
- [x] Buscar créditos via `trpc.credits.getBalance.useQuery()`
- [x] Atualizar barra de progresso com dados reais (width calculado dinamicamente)
- [x] Texto dinâmico "X/Y créditos usados" (totalUsed/monthlyCredits)
- [x] Loading skeleton enquanto carrega dados (3 linhas animadas)
- [x] Fallback para dados padrão se falhar ("Free", 1000 créditos)
- [x] Transição suave na barra de progresso (duration-500)

### UX
- [ ] Tooltip no avatar mostrando email do usuário (futuro)
- [ ] Atualização automática de créditos após operações (futuro)
- [ ] Invalidar cache após criar projeto/referência/roteiro (futuro)

## ✅ Correção de Acessibilidade - DialogTitle
- [x] Identificar todos os Dialogs sem DialogTitle
- [x] NewProjectDialog já tem DialogTitle ("Novo Projeto")
- [x] InsufficientCreditsDialog já tem DialogTitle ("Créditos Insuficientes")
- [x] ManusDialog já tem DialogTitle (prop title)
- [x] Corrigir CommandDialog movendo DialogHeader para dentro do DialogContent
- [x] Adicionar fallbacks para title e description no CommandDialog
- [x] Testar em /projects para verificar se erro foi resolvido (servidor reiniciado, sem erros)

## ✅ Nome Dinâmico no Dashboard
- [x] Identificar onde "João Gabriel" está hardcoded no Dashboard (linha 13)
- [x] Importar useAuth no Dashboard.tsx
- [x] Substituir nome hardcoded por user.name
- [x] Adicionar fallback para "Usuário" se nome não disponível
- [x] Testar exibição com usuário real

## ✅ Página de Configurações
### Estrutura
- [x] Criar página Settings.tsx em /pages
- [x] Layout com cards organizados por seção
- [x] Design consistente com identidade KRYO (ícones coloridos, cards com shadow)
- [x] Responsivo (mobile/desktop com grid adaptativo)

### Seção Conta
- [x] Card "Informações da Conta" com ícone User
- [x] Exibir nome do usuário (useAuth)
- [x] Exibir email do usuário
- [x] Exibir data de cadastro formatada (pt-BR)
- [x] Exibir último acesso formatado
- [x] Avatar do usuário (UserAvatar component size="lg")
- [x] Botão "Sair da Conta" (variant destructive)
- [x] Grid de detalhes com labels e valores

### Funcionalidade Logout
- [x] AlertDialog de confirmação de logout
- [x] Integrar com trpc.auth.logout.useMutation()
- [x] Loading state no botão ("Saindo...")
- [x] Redirect para /login após logout (onSuccess)
- [x] Mensagem clara no dialog explicando ação
- [x] Botão desabilitado durante logout (isPending)

### Seções Adicionais
- [x] Card "Preferências" com ícone Bell (placeholder)
- [x] Card "Sobre" com ícone Info
- [x] Versão da aplicação (1.0.0)
- [x] Links para Termos, Privacidade e Suporte

### Rota
- [x] Rota /settings já existia no App.tsx
- [x] Atualizar import de Settings
- [x] Substituir placeholder por componente Settings
- [x] ProtectedRoute já aplicado

## ✅ Redesign da Página de Login
- [x] Analisar identidade visual KRYO (cores, tipografia, espaçamentos)
- [x] Aplicar paleta de cores KRYO (primary, indigo, gradientes)
- [x] Usar logo KRYO com efeito de brilho (drop-shadow roxo)
- [x] Background com gradiente (from-background via-background to-primary/5)
- [x] Três bolhas animadas com gradientes e blur-3xl
- [x] Tipografia consistente (font-display para títulos)
- [x] Botão com gradiente (from-primary to-indigo-600) e hover effects
- [x] Animações suaves (fade-in, fade-in-up, pulse, scale, translate)
- [x] Layout two-column (desktop) com branding à esquerda
- [x] Responsivo (mobile single column, desktop grid)
- [x] Cards de features com ícones coloridos (Video, Lightbulb, FileText)
- [x] Badge "Powered by AI" com Sparkles animado
- [x] Divider "O QUE VOCÊ VAI TER" entre botão e features
- [x] Loading state com logo pulsante e spinner
- [x] Hover effects nos cards (translate-y, border-primary)
- [x] Arrow icon com animação translate-x no hover

## ✅ Onboarding Pós-Login
### Backend
- [x] Adicionar campo `onboardingCompleted` (boolean) na tabela users
- [x] Adicionar import de `boolean` do drizzle-orm
- [x] Criar migration para adicionar campo (0003_chunky_cassandra_nova.sql)
- [x] Executar `pnpm db:push` para aplicar mudanças
- [x] Criar endpoint `users.completeOnboarding` no usersRouter
- [x] Atualizar campo para true quando usuário completar tour

### Componente OnboardingModal
- [x] Criar arquivo `OnboardingModal.tsx` em components
- [x] Design consistente com identidade KRYO (gradientes, cores primary/indigo/emerald)
- [x] Modal com backdrop-blur e animação de entrada
- [x] Header com logo e título "Bem-vindo à KRYO"
- [x] Sistema de navegação entre 3 passos (useState)
- [x] Indicador de progresso visual (barras coloridas)
- [x] Botões "Anterior", "Próximo" e "Começar"
- [x] Prevenir fechar modal clicando fora (onPointerDownOutside)
- [x] Prevenir fechar com ESC (onEscapeKeyDown)

### Passos do Tour
- [x] **Passo 1:** Criar Projeto/Persona
  - Ícone: FolderPlus (primary)
  - Título: "Crie seu Primeiro Projeto"
  - Descrição: Explicar conceito de projetos/personas
  - 3 dicas com bolinhas coloridas
- [x] **Passo 2:** Adicionar Referências
  - Ícone: Video (indigo)
  - Título: "Adicione Referências"
  - Descrição: Como analisar criadores favoritos
  - 3 dicas com bolinhas coloridas
- [x] **Passo 3:** Gerar Roteiro
  - Ícone: FileText (emerald)
  - Título: "Gere Roteiros com IA"
  - Descrição: Como criar scripts personalizados
  - 3 dicas com bolinhas coloridas

### Integração no Dashboard
- [x] Importar OnboardingModal no Dashboard.tsx
- [x] Verificar `user.onboardingCompleted` via useAuth
- [x] Mostrar modal se `onboardingCompleted === false`
- [x] Estado local para controlar visibilidade do modal (useState)
- [x] Chamar `trpc.users.completeOnboarding.useMutation()` ao finalizar
- [x] Fechar modal após completar onboarding

### Animação de Confete
- [x] Instalar biblioteca `canvas-confetti` via pnpm
- [x] Instalar @types/canvas-confetti para TypeScript
- [x] Importar confetti no OnboardingModal
- [x] Disparar confete ao clicar "Começar" no passo 3
- [x] Configurar cores KRYO (primary: #a855f7, indigo: #6366f1)
- [x] Duração de 3 segundos com interval de 250ms
- [x] Dois pontos de origem (esquerda e direita)
- [x] Delay de 1 segundo antes de fechar modal

### UX/UI
- [x] Animações suaves (transition-all duration-500)
- [x] Transições entre passos (progress bars)
- [x] Não permitir fechar modal clicando fora (forçar conclusão)
- [x] Responsivo (max-w-2xl, padding adaptativo)
- [x] Header com gradiente (from-primary/10 via-indigo/10 to-emerald/10)
- [x] Ícones grandes com backgrounds coloridos (w-20 h-20)
- [x] Card de dicas com background secondary/30
- [x] Footer com border-t e background secondary/20
- [x] Botão "Anterior" desabilitado no primeiro passo

## ✅ Botões de Voltar nas Páginas
- [x] Identificar todas as páginas que precisam de botão voltar
- [x] Adicionar botão voltar em ProjectDashboard → /projects
- [x] Adicionar botão voltar em ProjectReferences → /project/:id/dashboard
- [x] Adicionar botão voltar em ProjectScripts → /project/:id/dashboard
- [x] Ajustar botão voltar em ScriptDetail (já existia, simplificado texto)
- [x] Design consistente: ArrowLeft icon + texto "Voltar"
- [x] Posição: topo esquerdo, antes do título
- [x] Estilo: variant="ghost" com hover effect (hover:bg-secondary/50)
- [x] Usar Link do wouter para navegação
- [x] Adicionar imports necessários (Link, ArrowLeft)
- [x] Testar navegação em todas as páginas (servidor rodando sem erros TypeScript)
