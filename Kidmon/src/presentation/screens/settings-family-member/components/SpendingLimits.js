import { View, Text, Switch, Image } from "react-native";
import { useState } from "react";
import Spacer from "../../../components/Spacer";
import LimitSwitch from "./LimitSwitch";
const SpendingLimits = () => {
  const [switchValue, setSwitchValue] = useState(false);

  const toggleSwitch = (value) => {
    setSwitchValue(value);
  };
  return (
    <View
      className="bg-white shadow-md rounded-md"
      style={{ width: "94%", height: "58%" }}
    >
      <View className="flex-row justify-between  p-6">
        <View className="flex-row items-center">
          <Image
            className="w-7 h-7"
            source={require("../../../../../assets/imgs/meters.png")}
          />
          <Spacer space={4} />
          <Text className="text-lg font-medium color-[#000000bf]">
            Spending Limits
          </Text>
        </View>
        <Switch onValueChange={toggleSwitch} value={switchValue} />
      </View>
      <View className="items-center">
        <LimitSwitch />
        <Spacer space={6} />
        <LimitSwitch />
        <Spacer space={6} />
        <LimitSwitch />
      </View>
    </View>
  );
};

export default SpendingLimits;
