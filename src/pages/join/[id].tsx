import type { NextPage } from "next";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";

import { api } from "../../utils/api";
import { PageLayout } from "../../components/Layout";

const Join: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const { data: sessionData } = useSession();
  const connectParticipantMutation =
    api.participant.connectParticipantToUser.useMutation({
      onSuccess: () => {
        router.push("/connect-done");
      },
    });

  return (
    <div className="justify-top container mt-16 bg-gray-600 px-10 py-16 shadow-lg">
      <h1 className="text-5xl font-bold text-white">
        You've been invited to join a secret santa event!
      </h1>
      {sessionData?.user?.id ? (
        <button
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          onClick={() => {
            if (sessionData?.user?.id) {
              connectParticipantMutation.mutate({
                id: id,
                userId: sessionData?.user?.id,
              });
            }
          }}
          disabled={
            connectParticipantMutation.isLoading ||
            connectParticipantMutation.isSuccess
          }
        >
          Connect
        </button>
      ) : (
        <>
          <p className="mt-10 text-2xl font-bold text-white">
            Please sign up to join in!
          </p>
          <button
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            onClick={() => {
              signIn();
            }}
          >
            Sign Up!
          </button>
        </>
      )}
    </div>
  );
};

export default Join;
