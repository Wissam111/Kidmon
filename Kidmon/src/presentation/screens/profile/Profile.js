import { Text, View } from "react-native";
import React from "react";
import Header from "./components/Header";
import Spacer from "../../components/Spacer";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  return (
    <View className="flex-1">
      <Header />
    </View>
  );
};

export default Profile;
