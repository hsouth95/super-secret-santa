import Head from "next/head";
import type { PropsWithChildren } from "react";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <>
      <Head>
        <title>Super Secret Santa</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main>{props.children}</main>
      <Footer />
    </>
  );
};
