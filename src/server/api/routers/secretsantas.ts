import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const secretSantaRouter = createTRPCRouter({
  getSecretSantas: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.secretSanta.findMany({
      where: {
        userId: ctx.session?.user?.id,
      },
    });
  }),
});
