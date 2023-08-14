import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeParent from "./screens/home-parent/HomeParent";
import Profile from "./screens/profile/Profile";
import Transfer from "./screens/transfer/Transfer";
import FamilyMemberHome from "./screens/home-family-member/FamilyMemberHome";
import FamilyMemberSettings from "./screens/settings-family-member/FamilyMemberSettings";
import Entry from "./screens/entry/Entry";
import ChildProfileForm from "./screens/edit-profile/ChildProfileForm";
import Loading from "./components/Loading";
import SplashScreen from "./components/Splash";
import { useLoadingContext } from "../hooks/useLoadingContext";
const Stack = createNativeStackNavigator();
const ChildTabs = createNativeStackNavigator();

const ChildTab = () => {
  return (
    <ChildTabs.Navigator
      initialRouteName={"FamilyMemberHome"}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <ChildTabs.Screen name="Transfer" component={Transfer} />
      <ChildTabs.Screen name="FamilyMemberHome" component={FamilyMemberHome} />
      <ChildTabs.Screen
        name="FamilyMemberSettings"
        component={FamilyMemberSettings}
      />
      <ChildTabs.Screen name="Profile" component={Profile} />
    </ChildTabs.Navigator>
  );
};

const AppNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={"Splash"}
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen
        name={"Splash"}
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Entry" component={Entry} />
      <Stack.Screen name="HomeParent" component={HomeParent} />
      <ChildTabs.Screen name="ChildProfileForm" component={ChildProfileForm} />
      <Stack.Screen
        name={"ChildTabs"}
        component={ChildTab}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  const { loading } = useLoadingContext();

  return (
    <NavigationContainer>
      {loading && <Loading />}
      <AppNavigation />
    </NavigationContainer>
  );
};

export default Navigation;
