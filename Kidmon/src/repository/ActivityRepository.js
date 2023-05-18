import { apiCall } from "../network/apiCall";

const ActivityRepository = () => {
  const getActivities = async (userId) => {
    let url = `activities/user-activities?userId=${userId}&sort=${"desc"}`;
    const data = await apiCall(url);
    return data;
  };
  const getSpendings = async (userId, startDate, endDate) => {
    let url = `activities/user-spendings?userId=${userId}&startDate=${startDate}&endDate=${endDate}`;

    const data = await apiCall(url);
    return data;
  };
  return { getActivities, getSpendings };
};

export default ActivityRepository;
