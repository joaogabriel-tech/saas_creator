/**
 * Testes de validação da integração com API Manus
 */

import { describe, expect, it } from "vitest";

const MANUS_API_URL = "https://api.manus.ai/v1";
const MANUS_API_KEY = process.env.MANUS_API_KEY || "";

describe("Manus API Integration", () => {
  it("deve ter a chave de API configurada", () => {
    expect(MANUS_API_KEY).toBeTruthy();
    expect(MANUS_API_KEY.length).toBeGreaterThan(10);
  });

  it("deve validar a chave de API com uma requisição simples", async () => {
    // Criar uma tarefa simples para validar a chave
    const response = await fetch(`${MANUS_API_URL}/tasks`, {
      method: "POST",
      headers: {
        "API_KEY": MANUS_API_KEY,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        prompt: "Hello, this is a test",
        agentProfile: "manus-1.6-lite",
      }),
    });

    // Verificar se a requisição foi bem-sucedida
    expect(response.ok).toBe(true);
    expect(response.status).toBe(200);

    const data = await response.json();
    
    // Verificar estrutura da resposta
    expect(data).toHaveProperty("task_id");
    expect(data).toHaveProperty("task_url");
    expect(typeof data.task_id).toBe("string");
    expect(data.task_id.length).toBeGreaterThan(0);
  }, 30000); // Timeout de 30s para requisição de rede
});
