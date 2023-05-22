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
  const [spendings, setSpendings] = useState({
    daily: 0,
    weekly: 0,
    monthly: 0,
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
    console.log(dailySpendings);
    console.log(weeklySpendings);
    console.log(monthlySpendings);
    setSpendings({
      daily: dailySpendings,
      weekly: weeklySpendings,
      monthly: monthlySpendings,
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

  return { familyMember, weekSpendings };
};

export default FamilyMemberHomeViewModel;
