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
        <meta
          name="description"
          content="Set up your event and invite your friends to join! We'll handle
                everything. Let's get rid of the stress of organising a secret
                santa event."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <NavBar />
      <main>{props.children}</main>
      <Footer />
    </>
  );
};
