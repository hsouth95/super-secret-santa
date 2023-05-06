import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export const UserNavItem: React.FC = () => {
  const { data: sessionData } = useSession();

  if (sessionData === null) {
    return (
      <button
        className="flex items-center gap-x-2 font-medium text-gray-500 hover:text-blue-600 dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500 sm:my-6 sm:border-l sm:border-gray-300 sm:pl-6"
        onClick={() => signIn("discord")}
      >
        <svg
          className="h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
        </svg>
        Log in
      </button>
    );
  }

  return (
    <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
      <button
        type="button"
        id="hs-dropdown-custom-trigger"
        className="hs-dropdown-toggle flex items-center gap-x-2 font-medium text-gray-500 hover:text-gray-400 dark:border-gray-700 dark:text-gray-400 dark:hover:text-gray-500 sm:border-l sm:border-gray-300 sm:pl-6"
      >
        <img
          className="hidden h-6 rounded sm:visible sm:h-6"
          src={sessionData?.user?.image as string}
        ></img>
        <span>{sessionData?.user?.name}</span>
        <svg
          className="ml-0 h-2.5 w-2.5 text-gray-600"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          ></path>
        </svg>
      </button>
      <div
        className="hs-dropdown-menu duration z-50 hidden min-w-[15rem] rounded-lg bg-white p-2 opacity-0 shadow-md transition-[opacity,margin] hs-dropdown-open:opacity-100 dark:border dark:border-gray-700 dark:bg-gray-800"
        aria-labelledby="hs-dropdown-custom-trigger"
      >
        <Link
          className="flex items-center gap-x-3.5 rounded-md px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
          href="#"
        >
          Account
        </Link>
        <a
          className="flex items-center gap-x-3.5 rounded-md px-3 py-2 text-sm text-gray-800 hover:cursor-pointer hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
          onClick={() =>
            signOut({
              callbackUrl: "/",
            })
          }
        >
          Log out
        </a>
      </div>
    </div>
  );
};
