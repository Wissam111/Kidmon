import { useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useFamilyMemberContext } from "../../../hooks/useFamilyMemberContext";
import ActivityRepository from "../../../repository/ActivityRepository";
import { useNavigation } from "@react-navigation/native";
import { useLoadingContext } from "../../../hooks/useLoadingContext";
import { useAlertsContext } from "../../../hooks/useAlertsContext";
const TransferViewModel = () => {
  const [points, setPoints] = useState("");
  const { user } = useAuthContext();
  const { setLoading } = useLoadingContext();
  const { familyMember } = useFamilyMemberContext();
  const { showSuccess, showError, showWarning } = useAlertsContext();
  const navigation = useNavigation();

  const activityRepository = ActivityRepository();
  const transferPoints = async () => {
    try {
      const data = await activityRepository.transferPoints(
        user.id,
        familyMember.id,
        points
      );
      showSuccess("Transfered points successfully");
      NavigateHome();
    } catch (error) {
      console.log(error);
      showError("Error transfering point: " + error.error.message);
    }
  };

  hanldeChangePoints = (value) => {
    setPoints(value);
  };

  const handleTransferPoints = async () => {
    if (!isEnoughParentBalance()) {
      showWarning("Parent balance is not enough");
      return;
    }
    setLoading(true);
    await transferPoints();
    setLoading(false);
  };

  const isEnoughParentBalance = () => {
    return Number(points) <= user.credits;
  };
  const NavigateHome = () => {
    navigation.navigate("HomeParent");
  };
  return { points, hanldeChangePoints, handleTransferPoints, familyMember };
};

export default TransferViewModel;
