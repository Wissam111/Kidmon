import { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import ActivityRepository from "../../../repository/ActivityRepository";
import UserRepository from "../../../repository/UserRepository";
import { useLoadingContext } from "../../../hooks/useLoadingContext";
import { Alert } from "react-native";
import { useAlertsContext } from "../../../hooks/useAlertsContext";
import { useFocusEffect } from "@react-navigation/native";
const HomeParentViewModel = ({ navigation }) => {
  const { user, dispatch } = useAuthContext();
  const [activeModal, setActiveModal] = useState(false);
  const activitiesRepository = ActivityRepository();
  const userRepository = UserRepository();
  const [activities, setActivities] = useState([]);
  const { setLoading } = useLoadingContext();
  const [refreshKey, setRefreshKey] = useState(0);
  const { showSuccess, showError } = useAlertsContext();
  const getUser = async (userId) => {
    try {
      const data = await userRepository.getUser(userId);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getActivities = useCallback(async () => {
    try {
      const activities = await activitiesRepository.getFamilyMembersActivites({
        userId: user.id,
      });
      setActivities((old) => {
        return activities;
      });
    } catch (error) {
      console.log(error);
      handleAlert("error", "Error getting activities: ", error.message);
    }
  });

  const UpdateUser = async (userId) => {
    const data = await getUser(userId);
    if (!data?.user) {
      return;
    }
    console.log("update user", data.user);
    dispatch({ type: "UPDATE_USER", payload: data.user });
  };

  const handleAlert = (type, message) => {
    const alertTitle = type === "success" ? "Success" : "Error";
    const alertButton = { text: "OK", onPress: () => {} };
    Alert.alert(alertTitle, message, [alertButton], { cancelable: false });
  };

  const chargeBalance = async (value) => {
    try {
      console.log(value);
      const data = await userRepository.chargeBalance({
        userId: user?.id,
        points: value,
      });

      console.log(data);
      showSuccess("Balance charged successfully");
      refresh();
    } catch (error) {
      showError(error?.message);
    }
  };

  const refresh = () => {
    setRefreshKey((oldKey) => oldKey + 1);
  };

  const HomeParentInit = async () => {
    setLoading(true);
    await UpdateUser(user.id);
    await getActivities();
    setLoading(false);
  };
  useEffect(() => {
    HomeParentInit();
  }, [refreshKey]);

  useEffect(() => {
    if (user === undefined) return;
    const unsubscribe = navigation.addListener("focus", () => {
      HomeParentInit();
    });
    return unsubscribe;
  }, [navigation, user?.id]);

  const handleLogout = async () => {
    dispatch({ type: "LOGOUT" });
    await cleanData();
    navigation.navigate("Entry");
  };
  const cleanData = async () => {
    try {
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("token");
    } catch (e) {
      console.log("Error removing data:", e);
    }
  };
  return {
    user,
    // getActivities,
    activities,
    activeModal,
    setActiveModal,
    chargeBalance,
    handleLogout,
  };
};

export default HomeParentViewModel;
