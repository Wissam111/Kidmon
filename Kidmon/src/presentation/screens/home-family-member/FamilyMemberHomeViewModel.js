import ActivityRepository from "../../../repository/ActivityRepository";
import { useFamilyMemberContext } from "../../../hooks/useFamilyMemberContext";
import { startOfWeek, endOfWeek, format } from "date-fns";
import { useEffect, useState } from "react";
import { useLoadingContext } from "../../../hooks/useLoadingContext";
import { Alert } from "react-native";
const FamilyMemberHomeViewModel = () => {
  const activityRepository = ActivityRepository();
  const { familyMember } = useFamilyMemberContext();
  const [weekSpendings, setWeekSpendings] = useState([]);
  const { setLoading } = useLoadingContext();
  const currentDate = new Date();
  const startWeekDate = format(startOfWeek(currentDate), "yyyy-MM-dd");
  const endOfWeekData = format(endOfWeek(currentDate), "yyyy-MM-dd");
  const [spendingsLimits, setSpendingsLimits] = useState({
    daily: {
      percentage: 0,
      remainin: null,
    },
    weekly: {
      percentage: 0,
      remainin: null,
    },
    monthly: {
      percentage: 0,
      remainin: null,
    },
  });

  const getSpendings = async (startDate, endDate) => {
    try {
      const data = await activityRepository.getSpendings(
        familyMember.id,
        startDate,
        endDate
      );
      return data;
    } catch (error) {
      console.log(error);
      handleAlert("error", "Error getting spendings: " + error?.message);
    }
  };

  const updateSpendings = () => {
    const dailyLimit = familyMember?.limits?.daily;
    const weeklyLimit = familyMember?.limits?.weekly;
    const monthlyLimit = familyMember?.limits?.monthly;
    const spendingsLimits = {
      daily: {
        percentage: Math.round((dailyLimit?.current / dailyLimit?.value) * 100),
        remainin: dailyLimit?.isActive
          ? Math.round(dailyLimit?.value - dailyLimit?.current)
          : null,

        current: dailyLimit?.current,
      },

      weekly: {
        percentage: Math.round(
          (weeklyLimit?.current / weeklyLimit?.value) * 100
        ),
        remainin: weeklyLimit?.isActive
          ? Math.round(weeklyLimit?.value - weeklyLimit?.current)
          : null,
        current: weeklyLimit?.current,
      },
      monthly: {
        percentage: Math.round(
          (monthlyLimit?.current / monthlyLimit?.value) * 100
        ),
        remainin: monthlyLimit?.isActive
          ? Math.round(monthlyLimit?.value - monthlyLimit?.current)
          : null,
        current: monthlyLimit?.current,
      },
    };
    setSpendingsLimits(spendingsLimits);
  };

  const UpdateChart = async (startDate, endDate) => {
    const data = await getSpendings(startDate, endDate);
    setWeekSpendings(data?.spendings);
  };

  const handleAlert = (type, message) => {
    const alertTitle = type === "success" ? "Success" : "Error";
    const alertButton = { text: "OK", onPress: () => {} };
    Alert.alert(alertTitle, message, [alertButton], { cancelable: false });
  };
  useEffect(() => {
    const FamilyMemberHomeInit = async () => {
      setLoading(true);
      await UpdateChart(startWeekDate, endOfWeekData);
      updateSpendings();
      setLoading(false);
    };

    FamilyMemberHomeInit();
  }, [familyMember]);

  return { familyMember, weekSpendings, spendingsLimits };
};

export default FamilyMemberHomeViewModel;
