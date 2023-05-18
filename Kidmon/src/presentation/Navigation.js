import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContextProvider } from "../context/AuthContext";
import { FamilyMemberContextProvider } from "../context/FamilyMemberContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeParent from "./screens/home-parent/HomeParent";
import Profile from "./screens/profile/Profile";
import Transfer from "./screens/transfer/Transfer";
import FamilyMemberHome from "./screens/home-family-member/FamilyMemberHome";
import FamilyMemberSettings from "./screens/settings-family-member/FamilyMemberSettings";
import Entry from "./screens/entry/Entry";
import EditProfile from "./screens/edit-profile/EditProfile";

import Loading from "./components/Loading";
import { useLoadingContext } from "../hooks/useLoadingContext";

const HomeParentStack = createNativeStackNavigator();
const HomeParentNavigation = () => {
  return (
    <HomeParentStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeParentStack.Screen name="Entry" component={Entry} />
      <HomeParentStack.Screen name="HomeParent" component={HomeParent} />
      <HomeParentStack.Screen name="Transfer" component={Transfer} />
      <HomeParentStack.Screen
        name="FamilyMemberHome"
        component={FamilyMemberHome}
      />
      <HomeParentStack.Screen
        name="FamilyMemberSettings"
        component={FamilyMemberSettings}
      />
      <HomeParentStack.Screen name="Edit" component={EditProfile} />
      <HomeParentStack.Screen name="Profile" component={Profile} />
    </HomeParentStack.Navigator>
  );
};

const Navigation = () => {
  const { loading } = useLoadingContext();
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <FamilyMemberContextProvider>
          {loading && <Loading />}
          <HomeParentNavigation />
        </FamilyMemberContextProvider>
      </AuthContextProvider>
    </NavigationContainer>
  );
};

export default Navigation;
