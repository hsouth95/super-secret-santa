import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export const UserNavItem: React.FC = () => {
  const { data: sessionData } = useSession();

  if (sessionData === null) {
    return (
      <button
        className="rounded-full bg-gray-600 px-10 py-3 font-semibold text-white no-underline transition"
        onClick={() => signIn()}
      >
        Sign in
      </button>
    );
  }

  return (
    <div className="flex items-center p-1 hover:bg-gray-600">
      <span className="mr-4 ml-3 flex text-white">
        {sessionData?.user?.name}
      </span>
      <img
        className="mr-3 flex h-6 sm:h-9"
        src={sessionData?.user?.image}
      ></img>
    </div>
  );
};
