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
            {index === 0 && (
              <label className="block text-white">
                The first one is you, so give yourself a name to display to the
                others!
              </label>
            )}
            <input
              type="text"
              className="form-input my-2 py-3 px-4"
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
        className="form-input"
        onClick={(event) => handleAddParticipant(event)}
      >
        Add another participant
      </button>
      ;
    </div>
  );
};
