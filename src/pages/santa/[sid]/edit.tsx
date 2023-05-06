import dayjs from "dayjs";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { PageLayout } from "../../../components/Layout";
import { SuccessToast } from "../../../components/SuccessToast";
import { api } from "../../../utils/api";

interface SecretSantaProps {
  name: string;
  presentsOpening?: Date | null;
  userId?: string;
}

const EditSecretSanta: NextPage = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const secretSantaMutation = api.secretSanta.updateSecretSanta.useMutation();
  const ss = api.secretSanta.getSecretSantaById.useQuery(
    {
      id: router.query.sid as string,
    },
    {
      enabled:
        sessionData?.user !== undefined && router.query.sid !== undefined,
    }
  );
  return (
    <div className="justify-top container mt-16 bg-gray-600 px-10 py-16 shadow-lg">
      <div>
        {secretSantaMutation.isSuccess && (
          <SuccessToast message="Successfully updated event" />
        )}
      </div>
      <form
        className="mt-10 flex flex-wrap"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const ss = {
            id: router.query.sid as string,
            name: formData.get("name") as string,
            date: new Date(formData.get("presentsOpening") as string),
          };
          secretSantaMutation.mutate(ss);
        }}
      >
        <div className="flex w-full flex-col sm:w-1/2">
          <label className="mb-5 text-2xl font-bold text-white">
            The name of your event
          </label>
          <input
            className="rounded-md border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400"
            type="text"
            name="name"
            defaultValue={ss?.data?.name}
          />
        </div>
        <div className="mt-10 flex w-full flex-col sm:w-1/2">
          <label className="mb-5 text-2xl font-bold text-white">
            The date you want to open presents
          </label>
          <input
            className="rounded-md border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400"
            type="date"
            name="presentsOpening"
            defaultValue={dayjs(ss?.data?.presentsOpening).format("YYYY-MM-DD")}
          />
        </div>
        <div className="mt-10 flex">
          <button
            className="block w-full rounded-md border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400"
            type="submit"
          >
            Save
          </button>
          <button
            className="ml-5 block w-full rounded-md border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400"
            type="button"
            onClick={() => router.push("/santa")}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSecretSanta;
