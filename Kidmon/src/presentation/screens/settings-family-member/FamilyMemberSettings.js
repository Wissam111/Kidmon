import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import NavBar from "../../components/NavBar";
import SpendingLimits from "./components/SpendingLimits";
const FamilyMemberSettings = () => {
  return (
    <View className="flex-1 items-center">
      <SafeAreaView />
      <Text className="text-2xl font-medium p-4 mb-5">Feras Settings</Text>
      <SpendingLimits />

      <NavBar />
    </View>
  );
};

export default FamilyMemberSettings;
