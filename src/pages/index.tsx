import { type NextPage } from "next";
import Link from "next/link";

import { useSession } from "next-auth/react";
import { PageLayout } from "../components/Layout";

const HeroSection = () => {
  const { data: sessionData } = useSession();
  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -top-96 left-1/2 flex -translate-x-1/2 transform"
      >
        <div className="h-[44rem] w-[25rem] -translate-x-[10rem] rotate-[-60deg] transform bg-gradient-to-r from-violet-300/50 to-purple-100 blur-3xl dark:from-violet-900/50 dark:to-purple-900"></div>
        <div className="rounded-fulls h-[50rem] w-[90rem] origin-top-left -translate-x-[15rem] -rotate-12 bg-gradient-to-tl from-blue-50 via-blue-100 to-blue-50 blur-3xl dark:from-indigo-900/70 dark:via-indigo-900/70 dark:to-blue-900/70"></div>
      </div>
      <div className="relative z-10">
        <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mt-5 max-w-2xl">
              <h1 className="block text-5xl font-semibold text-gray-800 dark:text-gray-200 md:text-6xl lg:text-7xl">
                Super Secret Santa
              </h1>
            </div>

            <div className="mt-5 max-w-3xl">
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Set up your event and invite your friends to join! We'll handle
                everything. Let's get rid of the stress of organising a secret
                santa event.
              </p>
            </div>

            <div className="mb-8 mt-8 grid w-full gap-3 sm:inline-flex sm:justify-center">
              {!sessionData?.user?.id ? (
                <Link
                  className="inline-flex items-center justify-center gap-x-3 rounded-md border border-transparent bg-blue-600 px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800"
                  href="/"
                >
                  Create an account
                </Link>
              ) : (
                <>
                  <Link
                    className="inline-flex items-center justify-center gap-x-3 rounded-md border border-transparent bg-blue-600 px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800"
                    href="/santa/create"
                  >
                    Create an Event
                  </Link>
                  <Link
                    className="inline-flex items-center justify-center gap-x-3 rounded-md border border-transparent bg-blue-600 px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800"
                    href="/santa"
                  >
                    View Events
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureSection = () => {
  return (
    <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="grid gap-12 md:grid-cols-2">
        <div className="lg:w-3/4">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white lg:text-4xl">
            You as the organiser shouldn't have to have the event spoilt because
            someone forgets to set their address
          </h2>
          <p className="mt-3 text-gray-800 dark:text-gray-400">
            Automated reminders, on-demand notifications and a simple interface
            that everyone in your event can use. This year, your secret santa
            will be a secret.
          </p>
        </div>

        <div className="space-y-6 lg:space-y-10">
          <div className="flex">
            <span className="mx-auto inline-flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm dark:border-gray-700 dark:bg-slate-900 dark:text-gray-200">
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
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            <div className="ml-5 sm:ml-8">
              <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 sm:text-lg">
                Scheduled Reminders
              </h3>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                We send reminders up to the day of the event. Keeping everyone
                on their toes and making sure they don't forget.
              </p>
            </div>
          </div>
          <div className="flex">
            <span className="mx-auto inline-flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm dark:border-gray-700 dark:bg-slate-900 dark:text-gray-200">
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
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
                />
              </svg>
            </span>
            <div className="ml-5 sm:ml-8">
              <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 sm:text-lg">
                On-Demand Notifications
              </h3>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                Participants can request an anonymous notification to be sent to
                their matched person. Limited to once a day so you don't get
                spammed.
              </p>
            </div>
          </div>
          <div className="flex">
            <span className="mx-auto inline-flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm dark:border-gray-700 dark:bg-slate-900 dark:text-gray-200">
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
                  d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                />
              </svg>
            </span>
            <div className="ml-5 sm:ml-8">
              <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 sm:text-lg">
                Flexible
              </h3>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                Easily change the date and time of your event, add or remove
                participants as and when you need to.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Home: NextPage = () => {
  return (
    <>
      <HeroSection />
      <FeatureSection />
    </>
  );
};

export default Home;
