import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeParent from "./screens/home-parent/HomeParent";
import Profile from "./screens/profile/Profile";
import Transfer from "./screens/transfer/Transfer";
import FamilyMemberHome from "./screens/home-family-member/FamilyMemberHome";
import FamilyMemberSettings from "./screens/settings-family-member/FamilyMemberSettings";
const HomeParentStack = createNativeStackNavigator();

const HomeParentNavigation = () => {
  return (
    <HomeParentStack.Navigator screenOptions={{ headerShown: false }}>
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
      <HomeParentStack.Screen name="Profile" component={Profile} />
    </HomeParentStack.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      {/* <Profile /> */}
      <HomeParentNavigation />
      {/* <FamilyMemberHome /> */}
    </NavigationContainer>
  );
};

export default Navigation;
