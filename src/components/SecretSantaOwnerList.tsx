import Link from "next/link";
import React, { useState } from "react";
import { api } from "../utils/api";

import {
  CalendarIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

function getWarnings(event: any) {
  const warnings = [];
  if (!event.presentsOpening) {
    warnings.push("Presents opening date not set.");
  }
  if (event.participants.some((p: any) => !p.userId)) {
    warnings.push("Some participants have not accepted invitations.");
  }

  return warnings;
}

export const SecretSantaOwnerList = () => {
  const secretSantas = api.secretSanta.getAllSecretSantasByUser.useQuery();

  return (
    <>
      {secretSantas?.data &&
        secretSantas?.data.map((ss) => {
          const warnings = getWarnings(ss);
          return (
            <Link href={`/santa/${ss.id}`}>
              <div className="my-10 bg-gray-500 p-10">
                <h2 className="text-2xl font-bold">{ss.name}</h2>
                {warnings.length > 0 ? (
                  <div className="mt-2 inline">
                    {warnings.map((w) => {
                      return (
                        <div className="text-amber-500">
                          <ExclamationTriangleIcon className="inline h-5 w-5" />
                          {" " + w}
                        </div>
                      );
                    })}
                  </div>
                ) : null}
                <p className="text-xl">
                  {ss.participants.length ? ss.participants.length : 0} members
                </p>
                <p>
                  {ss.presentsOpening ? (
                    <span>
                      <CalendarIcon className="inline h-5 w-5" />
                      ss.presentsOpening.getDate()
                    </span>
                  ) : (
                    <div className="mt-2 inline">
                      <CalendarIcon className="inline h-5 w-5" /> Not set
                    </div>
                  )}
                </p>
              </div>
            </Link>
          );
        })}
    </>
  );
};
