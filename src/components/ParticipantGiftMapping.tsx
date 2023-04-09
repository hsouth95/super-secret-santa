import { Participant, Prisma } from "@prisma/client";
import React, { useState } from "react";
import Select from "react-select";
import MultiValue from "react-select";

type ParticipantWithExcluded = Prisma.ParticipantGetPayload<{
  include: {
    excluded: true;
  };
}>;

type SelectOptionReturn = {
  value: any;
  label: any;
};

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
  const handleChange = (newValue: SelectOptionReturn[]) => {
    // const handleChange = (newValue: readonly MultiValue<{value: any, id: any}>)
    onChange(
      participant,
      newValue.map((p: any) => p.value)
    );
  };

  return (
    <div className="w-1/3 p-2">
      <p className="text-3xl font-extrabold">{participant.name}</p>
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
