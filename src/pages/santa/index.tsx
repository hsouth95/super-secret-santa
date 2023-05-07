import { type NextPage } from "next";
import Link from "next/link";

import { SecretSantaOwnerList } from "../../components/SecretSantaOwnerList";

const SantaList: NextPage = () => {
  return (
    <div className="justify-top container bg-gray-600 px-10 py-16 shadow-lg">
      <h1 className="text-5xl font-bold text-white">
        Upcoming Events you're organising
      </h1>
      <SecretSantaOwnerList />

      <Link href="/santa/create">
        <button className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
          Create a new Event!
        </button>
      </Link>
    </div>
  );
};

export default SantaList;
