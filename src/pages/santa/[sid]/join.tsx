import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

import { PageLayout } from "../../../components/Layout";
import { api } from "../../../utils/api";

const SantaJoin: NextPage = () => {
  const router = useRouter();
  const participantMutation =
    api.participant.connectParticipantToUser.useMutation();
  const { data: sessionData } = useSession();
  const sid = router.query.sid as string;

  const secretSanta = api.secretSanta.getSecretSantaById.useQuery({
    id: sid,
  });
  return (
    <div className="justify-top container mt-16 bg-gray-600 px-10 py-16 shadow-lg">
      <h1 className="text-5xl font-bold text-white">
        You've been invited to join the {secretSanta?.data?.name} event!
      </h1>

      {sessionData?.user === undefined && (
        <>
          <h2>
            In order to enable the full functionality of this app, logging in is
            required.
          </h2>
          <Link href="/api/auth/signin">
            <button>Sign in</button>
          </Link>
        </>
      )}

      {sessionData?.user !== undefined && (
        <>
          <h2 className="text-2xl">Choose which participant you are:</h2>
          <div>
            {secretSanta?.data?.participants?.map((participant) => {
              return (
                <div key={participant.id} className="mt-5 bg-gray-400">
                  <span>{participant.name}</span>
                  <button
                    onClick={() => {
                      participantMutation.mutate({
                        id: participant.id,
                        userId: sessionData?.user?.id
                          ? sessionData?.user?.id
                          : "",
                      });

                      router.push(`/connect-done`);
                    }}
                  >
                    Connect
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default SantaJoin;
