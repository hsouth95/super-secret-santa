import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

function createSecretSantaInput() {
  return z.object({
    id: z.string().optional(),
    name: z.string(),
    date: z.date().optional(),
    userId: z.string().optional(),
    participants: z.array(z.string()).optional(),
  });
}

export const secretSantaRouter = createTRPCRouter({
  getAllSecretSantasByUser: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.secretSanta.findMany({
      where: {
        userId: ctx.session?.user?.id,
      },
      include: {
        participants: true,
      },
    });
  }),
  getSecretSantaById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.secretSanta.findUnique({
        where: {
          id: input.id,
        },
        include: {
          participants: {
            include: {
              excluded: true,
            },
          },
        },
      });
    }),
  createSecretSanta: protectedProcedure
    .input(createSecretSantaInput())
    .mutation(async ({ ctx, input }) => {
      const secretSanta = await ctx.prisma.secretSanta.create({
        data: {
          name: input.name,
          presentsOpening: input?.date,
          userId: ctx.session?.user?.id,
        },
      });

      input?.participants?.map(async (participant, index) => {
        await ctx.prisma.participant.create({
          data: {
            name: participant,
            secretSantaId: secretSanta.id,
            connectedAccount: index === 0 ? true : false,
            userId: index === 0 ? ctx.session?.user?.id : undefined,
          },
        });
      });

      return secretSanta;
    }),
  updateSecretSanta: protectedProcedure
    .input(createSecretSantaInput())
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.secretSanta.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          presentsOpening: input?.date,
        },
      });
    }),
});
