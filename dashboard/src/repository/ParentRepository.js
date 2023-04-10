import React from "react";
import { useApiContext } from "../hooks/useApiContext";

const ParentRepository = () => {
  const { apiCall } = useApiContext();

  const createParent = async (firstName, lastName, phone) => {
    const data = await apiCall("users/parent", "POST", {
      firstName,
      lastName,
      phone,
    });
    return data;
  };

  return { createParent };
};

export default ParentRepository;
