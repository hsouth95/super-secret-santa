import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { NavBar } from "../components/NavBar";

import { api } from "../utils/api";

const ConnectDone: NextPage = () => {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>Super Secret Santa</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#00B32C] to-[#DC3D2A] text-gray-600">
        <div className="container flex flex-col items-center justify-center gap-12 bg-gray-600 px-4 py-16 text-white shadow-lg">
          <h1 className="text-gray text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            You're all done, we'll let the organiser know and they'll set up the
            drawing of names!
          </h1>
        </div>
      </main>
    </>
  );
};

export default ConnectDone;
