import { View, Text, Switch, Image } from "react-native";
import { useState } from "react";
import Spacer from "../../../components/Spacer";
import LimitSwitch from "./LimitSwitch";
const SpendingLimits = () => {
  const [switchValue, setSwitchValue] = useState(true);

  const toggleSwitch = (value) => {
    setSwitchValue(value);
  };
  return (
    <View
      className="bg-white shadow-md rounded-md flex-grow-0  relative"
      style={{ width: "94%", height: "50%" }}
    >
      <View className="flex-row justify-between p-6 z-50">
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
        <Switch
          onValueChange={toggleSwitch}
          value={switchValue}
          trackColor={{ false: "#767577", true: "#5FD5E5" }}
        />
      </View>
      <View className="items-center">
        <LimitSwitch text="Daily" />
        <Spacer space={6} />
        <LimitSwitch text="Weakly" />
        <Spacer space={6} />
        <LimitSwitch text="Monthly" />
      </View>
      {!switchValue && (
        <View className="w-full h-full bg-gray-700 absolute opacity-70 bottom-0 rounded-md"></View>
      )}
    </View>
  );
};

export default SpendingLimits;
