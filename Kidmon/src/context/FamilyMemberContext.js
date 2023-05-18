import { createContext, useState } from "react";
import { IMG_URL } from "../network/apiCall";
export const FamilyMemberContext = createContext();

export const FamilyMemberContextProvider = ({ children }) => {
  const [familyMember, setFamilyMember] = useState({});

  return (
    <FamilyMemberContext.Provider value={{ familyMember, setFamilyMember }}>
      {children}
    </FamilyMemberContext.Provider>
  );
};
