import Spacer from "../../components/Spacer";
import FamilyMembersList from "./components/FamilyMembersList";
import ActivityList from "../../components/ActivityList";
import Balance from "./components/Balance";
import Header from "./components/Header";
import HomeParentViewModel from "./HomeParentViewModel";
import { View } from "react-native";
import { white } from "../../styles";
import { useEffect } from "react";
import ChargeBalanceModal from "../../components/ChargeBalanceModal";
const HomeParent = ({ navigation }) => {
  const {
    user,
    activities,
    activeModal,
    setActiveModal,
    chargeBalance,
    handleLogout,
  } = HomeParentViewModel({ navigation });

  return (
    <View style={{ flex: 1, backgroundColor: white }}>
      <Header firstName={user?.firstName} handleLogout={handleLogout} />

      <Spacer space={20} />
      <View className="w-full items-center">
        <Balance
          amount={user?.credits}
          showModal={() => setActiveModal(true)}
        />
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
      <ChargeBalanceModal
        visible={activeModal}
        chargeBalance={chargeBalance}
        setShowDialog={setActiveModal}
      />
    </View>
  );
};

export default HomeParent;
