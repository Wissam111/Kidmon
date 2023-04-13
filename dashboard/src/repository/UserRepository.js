import React from "react";
import { useApiContext } from "../hooks/useApiContext";

const UserRepository = () => {
  const { apiCall } = useApiContext();

  const getUserByRFID = async (braceletId) => {
    console.log(braceletId);
    const data = await apiCall(`users/bracelet/${braceletId}`);
    return data;
  };
  const makePurchase = async (userId, items) => {
    const data = await apiCall(`activities/purchase`, "POST", {
      userId,
      items,
    });
    return data;
  };

  return { getUserByRFID, makePurchase };
};

export default UserRepository;
