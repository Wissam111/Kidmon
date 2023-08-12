import { View, Text } from "react-native";
import Spacer from "./Spacer";
import { useState, useEffect, useMemo } from "react";
import { Badge } from "@react-native-material/core";
const LimitProgress = ({ text, percentage, remainin, current }) => {
  const lowLimit = 30;
  const midLimit = 70;

  const getBackgroundColor = (percentage) => {
    if (!remainin) return "bg-gray-300";

    if (percentage < lowLimit) {
      return "bg-green-500";
    } else if (percentage < midLimit) {
      return "bg-yellow-500";
    } else {
      return "bg-red-500";
    }
  };

  const Current = useMemo(() => {
    return Math.floor(current?.toFixed(2));
  }, [current]);

  return (
    <View>
      <Text className="color-[#000000b5] text-base font-medium mb-4">
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
          >
            <Badge
              tintColor="white"
              style={{
                position: "absolute",
                top: -20,
                right: -36,
                minWidth: 40,
                fontSize: 5,
                color: "white",
              }}
              label={Current}
            />
          </View>
        </View>
        <Spacer space={4} />
        <Text className="text-sm color-[#adadadde]">
          {remainin ? remainin + " remainin" : "unlimited"}
        </Text>
      </View>
    </View>
  );
};

export default LimitProgress;
