import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { participantRouter } from "./participant";

function createSecretSantaInput() {
  return z.object({
    id: z.string().optional(),
    name: z.string(),
    date: z.date().optional(),
    userId: z.string().optional(),
    participants: z.array(z.string()),
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
          participants: true,
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
          userId: input.userId,
        },
      });

      input.participants.map(async (participant) => {
        await ctx.prisma.participant.create({
          data: {
            name: participant,
            secretSantaId: secretSanta.id,
          },
        });
      });

      return secretSanta;
    }),
  updateSecretSanta: protectedProcedure
    .input(createSecretSantaInput())
    .mutation(async ({ ctx, input }) => {
      const secretSanta = await ctx.prisma.secretSanta.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          presentsOpening: input?.date,
        },
      });

      return secretSanta;
    }),
});
