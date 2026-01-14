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
