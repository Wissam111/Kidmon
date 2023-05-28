import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useFamilyMemberContext } from "../../../hooks/useFamilyMemberContext";
import ActivityRepository from "../../../repository/ActivityRepository";
import { useNavigation } from "@react-navigation/native";
import { useLoadingContext } from "../../../hooks/useLoadingContext";
import { cos } from "react-native-reanimated";
const TransferViewModel = () => {
  const [points, setPoints] = useState("");
  const { user } = useAuthContext();
  const { setLoading } = useLoadingContext();
  const { familyMember } = useFamilyMemberContext();
  const navigation = useNavigation();

  const activityRepository = ActivityRepository();
  const transferPoints = async () => {
    try {
      const data = await activityRepository.transferPoints(
        user.id,
        familyMember.id,
        points
      );
      handleAlert("success", "Transfered points successfully");
      NavigateHome();
    } catch (error) {
      console.log(error);
      handleAlert("error", "Error transfering point: " + error.error.message);
    }
  };

  hanldeChangePoints = (value) => {
    setPoints(value);
  };

  const handleAlert = (type, message) => {
    const alertTitle = type === "success" ? "Success" : "Error";
    const alertButton = { text: "OK", onPress: () => {} };
    Alert.alert(alertTitle, message, [alertButton], { cancelable: false });
  };

  const handleTransferPoints = async () => {
    if (!isEnoughParentBalance()) {
      handleAlert("error", "Parent balance is not enough");
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
  return { points, hanldeChangePoints, handleTransferPoints };
};

export default TransferViewModel;
