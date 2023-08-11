import { createContext, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
export const ApiContext = createContext();
export const BASE_URL = "http://localhost:4000/api/v1/";
export const BASE_URL_1 = "http://localhost:4000/api/";

export const ApiContextProvider = ({ children }) => {
  const { authData } = useAuthContext();
  const navigate = useNavigate();
  const apiCall = async (
    url,
    method = "GET",
    body,
    contentType = "application/json"
  ) => {
    const customURL = BASE_URL + url;
    let bbody;

    if (body) {
      if (contentType === "multipart/form-data") {
        bbody = body;
      } else {
        bbody = JSON.stringify(body);
      }
    } else {
      bbody = null;
    }
    const result = await fetch(customURL, {
      headers: {
        "Content-Type": contentType,
        Authorization: `Bearer ${authData?.token}`,
      },
      method: method,
      body: bbody,
    });
    const json = await result.json();

    if (!result.ok) {
      if (result.status === 401) {
        navigate("entry");
        // throw "you_are_not_authorized";
      }
      throw {
        status: result.status,
        ...json,
      };
    }
    return json;
  };
  const axiosPost = async (url, body) => {
    const config = {
      headers: { Authorization: `Bearer ${authData?.token}` },
    };
    const customURL = BASE_URL + url;
    const data = await axios.post(customURL, body, config);
    return data;
  };

  return (
    <ApiContext.Provider value={{ apiCall, axiosPost }}>
      {children}
    </ApiContext.Provider>
  );
};
