import { apiCall } from "../network/apiCall";

const UserRepository = () => {
  const getUserByRFID = async (braceletId) => {
    console.log(braceletId);
    const data = await apiCall(`users/bracelet/${"0007136159"}`);
    return data;
  };

  return { getUserByRFID };
};

export default UserRepository;
