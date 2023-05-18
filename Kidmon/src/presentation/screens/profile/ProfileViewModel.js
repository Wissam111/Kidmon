import { useEffect, useState } from "react";

import ActivityRepository from "../../../repository/ActivityRepository";
import { useLoadingContext } from "../../../hooks/useLoadingContext";
import { useFamilyMemberContext } from "../../../hooks/useFamilyMemberContext";

const ProfileViewModel = () => {
  const activityRepository = ActivityRepository();
  const { setLoading } = useLoadingContext();
  const { familyMember } = useFamilyMemberContext();
  const [activities, setActivities] = useState([]);

  const getActivities = async (userId) => {
    try {
      const data = await activityRepository.getActivities(userId);
      setActivities(data.activities);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const ProfileInit = async () => {
      setLoading(true);
      await getActivities(familyMember.id);
      setLoading(false);
    };

    ProfileInit();
  }, [familyMember]);

  return { activities, familyMember };
};

export default ProfileViewModel;
