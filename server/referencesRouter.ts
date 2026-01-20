import { z } from "zod";
import { router, protectedProcedure } from "./_core/trpc";
import { getDb } from "./db";
import { references } from "../drizzle/schema";
import { eq, and, desc } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const referencesRouter = router({
  /**
   * List all references for a specific project
   */
  list: protectedProcedure
    .input(z.object({ projectId: z.number() }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      const projectReferences = await db!
        .select()
        .from(references)
        .where(
          and(
            eq(references.projectId, input.projectId),
            eq(references.userId, ctx.user.id)
          )
        )
        .orderBy(desc(references.createdAt));

      return projectReferences;
    }),

  /**
   * Create a new reference
   */
  create: protectedProcedure
    .input(
      z.object({
        projectId: z.number(),
        videoUrl: z.string().url(),
        creatorName: z.string().optional(),
        niche: z.string().optional(),
        analysis: z.string(),
        status: z.enum(["processing", "completed", "error"]).default("completed"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      
      const [newReference] = await db!
        .insert(references)
        .values({
          ...input,
          userId: ctx.user.id,
        })
        .$returningId();

      return { id: newReference.id };
    }),

  /**
   * Delete a reference
   */
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();

      // Verify ownership before deleting
      const [reference] = await db!
        .select()
        .from(references)
        .where(
          and(
            eq(references.id, input.id),
            eq(references.userId, ctx.user.id)
          )
        );

      if (!reference) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Referência não encontrada",
        });
      }

      await db!
        .delete(references)
        .where(eq(references.id, input.id));

      return { success: true };
    }),

  /**
   * Get a single reference by ID
   */
  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      
      const [reference] = await db!
        .select()
        .from(references)
        .where(
          and(
            eq(references.id, input.id),
            eq(references.userId, ctx.user.id)
          )
        );

      if (!reference) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Referência não encontrada",
        });
      }

      return reference;
    }),
});
