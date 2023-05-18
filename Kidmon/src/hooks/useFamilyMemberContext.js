import { FamilyMemberContext } from "../context/FamilyMemberContext";
import { useContext } from "react";

export const useFamilyMemberContext = () => {
  const context = useContext(FamilyMemberContext);
  if (!context) {
    throw Error(
      "useFamilyMemberContext must be used inside an useFamilyMemberContextProvider"
    );
  }
  return context;
};
