import { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import ActivityRepository from "../../../repository/ActivityRepository";
import UserRepository from "../../../repository/UserRepository";
import { useLoadingContext } from "../../../hooks/useLoadingContext";
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
    const activities = await activitiesRepository.getFamilyMembersActivites({
      userId: user.id,
    });
    setActivities((old) => {
      return activities;
    });
  });

  const UpdateUser = async (userId) => {
    const data = await getUser(userId);
    dispatch({ type: "UPDATE_USER", payload: data.user });
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
