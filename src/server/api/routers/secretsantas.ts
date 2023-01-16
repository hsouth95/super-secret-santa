import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

function createSecretSantaInput() {
  return z.object({
    name: z.string(),
    description: z.string(),
    date: z.string(),
    userId: z.string(),
  });
}

export const secretSantaRouter = createTRPCRouter({
  getAllSecretSantasByUser: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.secretSanta.findMany({
      where: {
        userId: ctx.session?.user?.id,
      },
    });
  }),
  getSecretSantaById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.secretSanta.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
});
