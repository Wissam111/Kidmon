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

  const getUserActivites = async ({
    userId,
    page,
    pageSize,
    sort = "desc",
  }) => {
    let url = `activities/user-activities?userId=${userId}&page=${page}&pageSize=${pageSize}&sort=${sort}`;
    const data = await apiCall(url);
    return data;
  };

  const getFamilyMembersActivites = async ({
    userId,
    page,
    pageSize,
    sort = "desc",
  }) => {
    let url = `activities/family-members-activities?userId=${userId}`;
    const data = (await apiCall(url)).activities;
    return data;
  };

  return {
    getActivities,
    getSpendings,
    getUserActivites,
    getFamilyMembersActivites,
  };
};

export default ActivityRepository;
