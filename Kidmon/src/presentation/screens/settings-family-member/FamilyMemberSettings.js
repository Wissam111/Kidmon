import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import NavBar from "../../components/NavBar";
import SpendingLimits from "./components/SpendingLimits";
import Allergens from "./components/Allergens";
import Spacer from "../../components/Spacer";
import DefaultButton from "../../components/DefaultButton";
import FamilyMemberSettingsViewModel from "./FamilyMemberSettingsViewModel";

const FamilyMemberSettings = () => {
  const {
    familyMember,
    childAllergies,
    handleAllergies,
    childLimits,
    updateUser,
    handleLimitSwitchChange,
    handleSliderValueChange,
  } = FamilyMemberSettingsViewModel();

  return (
    <View className="flex-1">
      <ScrollView
        style={{ height: "100%" }}
        contentContainerStyle={{ alignItems: "center", paddingBottom: 280 }}
      >
        <SafeAreaView />
        <Text className="text-2xl font-medium p-4 mb-5">
          {familyMember?.firstName} Settings
        </Text>
        <SpendingLimits
          limits={childLimits}
          handleLimitSwitchChange={handleLimitSwitchChange}
          handleSliderValueChange={handleSliderValueChange}
        />
        <Spacer space={10} />
        <Allergens
          childAllergies={childAllergies}
          handleAllergies={handleAllergies}
        />
        <Spacer space={20} />
        <DefaultButton
          style={{ width: 200, height: 50 }}
          text={"Save Changes"}
          onPress={updateUser}
        />
      </ScrollView>
      <NavBar />
    </View>
  );
};

export default FamilyMemberSettings;
