import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { ParticipantInput } from "../../components/ParticipantInput";

import dayjs from "dayjs";
import { PageLayout } from "../../components/Layout";
import { api } from "../../utils/api";

interface SecretSantaProps {
  name: string;
  userId: string;
  presentsOpening?: Date;
  drawDate?: Date;
}

const SantaList: NextPage = () => {
  return (
    <div className="justify-top container mt-16 bg-gray-600 px-10 py-16 shadow-lg">
      <h1 className="text-5xl font-bold text-white">Create your event</h1>
      <Form />
    </div>
  );
};

export default SantaList;

const Form: React.FC = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const secretSantaMutation = api.secretSanta.createSecretSanta.useMutation();
  const [participants, setParticipants] = useState<string[]>([""]);

  const [secretSanta, setSecretSanta] = useState<SecretSantaProps>({
    name: "",
    userId: sessionData?.user?.id ? sessionData?.user?.id : "",
    presentsOpening: undefined,
    drawDate: undefined,
  });

  function handleParticipantChange(participantList: string[]) {
    setParticipants(participantList);
  }

  return (
    <form
      className="mt-10 flex"
      onSubmit={(event) => {
        event.preventDefault();

        const data = {
          ...secretSanta,
          // Remove empty participants
          participants: participants.filter((p) => p !== ""),
        };
        secretSantaMutation.mutate(data, {
          onSuccess: (ss) => {
            router.push(`/santa/${ss.id}`);
          },
        });
      }}
    >
      <div>
        <div>
          <label htmlFor="santa-name" className="block text-2xl text-white">
            What do you want to name your event?
          </label>
          <input
            id="santa-name"
            type="text"
            className="block w-full rounded-md border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400"
            value={secretSanta?.name}
            placeholder="Name of the event"
            onChange={(event) => {
              setSecretSanta({ ...secretSanta, name: event.target.value });
            }}
            required={true}
          />
        </div>
        <div className="my-5">
          <label htmlFor="draw-date" className="text-xl text-white">
            When do you want to draw names? You don't have to pick it now, we
            can do that later
          </label>
          <input
            id="draw-date"
            type="date"
            className="block w-full rounded-md border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400"
            value={
              secretSanta?.drawDate
                ? dayjs(secretSanta.drawDate).format("YYYY-MM-DD")
                : ""
            }
            onChange={(event) => {
              console.log(event.target.value);
              setSecretSanta({
                ...secretSanta,
                drawDate: new Date(event.target.value),
              });
            }}
            min={dayjs().format("YYYY-MM-DD")}
          />
        </div>
        <div className="my-5">
          <label htmlFor="presents-opening" className="text-xl text-white">
            When is the event? You don't have to pick it now, we can do that
            later
          </label>
          <input
            id="presents-opening"
            type="date"
            className="block w-full rounded-md border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400"
            value={
              secretSanta?.presentsOpening
                ? dayjs(secretSanta.presentsOpening).format("YYYY-MM-DD")
                : ""
            }
            onChange={(event) => {
              console.log(event.target.value);
              setSecretSanta({
                ...secretSanta,
                presentsOpening: new Date(event.target.value),
              });
            }}
            min={dayjs().format("YYYY-MM-DD")}
          />
        </div>

        <label className="block text-2xl text-white">
          Who do you want to invite?
        </label>
        <ParticipantInput handleParticipantChange={handleParticipantChange} />
        <button
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          type="submit"
        >
          Create
        </button>
      </div>
    </form>
  );
};
