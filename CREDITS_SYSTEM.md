# Sistema de Gerenciamento de Créditos - KRYO Platform

Documentação completa do sistema de autenticação e créditos implementado na plataforma KRYO.

---

## 📋 Visão Geral

O sistema de créditos controla o acesso às funcionalidades premium da plataforma, validando saldo antes de cada operação e deduzindo automaticamente após conclusão bem-sucedida.

**Principais características:**
- ✅ Validação automática antes de operações
- ✅ Dedução atômica após sucesso
- ✅ Exibição em tempo real do saldo
- ✅ Mensagens contextuais de erro
- ✅ Estatísticas de uso
- ✅ Testes automatizados

---

## 🗄️ Estrutura do Banco de Dados

### Tabela `users`

Campos adicionados ao schema existente:

```typescript
{
  credits: int("credits").default(1000).notNull(),        // Saldo atual
  creditsUsed: int("creditsUsed").default(0).notNull(),  // Total consumido
}
```

**Valores padrão:**
- Novos usuários recebem **1000 créditos** automaticamente
- Campo `creditsUsed` inicia em **0** para rastreamento

---

## 💰 Tabela de Custos

Custos definidos em `server/credits.ts`:

| Operação | Custo | Descrição |
|----------|-------|-----------|
| `ANALYZE_REFERENCE` | 80 créditos | Análise completa de vídeo de referência |
| `GENERATE_SCRIPT` | 50 créditos | Geração de roteiro personalizado |
| `GET_DAILY_TRENDS` | 30 créditos | Busca de tendências diárias |

---

## 🔧 Backend - Módulos Implementados

### 1. `server/credits.ts` - Módulo Core

Funções principais:

#### `checkCredits(userId, requiredCredits)`
Verifica se o usuário tem saldo suficiente.

```typescript
const { hasCredits, currentBalance } = await checkCredits(userId, 80);
```

**Retorno:**
- `hasCredits`: boolean indicando se tem saldo
- `currentBalance`: saldo atual do usuário

#### `requireCredits(userId, requiredCredits)`
Valida créditos e lança erro se insuficiente.

```typescript
await requireCredits(userId, CREDIT_COSTS.ANALYZE_REFERENCE);
// Lança TRPCError se créditos insuficientes
```

#### `deductCredits(userId, amount)`
Deduz créditos do saldo (transação atômica).

```typescript
const newBalance = await deductCredits(userId, 80);
console.log(`Novo saldo: ${newBalance}`);
```

**Comportamento:**
- Usa SQL transacional para evitar race conditions
- Atualiza `credits` (subtrai) e `creditsUsed` (soma)
- Retorna novo saldo após dedução

#### `addCredits(userId, amount)`
Adiciona créditos (para recarga/bônus).

```typescript
const newBalance = await addCredits(userId, 500);
```

#### `getCreditStats(userId)`
Retorna estatísticas completas.

```typescript
const stats = await getCreditStats(userId);
// { currentBalance, totalUsed, totalEarned }
```

---

### 2. `server/creditsRouter.ts` - Router tRPC

Endpoints expostos:

#### `credits.getBalance` (query)
Consulta saldo e estatísticas.

```typescript
// Frontend
const { data } = trpc.credits.getBalance.useQuery();
// { currentBalance, totalUsed, totalEarned }
```

#### `credits.addCredits` (mutation)
Adiciona créditos (admin/pagamento).

```typescript
// Frontend
const addMutation = trpc.credits.addCredits.useMutation();
await addMutation.mutateAsync({ amount: 500, reason: "Compra de pacote" });
```

---

### 3. `server/manus.ts` - Proteção de Endpoints

Todos os 4 endpoints da API Manus foram protegidos:

```typescript
analyzeReference: protectedProcedure
  .input(...)
  .mutation(async ({ input, ctx }) => {
    // 1. Validar créditos ANTES
    await requireCredits(ctx.user.id, CREDIT_COSTS.ANALYZE_REFERENCE);
    
    // 2. Executar operação
    const result = await callManusAPI(...);
    
    // 3. Deduzir créditos APÓS sucesso
    const newBalance = await deductCredits(ctx.user.id, CREDIT_COSTS.ANALYZE_REFERENCE);
    
    return { ...result, newBalance };
  })
```

**Endpoints protegidos:**
- `manus.analyzeReference` (80 créditos)
- `manus.generateScript` (50 créditos)
- `manus.getDailyTrends` (30 créditos)
- `manus.getTaskStatus` (consulta, sem custo)

---

## 🎨 Frontend - Componentes

### 1. Exibição de Saldo na Sidebar

Componente `CreditBalance` em `DashboardLayout.tsx`:

```tsx
function CreditBalance() {
  const { data, isLoading } = trpc.credits.getBalance.useQuery();
  
  return (
    <div className="px-2 py-2 rounded-lg bg-gradient-to-br from-primary/10...">
      <Zap className="h-4 w-4 text-primary" />
      <p>{data.currentBalance.toLocaleString()} créditos</p>
    </div>
  );
}
```

**Localização:** Sidebar footer, acima do avatar do usuário

---

### 2. Invalidação Automática em Mutations

Exemplo em `References.tsx`:

```tsx
const utils = trpc.useUtils();

const analyzeReferenceMutation = trpc.manus.analyzeReference.useMutation({
  onSuccess: () => {
    // Atualiza saldo automaticamente
    utils.credits.getBalance.invalidate();
  },
});
```

---

### 3. Validação Prévia de Créditos (Frontend)

Componente `InsufficientCreditsDialog` para validar créditos ANTES de iniciar operações:

```tsx
import { InsufficientCreditsDialog } from "@/components/InsufficientCreditsDialog";

function ProjectReferences() {
  const [showInsufficientCreditsDialog, setShowInsufficientCreditsDialog] = useState(false);
  const { data: creditBalance } = trpc.credits.getBalance.useQuery();
  
  const handleAnalyze = async () => {
    const ESTIMATED_COST = 150; // Custo estimado
    
    // Validação ANTES de chamar API
    if (creditBalance && creditBalance.currentBalance < ESTIMATED_COST) {
      setShowInsufficientCreditsDialog(true);
      return;
    }
    
    // Prosseguir com análise
    await analyzeReferenceMutation.mutateAsync({ videoUrl });
  };
  
  return (
    <>
      <Button 
        onClick={handleAnalyze}
        disabled={creditBalance && creditBalance.currentBalance < 150}
      >
        Analisar
      </Button>
      
      {/* Mensagem de aviso */}
      {creditBalance && creditBalance.currentBalance < 150 && (
        <p className="text-sm text-destructive mt-2">
          Créditos insuficientes. Você precisa de pelo menos 150 créditos.
        </p>
      )}
      
      {/* Modal de aviso */}
      <InsufficientCreditsDialog
        open={showInsufficientCreditsDialog}
        onOpenChange={setShowInsufficientCreditsDialog}
        currentBalance={creditBalance?.currentBalance ?? 0}
        estimatedCost={150}
        operationName="a análise de vídeo"
      />
    </>
  );
}
```

**Benefícios:**
- ⚡ Feedback instantâneo (sem esperar API)
- 🚫 Botão desabilitado quando sem créditos
- 💬 Modal explicativo com link para Planos
- 📊 Exibe déficit exato de créditos

---

### 4. Tratamento de Erros

Mensagens contextuais para créditos insuficientes:

```tsx
catch (error: any) {
  const errorMessage = error.message;
  
  if (errorMessage.includes("Créditos insuficientes")) {
    toast.error(errorMessage, {
      duration: 5000,
      action: {
        label: "Ver Planos",
        onClick: () => window.location.href = "/planos",
      },
    });
  } else {
    toast.error(errorMessage);
  }
}
```

**Comportamento:**
- Erro de créditos → Toast com botão "Ver Planos"
- Outros erros → Toast simples

---

## 🧪 Testes Automatizados

Arquivo: `server/credits.test.ts`

**7 testes implementados:**

1. ✅ Verificar saldo de créditos corretamente
2. ✅ Detectar créditos insuficientes
3. ✅ Deduzir créditos corretamente
4. ✅ Adicionar créditos corretamente
5. ✅ Obter estatísticas completas
6. ✅ Lançar erro quando créditos insuficientes
7. ✅ Validar custos de operações

**Executar testes:**
```bash
pnpm test credits.test.ts
```

---

## 🔐 Fluxo Completo de Operação

### Exemplo: Análise de Vídeo

1. **Usuário clica em "Analisar"** na página de Referências

2. **Frontend valida input** e chama mutation:
   ```tsx
   await analyzeReferenceMutation.mutateAsync({ videoUrl, niche, creatorName });
   ```

3. **Backend valida créditos:**
   ```typescript
   await requireCredits(ctx.user.id, 80);
   // Lança erro se saldo < 80
   ```

4. **Backend executa operação:**
   ```typescript
   const result = await callManusAPI("/tasks", { prompt, attachments });
   const completedTask = await waitForTaskCompletion(taskId);
   ```

5. **Backend deduz créditos:**
   ```typescript
   const newBalance = await deductCredits(ctx.user.id, 80);
   ```

6. **Frontend atualiza UI:**
   ```tsx
   toast.success(`Análise concluída! Novo saldo: ${result.newBalance}`);
   utils.credits.getBalance.invalidate(); // Atualiza sidebar
   ```

---

## 🚨 Tratamento de Erros

### Créditos Insuficientes

**Backend:**
```typescript
throw new TRPCError({
  code: "FORBIDDEN",
  message: `Créditos insuficientes. Você tem ${currentBalance} créditos, mas precisa de ${requiredCredits}.`
});
```

**Frontend:**
- Toast com duração de 5 segundos
- Botão "Ver Planos" para recarga
- Não adiciona item "processando" à lista

### Erro na API Manus

**Backend:**
- Créditos **NÃO** são deduzidos se operação falhar
- Erro é propagado para o frontend

**Frontend:**
- Toast de erro genérico
- Item marcado como "error" na lista

---

## 📊 Estatísticas de Uso

Consulta completa via `getCreditStats`:

```typescript
const stats = await getCreditStats(userId);

// Retorno:
{
  currentBalance: 920,    // Saldo atual
  totalUsed: 80,          // Total já consumido
  totalEarned: 1000,      // Total recebido (saldo + usado)
}
```

**Casos de uso:**
- Dashboard de usuário
- Relatórios de consumo
- Sistema de recompensas

---

## 🔄 Recarga de Créditos

### Via Admin (Manual)

```typescript
await addCredits(userId, 500);
```

### Via Sistema de Pagamento (Futuro)

Integrar com Stripe:

```typescript
// Após pagamento confirmado
await addCredits(userId, packageAmount);

// Registrar transação
await db.insert(transactions).values({
  userId,
  amount: packageAmount,
  type: "purchase",
  paymentId: stripePaymentId,
});
```

---

## 🎯 Próximos Passos

### Funcionalidades Sugeridas

1. **Histórico de Transações**
   - Tabela `credit_transactions`
   - Campos: `id`, `userId`, `amount`, `type`, `description`, `createdAt`
   - Endpoint `credits.getHistory`
   - Página dedicada mostrando todas as operações (análises, roteiros, recargas)

2. **Pacotes de Créditos**
   - Tabela `credit_packages`
   - Integração com Stripe
   - Página de planos no frontend

3. **Créditos Promocionais**
   - Sistema de cupons
   - Bônus por indicação
   - Créditos de boas-vindas

4. **Alertas de Saldo Baixo**
   - Notificação quando < 100 créditos
   - Email automático
   - Banner no dashboard

5. **Créditos Agendados**
   - Renovação mensal automática
   - Planos de assinatura

---

## 📝 Notas Técnicas

### Segurança

- ✅ API key Manus armazenada em variável de ambiente
- ✅ Endpoints protegidos com `protectedProcedure`
- ✅ Validação de input com Zod
- ✅ Transações atômicas no banco

### Performance

- ✅ Queries otimizadas (select apenas campos necessários)
- ✅ Invalidação seletiva de cache
- ✅ Polling com intervalo configurável

### Escalabilidade

- ✅ Arquitetura modular (fácil adicionar novos custos)
- ✅ Logs estruturados para monitoramento
- ✅ Testes automatizados para CI/CD

---

## 🆘 Troubleshooting

### Problema: Saldo não atualiza na sidebar

**Solução:** Adicionar `utils.credits.getBalance.invalidate()` no `onSuccess` da mutation.

### Problema: Créditos deduzidos mesmo com erro

**Verificar:** Dedução está APÓS `await waitForTaskCompletion`, não antes.

### Problema: Teste falhando

**Verificar:** 
1. Banco de dados está acessível
2. Variáveis de ambiente configuradas
3. Usuário de teste foi criado no `beforeAll`

---

## 📚 Referências

- [tRPC Documentation](https://trpc.io/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Vitest Testing](https://vitest.dev/)
- [Manus API Documentation](https://open.manus.im/docs)

---

**Última atualização:** 21 Jan 2026  
**Versão do sistema:** 1.1.0  
**Status:** ✅ Produção

**Novidades v1.1.0:**
- ✅ Validação de créditos no frontend antes de operações
- ✅ Componente InsufficientCreditsDialog com modal explicativo
- ✅ Botão desabilitado automaticamente quando créditos insuficientes
- ✅ Mensagem de aviso abaixo do botão com custo estimado
