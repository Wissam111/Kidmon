import ActivityRepository from "../../../repository/ActivityRepository";
import { useFamilyMemberContext } from "../../../hooks/useFamilyMemberContext";
import { startOfWeek, endOfWeek, format } from "date-fns";
import { useEffect, useState } from "react";
import { useLoadingContext } from "../../../hooks/useLoadingContext";

const FamilyMemberHomeViewModel = () => {
  const activityRepository = ActivityRepository();
  const { familyMember } = useFamilyMemberContext();
  const [spendings, setSpendings] = useState([]);
  const { setLoading } = useLoadingContext();

  const currentDate = new Date();
  const startDate = format(startOfWeek(currentDate), "yyyy-MM-dd");
  const endDate = format(endOfWeek(currentDate), "yyyy-MM-dd");

  const getSpendings = async (startDate, endDate) => {
    try {
      const data = await activityRepository.getSpendings(
        familyMember.id,
        startDate,
        endDate
      );
      setSpendings(data.spendings);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const FamilyMemberHomeInit = async () => {
      setLoading(true);
      await getSpendings(startDate, endDate);
      setLoading(false);
    };

    FamilyMemberHomeInit();
  }, [familyMember]);

  return { familyMember, spendings };
};

export default FamilyMemberHomeViewModel;
