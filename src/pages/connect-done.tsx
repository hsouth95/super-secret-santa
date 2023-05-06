import { type NextPage } from "next";
import { PageLayout } from "../components/Layout";

const ConnectDone: NextPage = () => {
  return (
    <PageLayout>
      <div className="px-4 py-10 text-center sm:px-6 lg:px-8">
        <h1 className="block text-7xl font-bold text-gray-800 dark:text-white sm:text-9xl">
          You're all set!
        </h1>
        <h1 className="block text-2xl font-bold text-white"></h1>
        <p className="mt-3 text-gray-600 dark:text-gray-400">
          You've connected your account to this event. Now just wait for the
          drawing to happen!
        </p>
      </div>
    </PageLayout>
  );
};

export default ConnectDone;
