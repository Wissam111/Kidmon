import { useState, useCallback, useEffect } from "react";

import { useFamilyMemberContext } from "../../../hooks/useFamilyMemberContext";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import UserRepository from "../../../repository/UserRepository";
const FamilyMemberSettingsViewModel = () => {
  const { familyMember } = useFamilyMemberContext();
  const [childLimits, setChildLimits] = useState({});
  const navigation = useNavigation();
  const userRepository = UserRepository();
  const [childAllergies, setChildAllergies] = useState(familyMember?.allergies);
  const updateUser = async () => {
    try {
      const data = await userRepository.updateUser({
        userId: familyMember.id,
        limits: childLimits,
        allergies: childAllergies,
      });
      handleAlert("success", "allergies and limits updated successfully");
      NavigateHome();
    } catch (error) {
      console.log(error);
      handleAlert(
        "error",
        "error updating allergies and limits " + error.message
      );
    }
  };

  const handleAllergies = (ingredient) => {
    const updatedAllergies = childAllergies.includes(ingredient)
      ? childAllergies.filter((a) => a !== ingredient)
      : [...childAllergies, ingredient];
    setChildAllergies(updatedAllergies);
  };

  useEffect(() => {
    let limits = {
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
    };
    setChildLimits(limits);
  }, [familyMember]);

  const handleLimitSwitchChange = (type, isActive) => {
    setChildLimits((prevLimits) => ({
      ...prevLimits,
      [type]: {
        ...prevLimits[type],
        isActive: isActive,
      },
    }));
  };
  const handleAlert = (type, message) => {
    const alertTitle = type === "success" ? "Success" : "Error";
    const alertButton = { text: "OK", onPress: () => {} };
    Alert.alert(alertTitle, message, [alertButton], { cancelable: false });
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
