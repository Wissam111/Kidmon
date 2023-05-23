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

  const currentDate = new Date();
  const startWeekDate = format(startOfWeek(currentDate), "yyyy-MM-dd");
  const endOfWeekData = format(endOfWeek(currentDate), "yyyy-MM-dd");
  const startMonthDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const endMonthDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
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
      handleAlert("error", "Error getting spendings: " + error.message);
    }
  };

  const updateSpendings = async (startDate, endDate) => {
    const data = await getSpendings(startDate, endDate);
    const filteredSpendings = data.spendings;
    const currentDay = currentDate.getDate();
    const dailySpendings = filteredSpendings
      .filter((spending) => spending.day === currentDay)
      .reduce((total, spending) => total + spending.totalSpendings, 0);

    // Calculate the total spending of the current week
    const startOfWeekDate = new Date().getDay() === 0 ? 7 : new Date().getDay();
    const weeklySpendings = filteredSpendings
      .filter(
        (spending) =>
          spending.day >= currentDay - startOfWeekDate + 1 &&
          spending.day <= currentDay
      )
      .reduce((total, spending) => total + spending.totalSpendings, 0);

    // Calculate the total spending of the current month
    const monthlySpendings = filteredSpendings.reduce(
      (total, spending) => total + spending.totalSpendings,
      0
    );
    const dailyLimit = familyMember.limits?.daily;
    const weeklyLimit = familyMember.limits?.weekly;
    const monthlyLimit = familyMember.limits?.monthly;
    const spendingsLimits = {
      daily: {
        percentage: Math.round((dailySpendings / dailyLimit?.value) * 100),
        remainin: dailyLimit?.isActive
          ? Math.round(dailyLimit.value - dailySpendings)
          : null,
      },

      weekly: {
        percentage: Math.round((weeklySpendings / weeklyLimit?.value) * 100),
        remainin: weeklyLimit?.isActive
          ? Math.round(weeklyLimit?.value - weekSpendings)
          : null,
      },
      monthly: {
        percentage: Math.round((monthlySpendings / monthlyLimit?.value) * 100),
        remainin: monthlyLimit?.isActive
          ? Math.round(monthlyLimit?.value - monthlySpendings)
          : null,
      },
    };
    setSpendingsLimits(spendingsLimits);
  };

  const UpdateChart = async (startDate, endDate) => {
    const data = await getSpendings(startDate, endDate);
    setWeekSpendings(data.spendings);
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
      await updateSpendings(startMonthDate, endMonthDate);
      setLoading(false);
    };

    FamilyMemberHomeInit();
  }, [familyMember]);

  return { familyMember, weekSpendings, spendingsLimits };
};

export default FamilyMemberHomeViewModel;
