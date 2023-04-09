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
  bulkExcludeParticipants: protectedProcedure
    .input(
      z.array(
        z.object({
          participantId: z.string(),
          excludedParticipantIds: z.array(z.string()).optional(),
        })
      )
    )
    .mutation(({ ctx, input }) => {
      const updatedExcludes = input.filter((e) => {
        return (
          e && e.excludedParticipantIds && e.excludedParticipantIds.length > 0
        );
      });
      return ctx.prisma.$transaction(
        updatedExcludes.map((participant) => {
          return ctx.prisma.participant.update({
            where: {
              id: participant.participantId,
            },
            data: {
              excluded: {
                connect: participant?.excludedParticipantIds?.map(
                  (id: string) => ({
                    id: id,
                  })
                ),
              },
            },
          });
        })
      );
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
