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
