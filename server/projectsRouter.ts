import { z } from "zod";
import { router, protectedProcedure } from "./_core/trpc";
import { getDb } from "./db";
import { projects, references, ideas, scripts } from "../drizzle/schema";
import { eq, and, desc } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const projectsRouter = router({
  /**
   * List all projects for the current user
   */
  list: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    const userProjects = await db!
      .select()
      .from(projects)
      .where(eq(projects.userId, ctx.user.id))
      .orderBy(desc(projects.createdAt));

    return userProjects;
  }),

  /**
   * Get recent projects (last 5 updated)
   */
  getRecent: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    const recentProjects = await db!
      .select()
      .from(projects)
      .where(eq(projects.userId, ctx.user.id))
      .orderBy(desc(projects.updatedAt))
      .limit(5);

    return recentProjects;
  }),

  /**
   * Get a single project by ID
   */
  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      const [project] = await db!
        .select()
        .from(projects)
        .where(
          and(
            eq(projects.id, input.id),
            eq(projects.userId, ctx.user.id)
          )
        );

      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Projeto não encontrado",
        });
      }

      return project;
    }),

  /**
   * Get project stats (references, ideas, scripts count)
   */
  getStats: protectedProcedure
    .input(z.object({ projectId: z.number() }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();

      // Verify project ownership
      const [project] = await db!
        .select()
        .from(projects)
        .where(
          and(
            eq(projects.id, input.projectId),
            eq(projects.userId, ctx.user.id)
          )
        );

      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Projeto não encontrado",
        });
      }

      // Count references
      const projectReferences = await db!
        .select()
        .from(references)
        .where(eq(references.projectId, input.projectId));

      // Count ideas
      const projectIdeas = await db!
        .select()
        .from(ideas)
        .where(eq(ideas.projectId, input.projectId));

      // Count scripts
      const projectScripts = await db!
        .select()
        .from(scripts)
        .where(eq(scripts.projectId, input.projectId));

      return {
        referencesCount: projectReferences.length,
        ideasCount: projectIdeas.length,
        scriptsCount: projectScripts.length,
      };
    }),

  /**
   * Create a new project
   */
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1, "Nome é obrigatório").max(255),
        persona: z.string().min(1, "Persona é obrigatória").max(255),
        description: z.string().optional(),
        avatar: z.string().url().optional().or(z.literal("")),
        color: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();

      const [newProject] = await db!.insert(projects).values({
        userId: ctx.user.id,
        name: input.name,
        persona: input.persona,
        description: input.description || null,
        avatar: input.avatar || null,
        color: input.color || "#3b82f6",
      });

      return {
        id: newProject.insertId,
        message: "Projeto criado com sucesso!",
      };
    }),

  /**
   * Update an existing project
   */
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(1).max(255).optional(),
        persona: z.string().min(1).max(255).optional(),
        description: z.string().optional(),
        avatar: z.string().url().optional().or(z.literal("")),
        color: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();

      // Verify project ownership
      const [project] = await db!
        .select()
        .from(projects)
        .where(
          and(
            eq(projects.id, input.id),
            eq(projects.userId, ctx.user.id)
          )
        );

      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Projeto não encontrado",
        });
      }

      // Update project
      await db!
        .update(projects)
        .set({
          name: input.name,
          persona: input.persona,
          description: input.description,
          avatar: input.avatar || null,
          color: input.color,
        })
        .where(eq(projects.id, input.id));

      return {
        message: "Projeto atualizado com sucesso!",
      };
    }),

  /**
   * Delete a project and all its related data
   */
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();

      // Verify project ownership
      const [project] = await db!
        .select()
        .from(projects)
        .where(
          and(
            eq(projects.id, input.id),
            eq(projects.userId, ctx.user.id)
          )
        );

      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Projeto não encontrado",
        });
      }

      // Delete related data (cascade delete)
      await db!.delete(references).where(eq(references.projectId, input.id));
      await db!.delete(ideas).where(eq(ideas.projectId, input.id));
      await db!.delete(scripts).where(eq(scripts.projectId, input.id));

      // Delete project
      await db!.delete(projects).where(eq(projects.id, input.id));

      return {
        message: "Projeto deletado com sucesso!",
      };
    }),
});
