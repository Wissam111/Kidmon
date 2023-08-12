import { Text, View } from "react-native";
import React from "react";
import Header from "./components/Header";
import Spacer from "../../components/Spacer";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../../components/NavBar";
import ActivityList from "../../components/ActivityList";
import { useFamilyMemberContext } from "../../../hooks/useFamilyMemberContext";
import ProfileViewModel from "./ProfileViewModel";

// const activities = [
//   {
//     id: 1,
//     type: "purchase",
//     user: "123",
//     items: [
//       { title: "DD", amout: 4 },
//       { title: "BB", amount: 1 },
//     ],
//   },
//   {
//     id: 2,
//     type: "purchase",
//     user: "123",
//     items: [
//       { title: "RD", amout: 1 },
//       { title: "VF", amount: 1 },
//     ],
//   },
//   { id: 3, type: "purchase", user: "123", items: [{ title: "DD", amout: 4 }] },
// ];
const Profile = () => {
  const { activities, familyMember } = ProfileViewModel();
  return (
    <View className="flex-1 relative">
      <Header name={familyMember?.firstName} balance={familyMember?.credits} />
      <Spacer space={10} />
      <ActivityList
        style={{ flex: 1 }}
        activities={activities}
        snap1={"60%"}
        snap2={"95%"}
        isParent={false}
      />
      <NavBar />
    </View>
  );
};

export default Profile;
