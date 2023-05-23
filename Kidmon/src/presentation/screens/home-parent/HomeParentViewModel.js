import { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import ActivityRepository from "../../../repository/ActivityRepository";
import UserRepository from "../../../repository/UserRepository";
import { useLoadingContext } from "../../../hooks/useLoadingContext";
import { Alert } from "react-native";
const HomeParentViewModel = ({ navigation }) => {
  const { user, dispatch } = useAuthContext();
  const activitiesRepository = ActivityRepository();
  const userRepository = UserRepository();
  const [activities, setActivities] = useState([]);
  const { setLoading } = useLoadingContext();
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
    dispatch({ type: "UPDATE_USER", payload: data.user });
  };

  const handleAlert = (type, message) => {
    const alertTitle = type === "success" ? "Success" : "Error";
    const alertButton = { text: "OK", onPress: () => {} };
    Alert.alert(alertTitle, message, [alertButton], { cancelable: false });
  };

  useEffect(() => {
    const HomeParentInit = async () => {
      setLoading(true);
      await UpdateUser(user.id);
      await getActivities();
      setLoading(false);
    };

    const unsubscribe = navigation.addListener("focus", () => {
      HomeParentInit();
    });

    return unsubscribe;
  }, [navigation]);

  return {
    user,
    // getActivities,
    activities,
  };
};

export default HomeParentViewModel;
