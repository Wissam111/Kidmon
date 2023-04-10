import { createContext, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
export const ApiContext = createContext();
export const BASE_URL = "http://localhost:4000/api/v1/";
export const BASE_URL_1 = "http://localhost:4000/api/";
export const ApiContextProvider = ({ children }) => {
  const { authData } = useAuthContext();
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
        console.log("form");
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
        throw "you_are_not_authorized";
      }
      throw {
        status: result.status,
        ...json,
      };
    }
    return json;
  };

  return (
    <ApiContext.Provider value={{ apiCall }}>{children}</ApiContext.Provider>
  );
};
