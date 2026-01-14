/**
 * Router tRPC para Gerenciamento de Créditos
 * 
 * Endpoints para consultar saldo, histórico e adicionar créditos
 */

import { z } from "zod";
import { protectedProcedure, router } from "./_core/trpc";
import { getCreditStats, addCredits, checkCredits } from "./credits";

export const creditsRouter = router({
  /**
   * Obter saldo atual e estatísticas de créditos
   */
  getBalance: protectedProcedure.query(async ({ ctx }) => {
    const stats = await getCreditStats(ctx.user.id);
    
    return {
      currentBalance: stats.currentBalance,
      totalUsed: stats.totalUsed,
      totalEarned: stats.totalEarned,
    };
  }),

  /**
   * Adicionar créditos (para admin ou sistema de pagamento)
   */
  addCredits: protectedProcedure
    .input(
      z.object({
        amount: z.number().min(1).max(10000),
        reason: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const newBalance = await addCredits(ctx.user.id, input.amount);
      
      console.log(`[Credits] ${input.amount} créditos adicionados ao usuário ${ctx.user.id}. Motivo: ${input.reason || "N/A"}`);
      
      return {
        success: true,
        newBalance,
        added: input.amount,
      };
    }),
});
