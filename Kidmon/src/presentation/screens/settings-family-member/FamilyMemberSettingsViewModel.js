import { useState, useCallback, useEffect } from "react";

import { useFamilyMemberContext } from "../../../hooks/useFamilyMemberContext";
import { useNavigation } from "@react-navigation/native";
import UserRepository from "../../../repository/UserRepository";
import { useAlertsContext } from "../../../hooks/useAlertsContext";
const FamilyMemberSettingsViewModel = () => {
  const { familyMember } = useFamilyMemberContext();
  const [childLimits, setChildLimits] = useState({});
  const navigation = useNavigation();
  const userRepository = UserRepository();
  const [childAllergies, setChildAllergies] = useState(familyMember?.allergies);
  const { showSuccess, showError } = useAlertsContext();

  const updateUser = async () => {
    try {
      const data = await userRepository.updateUser({
        userId: familyMember.id,
        limits: childLimits,
        allergies: childAllergies,
      });
      showSuccess("allergies and limits updated successfully");
      NavigateHome();
    } catch (error) {
      console.log(error);
      showError("error updating allergies and limits " + error.message);
    }
  };

  const handleAllergies = (ingredient) => {
    const updatedAllergies = childAllergies.includes(ingredient)
      ? childAllergies.filter((a) => a !== ingredient)
      : [...childAllergies, ingredient];
    setChildAllergies(updatedAllergies);
  };

  useEffect(() => {
    console.log("----------------", familyMember?.limits?.isActive);
    let limits = {
      isActive: familyMember?.limits?.isActive,
      daily: {
        value: familyMember?.limits?.daily?.value,
        isActive: familyMember?.limits?.daily?.isActive,
      },
      weekly: {
        value: familyMember?.limits?.weekly?.value,
        isActive: familyMember?.limits?.weekly?.isActive,
      },
      monthly: {
        value: familyMember?.limits?.monthly?.value,
        isActive: familyMember?.limits?.monthly?.isActive,
      },
    };

    setChildLimits(limits);
  }, [familyMember]);

  const handleLimitSwitchChange = (type, isActive) => {
    if (type === "ALL") {
      setChildLimits((prevLimits) => ({
        ...prevLimits,
        isActive: isActive,
      }));
      return;
    }

    setChildLimits((prevLimits) => ({
      ...prevLimits,
      [type]: {
        ...prevLimits[type],
        isActive: isActive,
      },
    }));
  };

  const handleSliderValueChange = (type, value) => {
    setChildLimits((prevLimits) => ({
      ...prevLimits,
      [type]: {
        ...prevLimits[type],
        value: value,
      },
    }));
  };
  const NavigateHome = () => {
    navigation.navigate("HomeParent");
  };

  return {
    familyMember,
    childAllergies,
    handleAllergies,
    childLimits,
    updateUser,
    handleLimitSwitchChange,
    handleSliderValueChange,
  };
};

export default FamilyMemberSettingsViewModel;
