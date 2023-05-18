import Spacer from "../../components/Spacer";
import FamilyMembersList from "./components/FamilyMembersList";
import ActivityList from "../../components/ActivityList";
import Balance from "./components/Balance";
import Header from "./components/Header";
import HomeParentViewModel from "./HomeParentViewModel";
import { View } from "react-native";
import { white } from "../../styles";
import { cos } from "react-native-reanimated";

const familyMembers = [
  { id: 1, firstName: "John", lastName: "Gb" },
  { id: 2, firstName: "Tarik", lastName: "Husin" },
  { id: 3, firstName: "Wissam", lastName: "Kabaha" },
];

const activities = [
  {
    id: 1,
    type: "purchase",
    user: "123",
    items: [
      { title: "DD", amout: 4 },
      { title: "BB", amount: 1 },
    ],
    price: 20,
  },
  {
    id: 2,
    type: "purchase",
    user: "123",
    items: [
      { title: "RD", amout: 1 },
      { title: "VF", amount: 1 },
    ],
    price: 20,
  },
  {
    id: 3,
    type: "purchase",
    user: "123",
    items: [{ title: "DD", amout: 4 }],
    price: 20,
  },
];

const HomeParent = () => {
  const { user } = HomeParentViewModel();
  return (
    <View style={{ flex: 1, backgroundColor: white }}>
      <Header firstName={user?.firstName} />

      <Spacer space={20} />
      <View className="w-full items-center">
        <Balance amount={user?.credits} />
      </View>

      <Spacer space={13} />
      <FamilyMembersList familyMembers={user?.familyMembers} />
      <Spacer space={20} />
      <ActivityList
        style={{ flex: 1 }}
        activities={activities}
        snap1={"37%"}
        snap2={"95%"}
      />
    </View>
  );
};

export default HomeParent;
