import { useEffect } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
const HomeParentViewModel = () => {
  const { authData } = useAuthContext();

  return {
    user: authData?.user,
  };
};

export default HomeParentViewModel;
