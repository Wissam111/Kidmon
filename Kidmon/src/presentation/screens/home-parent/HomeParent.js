import Spacer from "../../components/Spacer";
import FamilyMembersList from "./components/FamilyMembersList";
import ActivityList from "./components/ActivityList";
import Balance from "./components/Balance";
import Header from "./components/Header";
import { View } from "react-native";
import { white } from "../../styles";

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

const HomeParent = () => {
  return (
    <View style={{ flex: 1, backgroundColor: white }}>
      <Header />

      <Spacer space={20} />
      <Balance amount={1200} />

      <Spacer space={20} />
      <FamilyMembersList familyMembers={familyMembers} />

      <Spacer space={20} />
      <ActivityList style={{ flex: 1 }} activities={activities} />
    </View>
  );
};

export default HomeParent;
