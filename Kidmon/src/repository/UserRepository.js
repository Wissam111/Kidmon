import { apiCall } from "../network/apiCall";
import axios from "axios";
import { BASE_URL } from "../network/apiCall";

const UserRepository = () => {
  const getUser = async (userId) => {
    const data = await apiCall(`users/${userId}`);
    return data;
  };

  const getUserByRFID = async (braceletId) => {
    const data = await apiCall(`users/bracelet/${braceletId}`);
    return data;
  };

  const createFamilyMember = async (formData) => {
    const data = await apiCall(
      `users/family-member`,
      "POST",
      formData,
      null,
      "multipart/form-data"
    );
    return data;
  };

  const updateUser = async (updatedUserObj) => {
    console.log(updatedUserObj);
    const data = await apiCall("users/", "PATCH", updatedUserObj);
    return data;
  };

  const chargeBalance = async ({ userId, points }) => {
    const data = await apiCall("users/pointsCharge", "POST", {
      userId,
      points,
    });
    return data;
  };

  return {
    getUser,
    getUserByRFID,
    createFamilyMember,
    updateUser,
    chargeBalance,
  };
};

export default UserRepository;
