import type { Prisma } from "@prisma/client";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { PageLayout } from "../../../components/Layout";
import { ParticipantGiftMapping } from "../../../components/ParticipantGiftMapping";
import { SuccessToast } from "../../../components/SuccessToast";
import { api } from "../../../utils/api";

type ExcludedParticipantsProps = {
  participantId: string;
  excludedParticipantIds: string[];
};
type ParticipantWithExcluded = Prisma.ParticipantGetPayload<{
  include: {
    excluded: true;
  };
}>;

const DrawSettingsPage: NextPage = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const participantMutation =
    api.participant.bulkExcludeParticipants.useMutation({
      onSuccess: () => {
        console.log("Success!");
        setExcludedParticipants([]);
      },
    });
  const ss = api.secretSanta.getSecretSantaById.useQuery(
    {
      id: router.query.sid as string,
    },
    {
      enabled:
        sessionData?.user !== undefined && router.query.sid !== undefined,
    }
  );
  const [excludedParticipants, setExcludedParticipants] = useState<
    ExcludedParticipantsProps[]
  >([]);

  const handleExcludedParticipantsChange = (
    e: ParticipantWithExcluded,
    excludedParticipantIds: string[]
  ) => {
    if (!excludedParticipants.find((p) => p.participantId === e.id)) {
      setExcludedParticipants([
        ...excludedParticipants,
        {
          participantId: e.id,
          excludedParticipantIds: excludedParticipantIds,
        },
      ]);
    } else {
      setExcludedParticipants(
        excludedParticipants.map((p) => {
          if (p.participantId === e.id) {
            return {
              ...p,
              excludedParticipantIds: excludedParticipantIds,
            };
          }
          return p;
        })
      );
    }
  };

  return (
    <div className="justify-top container mt-16 bg-gray-600 px-10 py-16 shadow-lg">
      <div>
        {participantMutation.isSuccess && (
          <SuccessToast message="Exclusion rules saved!" />
        )}
      </div>
      <h1 className="mb-5 text-3xl font-extrabold tracking-tight sm:text-[3rem]">
        Exclusion Rules
      </h1>
      <h2>
        Sometimes you don't want to be matched with a certain person. Maybe
        they're significant others, or maybe they're always at odds. Whatever
        the reason, you can exclude them from being Secret Santa matches. Just
        select the participants you want to exclude from their match, and we'll
        make sure they don't get matched with them.
      </h2>
      <form className="mt-10 flex flex-wrap">
        {ss?.data?.participants.map((p) => {
          return (
            <ParticipantGiftMapping
              key={p.id}
              participant={p}
              possibleGiftMatchers={
                ss?.data?.participants.filter(
                  (e) => e.id !== p.id
                ) as ParticipantWithExcluded[]
              }
              onChange={handleExcludedParticipantsChange}
            />
          );
        })}
      </form>
      <button
        type="button"
        className="mt-10 inline-flex w-full items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 sm:w-1/4"
        onClick={(e) => {
          e.preventDefault();
          if (excludedParticipants.length > 0) {
            participantMutation.mutate(excludedParticipants);
          }
        }}
        disabled={participantMutation.isLoading}
      >
        {participantMutation.isLoading && (
          <span
            className="inline-block h-4 w-4 animate-spin rounded-full border-[3px] border-current border-t-transparent text-white"
            role="status"
            aria-label="loading"
          ></span>
        )}
        {participantMutation.isLoading ? "Save" : "Save"}
      </button>
    </div>
  );
};

export default DrawSettingsPage;
