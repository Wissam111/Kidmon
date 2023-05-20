import { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import ActivityRepository from "../../../repository/ActivityRepository";
const HomeParentViewModel = () => {
  const { authData } = useAuthContext();
  const activitiesRepository = ActivityRepository()

  const [activities, setActivities] = useState([])

  const getActivities = useCallback(async () => {
    const activities = await activitiesRepository.getFamilyMembersActivites({ userId: authData.user.id })
    setActivities((old) => {
      return activities
    })
  })


  return {
    user: authData?.user,
    getActivities,
    activities
  };
};

export default HomeParentViewModel;
