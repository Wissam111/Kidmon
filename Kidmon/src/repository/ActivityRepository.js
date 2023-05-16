import { apiCall } from "../network/apiCall";

const ActivityRepository = () => {
  const getActivities = async () => {
    const data = await apiCall("activities/user-activities");
    return data;
  };
  const getSpendings = async (userId, startDate, endDate) => {
    console.log(startDate);
    let url = `activities/user-spendings?userId=${userId}&startDate=${startDate}&endDate=${endDate}`;

    const data = await apiCall(url);
    return data;
  };
  return { getActivities, getSpendings };
};

export default ActivityRepository;
