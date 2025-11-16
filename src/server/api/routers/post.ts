import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// 🧠 Temporary mock "database"
let postsData: { id: number; name: string; createdAt: Date }[] = [];

export const postRouter = createTRPCRouter({
  // ✅ Still works fine — no DB
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  // ✅ Simulated "insert" (no DB)
  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const newPost = {
        id: postsData.length + 1,
        name: input.name,
        createdAt: new Date(),
      };
      postsData.push(newPost);
      return newPost;
    }),

  // ✅ Simulated "get latest"
  getLatest: publicProcedure.query(async () => {
    const latest = postsData[postsData.length - 1];
    return latest ?? { id: 0, name: "No posts yet", createdAt: new Date() };
  }),
});
