import { router, protectedProcedure } from "./_core/trpc";
import { getDb } from "./db";
import { users } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const usersRouter = router({
  /**
   * Get current user's plan information
   */
  getCurrentPlan: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    const [user] = await db!
      .select()
      .from(users)
      .where(eq(users.id, ctx.user.id));

    if (!user) {
      return {
        planName: "Free",
        status: "active",
        monthlyCredits: 1000,
        creditsUsed: 0,
        creditsRemaining: 1000,
      };
    }

    // Determine plan based on credits (simplified logic)
    let planName = "Free";
    let monthlyCredits = 1000;

    if (user.credits >= 5000) {
      planName = "Enterprise";
      monthlyCredits = 10000;
    } else if (user.credits >= 2000) {
      planName = "Pro";
      monthlyCredits = 5000;
    }

    return {
      planName,
      status: "active" as const,
      monthlyCredits,
      creditsUsed: user.creditsUsed,
      creditsRemaining: user.credits,
    };
  }),
});
