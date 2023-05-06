import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { api } from "../../utils/api";
import { NavBar } from "../../components/NavBar";
import { TrashIcon, CalendarIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import { SuccessToast } from "../../components/SuccessToast";
import { PageLayout } from "../../components/Layout";

const Santa: NextPage = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const sid = router.query.sid as string;

  const secretSanta = api.secretSanta.getSecretSantaById.useQuery(
    {
      id: sid,
    },
    { enabled: sessionData?.user !== undefined }
  );
  const participantDeleteMutation =
    api.participant.deleteParticipant.useMutation({
      onSuccess: () => {
        secretSanta.refetch();
      },
    });
  return (
    <>
      {participantDeleteMutation.isSuccess && (
        <SuccessToast message="Participant deleted" />
      )}
      <div className="justify-top container mt-16 bg-gray-600 px-10 py-16 shadow-lg">
        <h1 className="text-5xl font-bold text-white">
          {secretSanta?.data?.name}
        </h1>
        <Link href={`/santa/${sid}/edit`}>
          <button className="mt-5 inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
            Edit
          </button>
        </Link>
        <h2 className="mt-10 text-3xl font-bold text-white">Draw Name Date</h2>
        <CalendarIcon className="inline h-5 w-5" />{" "}
        {secretSanta?.data?.drawDate
          ? dayjs(secretSanta.data.drawDate).format("ddd, MMM D, YYYY")
          : "Not set"}
        <h2 className="mt-10 text-3xl font-bold text-white">
          Presents Opening Date
        </h2>
        <CalendarIcon className="inline h-5 w-5" />{" "}
        {secretSanta?.data?.presentsOpening
          ? dayjs(secretSanta.data.presentsOpening).format("ddd, MMM D, YYYY")
          : "Not set"}
        <h2 className="mt-10 text-3xl font-bold text-white">Participants</h2>
        <Link href={`/santa/${sid}/drawSettings`}>
          <button className="mt-5 inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
            Set Exclusion Rules
          </button>
        </Link>
        <p className="mt-5">
          <button
            className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent hover:bg-slate-500"
            onClick={() => {
              navigator.clipboard.writeText(
                `${window?.location?.origin}/santa/${sid}/join`
              );
            }}
          >
            Copy generic join link for everyone
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
              />
            </svg>
          </button>
        </p>
        {secretSanta?.data?.participants?.map((participant) => {
          return (
            <div
              key={participant.id}
              className={`mt-5 border-2 p-2 ${
                participant.userId ? "border-lime-400" : "border-amber-500"
              }`}
            >
              <p className="text-xl text-white">{participant.name}</p>
              <p className="text-xl text-white">
                {participant.excluded.length > 0 ? "Excluded: " : ""}
                {participant.excluded
                  .map((excluded) => excluded.name)
                  .join(", ")}
              </p>
              <p>
                {participant.userId !== sessionData?.user?.id
                  ? participant.userId
                    ? "Has accepted and linked account."
                    : "Still needs to accept and link account."
                  : "This is you!"}
              </p>
              {participant.userId !== sessionData?.user?.id && (
                <div className="mt-5">
                  <button
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent hover:bg-slate-500"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        window?.location?.origin + "/join/" + participant.id
                      );
                    }}
                  >
                    Copy join link for {participant.name}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                      />
                    </svg>
                  </button>
                </div>
              )}
              {participant.userId !== sessionData?.user?.id && (
                <div className="mt-1">
                  <button
                    className="bg-red-500 p-2 hover:bg-red-400"
                    onClick={() => {
                      if (
                        confirm(
                          "Are you sure you want to remove this participant?"
                        )
                      ) {
                        participantDeleteMutation.mutate({
                          id: participant.id,
                        });
                      }
                    }}
                  >
                    <TrashIcon className="inline h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Santa;
