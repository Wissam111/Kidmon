import ActivityRepository from "../../../repository/ActivityRepository";
import { useFamilyMemberContext } from "../../../hooks/useFamilyMemberContext";
import { startOfWeek, endOfWeek, format } from "date-fns";
import { useEffect, useState } from "react";
import { useLoadingContext } from "../../../hooks/useLoadingContext";

const FamilyMemberHomeViewModel = () => {
  const activityRepository = ActivityRepository();
  const { familyMember } = useFamilyMemberContext();
  const [weekSpendings, setWeekSpendings] = useState([]);
  const { setLoading } = useLoadingContext();
  const [spendingsLimits, setSpendingsLimits] = useState({
    daily: {
      percentage: 0,
      remainin: 0,
    },
    weekly: {
      percentage: 0,
      remainin: 0,
    },
    monthly: {
      percentage: 0,
      remainin: 0,
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
    const dailyLimitVal = familyMember.limits?.daily?.value;
    const weeklyLimitVal = familyMember.limits?.weekly?.value;
    const monthlyLimitVal = familyMember.limits?.monthly?.value;

    setSpendingsLimits({
      daily: {
        percentage: Math.round((dailySpendings / dailyLimitVal) * 100),
        remainin: Math.round(dailyLimitVal - dailySpendings),
      },

      weekly: {
        percentage: Math.round((weeklySpendings / weeklyLimitVal) * 100),
        remainin: Math.round(weeklyLimitVal - weekSpendings),
      },
      monthly: {
        percentage: Math.round((monthlySpendings / monthlyLimitVal) * 100),
        remainin: Math.round(monthlyLimitVal - monthlySpendings),
      },
    });
  };

  const UpdateChart = async (startDate, endDate) => {
    const data = await getSpendings(startDate, endDate);
    setWeekSpendings(data.spendings);
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
