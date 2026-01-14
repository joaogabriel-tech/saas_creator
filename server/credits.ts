/**
 * Sistema de Gerenciamento de Créditos
 * 
 * Este módulo gerencia o saldo de créditos dos usuários,
 * validando disponibilidade antes de operações e deduzindo
 * automaticamente após conclusão.
 */

import { getDb } from "./db";
import { users } from "../drizzle/schema";
import { eq, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

/**
 * Custos em créditos para cada operação
 */
export const CREDIT_COSTS = {
  ANALYZE_REFERENCE: 80,      // Análise de vídeo de referência
  GENERATE_SCRIPT: 50,         // Geração de roteiro
  GET_DAILY_TRENDS: 30,        // Busca de tendências diárias
} as const;

/**
 * Verifica se o usuário tem créditos suficientes
 */
export async function checkCredits(
  userId: number,
  requiredCredits: number
): Promise<{ hasCredits: boolean; currentBalance: number }> {
  const db = await getDb();
  if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

  const user = await db
    .select({ credits: users.credits })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!user || user.length === 0) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Usuário não encontrado",
    });
  }

  const currentBalance = user[0].credits;
  const hasCredits = currentBalance >= requiredCredits;

  return { hasCredits, currentBalance };
}

/**
 * Deduz créditos do saldo do usuário
 * Retorna o novo saldo após dedução
 */
export async function deductCredits(
  userId: number,
  amount: number
): Promise<number> {
  const db = await getDb();
  if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

  // Usa transação atômica para evitar race conditions
  const result = await db
    .update(users)
    .set({
      credits: sql`${users.credits} - ${amount}`,
      creditsUsed: sql`${users.creditsUsed} + ${amount}`,
    })
    .where(eq(users.id, userId));

  // Busca o novo saldo
  const updatedUser = await db
    .select({ credits: users.credits })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!updatedUser || updatedUser.length === 0) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Erro ao atualizar créditos",
    });
  }

  console.log(`[Credits] Deduzidos ${amount} créditos do usuário ${userId}. Novo saldo: ${updatedUser[0].credits}`);

  return updatedUser[0].credits;
}

/**
 * Adiciona créditos ao saldo do usuário (para recarga/bônus)
 */
export async function addCredits(
  userId: number,
  amount: number
): Promise<number> {
  const db = await getDb();
  if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

  await db
    .update(users)
    .set({
      credits: sql`${users.credits} + ${amount}`,
    })
    .where(eq(users.id, userId));

  const updatedUser = await db
    .select({ credits: users.credits })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!updatedUser || updatedUser.length === 0) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Erro ao adicionar créditos",
    });
  }

  console.log(`[Credits] Adicionados ${amount} créditos ao usuário ${userId}. Novo saldo: ${updatedUser[0].credits}`);

  return updatedUser[0].credits;
}

/**
 * Obtém estatísticas de créditos do usuário
 */
export async function getCreditStats(userId: number) {
  const db = await getDb();
  if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

  const user = await db
    .select({
      credits: users.credits,
      creditsUsed: users.creditsUsed,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!user || user.length === 0) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Usuário não encontrado",
    });
  }

  return {
    currentBalance: user[0].credits,
    totalUsed: user[0].creditsUsed,
    totalEarned: user[0].credits + user[0].creditsUsed, // Saldo atual + já usado = total recebido
  };
}

/**
 * Middleware helper para validar créditos antes de executar operação
 * Lança erro se créditos insuficientes
 */
export async function requireCredits(
  userId: number,
  requiredCredits: number
): Promise<void> {
  const { hasCredits, currentBalance } = await checkCredits(userId, requiredCredits);

  if (!hasCredits) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: `Créditos insuficientes. Você tem ${currentBalance} créditos, mas precisa de ${requiredCredits}. Recarregue seu saldo para continuar.`,
    });
  }

  console.log(`[Credits] Usuário ${userId} tem ${currentBalance} créditos (necessário: ${requiredCredits})`);
}
