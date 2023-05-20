import { apiCall } from "../network/apiCall";
import axios from "axios";
import { BASE_URL } from "../network/apiCall";

const UserRepository = () => {
  const getUserByRFID = async (braceletId) => {
    const data = await apiCall(`users/bracelet/${"0007136159"}`);
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
    const data = await apiCall("users/", "PATCH", updatedUserObj);
    return data;
  };

  return { getUserByRFID, createFamilyMember, updateUser };
};

export default UserRepository;
