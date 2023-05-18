import { apiCall } from "../network/apiCall";
import axios from "axios";
import { BASE_URL } from "../network/apiCall";

const UserRepository = () => {
  const getUserByRFID = async (braceletId) => {
    console.log(braceletId);
    const data = await apiCall(`users/bracelet/${"0007136159"}`);
    return data;
  };

  const createFamilyMember = async (formData) => {
    // const data = await axios.post(BASE_URL + "users/family-member", formData);
    // return data;
    // console.log(formData);
    const data = await apiCall(
      `users/family-member`,
      "POST",
      formData,
      null,
      "multipart/form-data"
    );
    return data;
  };

  return { getUserByRFID, createFamilyMember };
};

export default UserRepository;
