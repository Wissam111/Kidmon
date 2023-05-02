import { Text, View } from "react-native";
import React from "react";
import Header from "./components/Header";
import Spacer from "../../components/Spacer";
import { SafeAreaView } from "react-native-safe-area-context";

import ActivityList from "../../components/ActivityList";
const activities = [
  {
    id: 1,
    type: "purchase",
    user: "123",
    items: [
      { title: "DD", amout: 4 },
      { title: "BB", amount: 1 },
    ],
  },
  {
    id: 2,
    type: "purchase",
    user: "123",
    items: [
      { title: "RD", amout: 1 },
      { title: "VF", amount: 1 },
    ],
  },
  { id: 3, type: "purchase", user: "123", items: [{ title: "DD", amout: 4 }] },
];
const Profile = () => {
  return (
    <View className="flex-1">
      <Header />
      <Spacer space={10} />
      <ActivityList
        style={{ flex: 1 }}
        activities={activities}
        snap1={"60%"}
        snap2={"95%"}
      />
    </View>
  );
};

export default Profile;
