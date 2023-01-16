import React, { useState } from "react";

interface ParticipantInputProps {
  handleParticipantChange: (newParticipantList: string[]) => void;
}

export const ParticipantInput = ({
  handleParticipantChange,
}: ParticipantInputProps) => {
  const [participantList, setParticipantList] = useState<string[]>([""]);

  function handleAddParticipant(event: any) {
    event.preventDefault();
    setParticipantList([...participantList, ""]);
  }

  return (
    <div>
      {participantList.map((participant, index) => {
        return (
          <div key={index}>
            <input
              type="text"
              className="form-input mb-2 py-3 px-4"
              value={participant}
              onChange={(event) => {
                const newParticipantList = [...participantList];
                newParticipantList[index] = event.target.value;
                setParticipantList(newParticipantList);

                handleParticipantChange(newParticipantList);
              }}
              placeholder={`Enter participant ${index + 1}`}
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
