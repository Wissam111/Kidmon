import { createContext, useState } from "react";

import { useFamilyMemberContext } from "../hooks/useFamilyMemberContext";
export const LimitsContext = createContext();

export const LimitsContextProvider = ({ children }) => {
  const { familyMember } = useFamilyMemberContext();
  const [limits, setLimits] = useState(() => ({
    daily: {
      value: familyMember.limits?.daily?.value,
      isActive: familyMember.limits?.daily?.isActive,
    },
    weekly: {
      value: familyMember.limits?.weekly?.value,
      isActive: familyMember.limits?.weekly?.isActive,
    },
    monthly: {
      value: familyMember.limits?.monthly?.value,
      isActive: familyMember.limits?.monthly?.isActive,
    },
  }));
  const handleLimitSwitchChange = (type, isActive) => {
    setLimits((prevLimits) => ({
      ...prevLimits,
      [type]: {
        ...prevLimits[type],
        isActive: isActive,
      },
    }));
  };

  const handleSliderValueChange = (type, value) => {
    setLimits((prevLimits) => ({
      ...prevLimits,
      [type]: {
        ...prevLimits[type],
        value: value,
      },
    }));
  };

  return (
    <LimitsContext.Provider
      value={{ limits, handleLimitSwitchChange, handleSliderValueChange }}
    >
      {children}
    </LimitsContext.Provider>
  );
};
