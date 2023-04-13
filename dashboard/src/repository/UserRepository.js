import React from "react";
import { useApiContext } from "../hooks/useApiContext";

const UserRepository = () => {
  const { apiCall } = useApiContext();

  const getUserByRFID = async (braceletId) => {
    console.log(braceletId);
    const data = await apiCall(`users/bracelet/${braceletId}`);
    return data;
  };

  return { getUserByRFID };
};

export default UserRepository;
