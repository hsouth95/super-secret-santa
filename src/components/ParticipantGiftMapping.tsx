import type { Prisma } from "@prisma/client";
import { Participant } from "@prisma/client";
import React, { useState } from "react";
import Select from "react-select";
import MultiValue from "react-select";

type ParticipantWithExcluded = Prisma.ParticipantGetPayload<{
  include: {
    excluded: true;
  };
}>;

interface ParticipantGiftMappingProps {
  participant: ParticipantWithExcluded;
  possibleGiftMatchers: ParticipantWithExcluded[];
  onChange: (
    participant: ParticipantWithExcluded,
    excludedParticipantIds: string[]
  ) => void;
}

export const ParticipantGiftMapping = ({
  participant,
  possibleGiftMatchers,
  onChange,
}: ParticipantGiftMappingProps) => {
  const handleChange = (newValue: any) => {
    onChange(
      participant,
      newValue.map((p: any) => p.value)
    );
  };

  return (
    <div className="w-full p-2 sm:w-1/3">
      <p className="text-3xl font-bold">{participant.name}</p>
      <Select
        className="text-black"
        defaultValue={participant?.excluded.map((p: any) => ({
          value: p.id,
          label: p.name,
        }))}
        options={possibleGiftMatchers.map((p: any) => ({
          value: p.id,
          label: p.name,
          isDisabled: p.id === participant.id,
        }))}
        isMulti={true}
        closeMenuOnSelect={false}
        onChange={handleChange}
      />
    </div>
  );
};
