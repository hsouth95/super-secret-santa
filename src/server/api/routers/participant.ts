import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const participantRouter = createTRPCRouter({
  getAllParticipantsOfEvent: protectedProcedure
    .input(z.object({ secretSantaId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.participant.findMany({
        where: {
          secretSantaId: input.secretSantaId,
        },
      });
    }),
  getParticipantById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.participant.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  createParticipant: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().optional(),
        secretSantaId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.participant.create({
        data: {
          ...input,
        },
      });
    }),
  connectParticipantToUser: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        userId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      if (!input.userId) {
        throw new Error("No user id provided");
      }
      return ctx.prisma.participant.update({
        where: {
          id: input.id,
        },
        data: {
          userId: input.userId,
        },
      });
    }),
});
