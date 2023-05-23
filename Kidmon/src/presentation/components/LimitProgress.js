import { View, Text } from "react-native";
import Spacer from "./Spacer";
import { useState, useEffect } from "react";
const LimitProgress = ({ text, percentage, remainin }) => {
  const lowLimit = 30;
  const midLimit = 70;

  const getBackgroundColor = (percentage) => {
    if (percentage < lowLimit) {
      return "bg-green-500";
    } else if (percentage < midLimit) {
      return "bg-yellow-500";
    } else {
      return "bg-red-500";
    }
  };
  return (
    <View>
      <Text className="color-[#000000b5] text-base font-medium mb-2">
        {text}
      </Text>
      <View className="flex-row items-center">
        <View
          className="h-5 bg-white shadow-md rounded-2xl flex-grow"
          style={{ minWidth: "75%" }}
        >
          <View
            className={`${getBackgroundColor(percentage)} h-5 rounded-xl`}
            style={{ width: `${percentage}%` }}
          ></View>
        </View>
        <Spacer space={4} />
        <Text className="text-sm color-[#adadadde]">{remainin} remainin</Text>
      </View>
    </View>
  );
};

export default LimitProgress;
