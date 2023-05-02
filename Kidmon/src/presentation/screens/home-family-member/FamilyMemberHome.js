import { View, Text, ScrollView } from "react-native";
import React from "react";
import Header from "./components/Header";
import Spacer from "../../components/Spacer";
import Chart from "./components/Chart";
import Limits from "./components/Limits";
import NavBar from "../../components/NavBar";
const FamilyMemberHome = () => {
  return (
    <View className="flex-1 relative">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <Header />
        <Spacer space={5} />
        <View className="items-center w-full">
          <Chart />
        </View>
        <Spacer space={10} />
        <View className="items-center w-full">
          <Limits />
        </View>
      </ScrollView>
      <NavBar />
    </View>
  );
};

export default FamilyMemberHome;
