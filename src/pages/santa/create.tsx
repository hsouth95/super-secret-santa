import React from "react";
import { useState } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { NavBar } from "../../components/NavBar";
import { api } from "../../utils/api";

interface SecretSantaProps {
  name: string;
  userId: string;
}

const SantaList: NextPage = () => {
  return (
    <>
      <Head>
        <title>Super Secret Santa</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main className="flex min-h-screen flex-col items-center bg-gray-700 text-gray-600">
        <div className="justify-top container mt-16 bg-gray-600 py-16 px-10 shadow-lg">
          <h1 className="text-5xl font-bold text-white">Create your event</h1>
          <Form />
        </div>
      </main>
    </>
  );
};

export default SantaList;

const Form: React.FC = () => {
  const { data: sessionData } = useSession();
  const mutation = api.secretSanta.createSecretSanta.useMutation();
  const [secretSanta, setSecretSanta] = useState<SecretSantaProps>({
    name: "",
    userId: sessionData?.user?.id ? sessionData?.user?.id : "",
  });

  return (
    <form
      className="mt-10 flex"
      onSubmit={(event) => {
        mutation.mutate(secretSanta);
      }}
    >
      <div>
        <label htmlFor="santa-name" className="block text-white">
          What do you want to name your event?
        </label>
        <input
          id="santa-name"
          type="text"
          className="form-input py-3 px-4"
          value={secretSanta?.name}
          placeholder="Name of the event"
          onChange={(event) => {
            setSecretSanta({ ...secretSanta, name: event.target.value });
          }}
        />
      </div>

      <button className="form-input" type="submit">
        Create
      </button>
    </form>
  );
};
