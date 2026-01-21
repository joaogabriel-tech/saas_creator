import { z } from "zod";
import { eq, and, desc } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { protectedProcedure, router } from "../../_core/trpc";
import { getDb } from "../../db";
import { scripts } from "../../../drizzle/schema";

export const scriptsRouter = router({
  /**
   * List all scripts for a specific project
   */
  list: protectedProcedure
    .input(
      z.object({
        projectId: z.number(),
      })
    )
    .query(async ({ input, ctx }) => {
      const db = await getDb();
      const result = await db!
        .select()
        .from(scripts)
        .where(
          and(
            eq(scripts.projectId, input.projectId),
            eq(scripts.userId, ctx.user.id)
          )
        )
        .orderBy(desc(scripts.createdAt));

      return result;
    }),

  /**
   * Get a single script by ID
   */
  getById: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ input, ctx }) => {
      const db = await getDb();
      const [script] = await db!
        .select()
        .from(scripts)
        .where(
          and(
            eq(scripts.id, input.id),
            eq(scripts.userId, ctx.user.id)
          )
        );

      if (!script) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Roteiro não encontrado",
        });
      }

      return script;
    }),

  /**
   * Create a new script
   */
  create: protectedProcedure
    .input(
      z.object({
        projectId: z.number(),
        title: z.string(),
        content: z.string(),
        format: z.string().optional(),
        tone: z.string().optional(),
        referenceId: z.number().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      const [newScript] = await db!.insert(scripts).values({
        projectId: input.projectId,
        userId: ctx.user.id,
        title: input.title,
        content: input.content,
        format: input.format,
        tone: input.tone,
        referenceId: input.referenceId,
      });

      console.log("[Scripts] Script created:", newScript);
      return newScript;
    }),

  /**
   * Update an existing script
   */
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().optional(),
        content: z.string().optional(),
        format: z.string().optional(),
        tone: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      // Verify ownership
      const [existing] = await db!
        .select()
        .from(scripts)
        .where(
          and(
            eq(scripts.id, input.id),
            eq(scripts.userId, ctx.user.id)
          )
        );

      if (!existing) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Roteiro não encontrado",
        });
      }

      const updateData: any = {};
      if (input.title !== undefined) updateData.title = input.title;
      if (input.content !== undefined) updateData.content = input.content;
      if (input.format !== undefined) updateData.format = input.format;
      if (input.tone !== undefined) updateData.tone = input.tone;

      await db!
        .update(scripts)
        .set(updateData)
        .where(eq(scripts.id, input.id));

      console.log("[Scripts] Script updated:", input.id);
      return { success: true };
    }),

  /**
   * Delete a script
   */
  delete: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      // Verify ownership
      const [existing] = await db!
        .select()
        .from(scripts)
        .where(
          and(
            eq(scripts.id, input.id),
            eq(scripts.userId, ctx.user.id)
          )
        );

      if (!existing) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Roteiro não encontrado ou você não tem permissão para deletá-lo",
        });
      }

      await db!.delete(scripts).where(eq(scripts.id, input.id));

      console.log("[Scripts] Script deleted:", input.id);
      return { success: true };
    }),
});
