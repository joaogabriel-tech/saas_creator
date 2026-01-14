/**
 * Testes para Sistema de Gerenciamento de Créditos
 */

import { describe, it, expect, beforeAll } from "vitest";
import { getDb } from "./db";
import { users } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import {
  checkCredits,
  deductCredits,
  addCredits,
  getCreditStats,
  requireCredits,
  CREDIT_COSTS,
} from "./credits";

describe("Sistema de Créditos", () => {
  let testUserId: number;

  beforeAll(async () => {
    // Criar usuário de teste
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    const result = await db.insert(users).values({
      openId: `test-credits-${Date.now()}`,
      name: "Test User Credits",
      email: "test-credits@example.com",
      credits: 1000,
      creditsUsed: 0,
    });

    testUserId = Number(result[0].insertId);
  });

  it("deve verificar saldo de créditos corretamente", async () => {
    const result = await checkCredits(testUserId, 100);
    
    expect(result.hasCredits).toBe(true);
    expect(result.currentBalance).toBe(1000);
  });

  it("deve detectar créditos insuficientes", async () => {
    const result = await checkCredits(testUserId, 2000);
    
    expect(result.hasCredits).toBe(false);
    expect(result.currentBalance).toBe(1000);
  });

  it("deve deduzir créditos corretamente", async () => {
    const newBalance = await deductCredits(testUserId, CREDIT_COSTS.ANALYZE_REFERENCE);
    
    expect(newBalance).toBe(1000 - CREDIT_COSTS.ANALYZE_REFERENCE);
    
    // Verificar que creditsUsed foi atualizado
    const stats = await getCreditStats(testUserId);
    expect(stats.totalUsed).toBe(CREDIT_COSTS.ANALYZE_REFERENCE);
  });

  it("deve adicionar créditos corretamente", async () => {
    const currentStats = await getCreditStats(testUserId);
    const currentBalance = currentStats.currentBalance;
    
    const newBalance = await addCredits(testUserId, 500);
    
    expect(newBalance).toBe(currentBalance + 500);
  });

  it("deve obter estatísticas completas", async () => {
    const stats = await getCreditStats(testUserId);
    
    expect(stats).toHaveProperty("currentBalance");
    expect(stats).toHaveProperty("totalUsed");
    expect(stats).toHaveProperty("totalEarned");
    expect(typeof stats.currentBalance).toBe("number");
    expect(typeof stats.totalUsed).toBe("number");
  });

  it("deve lançar erro quando créditos insuficientes com requireCredits", async () => {
    // Deduzir quase todos os créditos
    const stats = await getCreditStats(testUserId);
    await deductCredits(testUserId, stats.currentBalance - 10);
    
    // Tentar operação que requer mais créditos
    await expect(
      requireCredits(testUserId, CREDIT_COSTS.ANALYZE_REFERENCE)
    ).rejects.toThrow("Créditos insuficientes");
  });

  it("deve validar custos de operações", () => {
    expect(CREDIT_COSTS.ANALYZE_REFERENCE).toBe(80);
    expect(CREDIT_COSTS.GENERATE_SCRIPT).toBe(50);
    expect(CREDIT_COSTS.GET_DAILY_TRENDS).toBe(30);
  });
});
