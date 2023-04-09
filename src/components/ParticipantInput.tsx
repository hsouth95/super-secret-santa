import React, { useState } from "react";

interface ParticipantInputProps {
  handleParticipantChange: (newParticipantList: string[]) => void;
}

export const ParticipantInput = ({
  handleParticipantChange,
}: ParticipantInputProps) => {
  const [participantList, setParticipantList] = useState<string[]>(["", ""]);

  function handleAddParticipant(event: any) {
    event.preventDefault();
    if (participantList[participantList.length - 1] === "") {
      // They haven't filled out the last one yet, so don't add another
      return;
    }
    setParticipantList([...participantList, ""]);
  }

  return (
    <div>
      {participantList.map((participant, index) => {
        return (
          <div key={index}>
            {index === 0 ? (
              <label className="mb-1 block text-white">
                The first one is you, so give yourself a name to display to the
                others!
              </label>
            ) : (
              <label className="mb-1 block text-white">
                Add a new participant
              </label>
            )}
            <input
              type="text"
              className="mb-10 block w-full rounded-md border-gray-200 py-3 px-4 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400"
              value={participant}
              onChange={(event) => {
                const newParticipantList = [...participantList];
                newParticipantList[index] = event.target.value;
                setParticipantList(newParticipantList);

                handleParticipantChange(newParticipantList);
              }}
              placeholder={
                index === 0
                  ? "Enter your display name"
                  : `Enter participant ${index + 1}`
              }
              required={index === 0 ? true : false}
            />
          </div>
        );
      })}
      <button
        className="mt-5 inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 py-3 px-4 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        onClick={(event) => handleAddParticipant(event)}
      >
        Add another participant
      </button>
      ;
    </div>
  );
};
