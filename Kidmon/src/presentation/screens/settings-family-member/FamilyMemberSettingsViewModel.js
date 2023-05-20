import { useState, useCallback } from "react";

import { useFamilyMemberContext } from "../../../hooks/useFamilyMemberContext";

import UserRepository from "../../../repository/UserRepository";
import { useLimitsContext } from "../../../hooks/useLimitsContext";
const FamilyMemberSettingsViewModel = () => {
  const { familyMember } = useFamilyMemberContext();

  const userRepository = UserRepository();
  const [childAllergies, setChildAllergies] = useState(familyMember?.allergies);
  const { limits } = useLimitsContext();
  const updateUser = async () => {
    try {
      const data = await userRepository.updateUser({ limits });
      console.log("updated", data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAllergies = (ingredient) => {
    const updatedAllergies = childAllergies.includes(ingredient)
      ? childAllergies.filter((a) => a !== ingredient)
      : [...childAllergies, ingredient];
    setChildAllergies(updatedAllergies);
  };

  return {
    familyMember,
    childAllergies,
    handleAllergies,
    updateUser,
  };
};

export default FamilyMemberSettingsViewModel;
