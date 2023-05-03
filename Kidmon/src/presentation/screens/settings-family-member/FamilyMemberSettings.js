import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import NavBar from "../../components/NavBar";
import SpendingLimits from "./components/SpendingLimits";
import Allergens from "./components/Allergens";
import Spacer from "../../components/Spacer";
const FamilyMemberSettings = () => {
  return (
    <View className="flex-1">
      <ScrollView
        style={{ height: "100%" }}
        contentContainerStyle={{ alignItems: "center", paddingBottom: 150 }}
      >
        <SafeAreaView />
        <Text className="text-2xl font-medium p-4 mb-5">Feras Settings</Text>
        <SpendingLimits />
        <Spacer space={10} />
        <Allergens />
      </ScrollView>
      <NavBar />
    </View>
  );
};

export default FamilyMemberSettings;
