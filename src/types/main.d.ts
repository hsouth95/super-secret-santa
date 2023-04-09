import { Prisma } from "@prisma/client";

interface SecretSantaType {
  name: string;
  presentsOpening?: Date;
  userId: string;
  participants?: ParticipantType[];
}

interface ParticipantType {
  name: string;
  userId?: string;
}
