import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { api } from "../../utils/api";
import { NavBar } from "../../components/NavBar";

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
  return (
    <>
      <Head>
        <title>Super Secret Santa</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main className="flex min-h-screen flex-col items-center bg-gray-700 text-white">
        <div className="justify-top container mt-16 bg-gray-600 py-16 px-10 shadow-lg">
          <h1 className="text-5xl font-bold text-white">
            {secretSanta?.data?.name}
          </h1>
          <Link href={`/santa/${sid}/join`}>
            <h2>Join</h2>
          </Link>

          <h2 className="mt-10 text-3xl font-bold text-white">Participants</h2>
          {secretSanta?.data?.participants?.map((participant) => {
            return (
              <div
                key={participant.id}
                className={`mt-5 border-2 p-2 ${
                  participant.userId ? "border-lime-400" : "border-amber-500"
                }`}
              >
                <p className="text-xl text-white">{participant.name}</p>
                <Link href={`/join/${participant.id}`}>
                  <p>
                    {participant.userId
                      ? "Has accepted and linked account."
                      : "Still needs to accept and link account."}
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default Santa;
