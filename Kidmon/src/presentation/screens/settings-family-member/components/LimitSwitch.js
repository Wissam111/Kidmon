import { View, Text, Switch, StyleSheet } from "react-native";
import { useState } from "react";
import { primaryColor } from "../../../styles";
import { Slider } from "@miblanchard/react-native-slider";

const LimitSwitch = () => {
  const minValue = 0;
  const maxValue = 100;
  const [value, setValue] = useState(0);

  const [switchValue, setSwitchValue] = useState(false);
  const toggleSwitch = (value) => {
    setSwitchValue(value);
  };
  return (
    <View className={`w-80  h-28`} style={{ backgroundColor: primaryColor }}>
      <View className="flex-row justify-between p-4">
        <Text className="text-lg font-medium">Daily</Text>
        <Switch onValueChange={toggleSwitch} value={switchValue} />
      </View>
      <View className="flex-row items-center justify-between pr-2 pl-2">
        <Text className="text-base font-medium color-[#0000005e]">{value}</Text>
        <Slider
          animateTransitions
          minimumTrackTintColor="#5FD5E5"
          width="80%"
          minimumValue={minValue}
          value={value}
          onValueChange={(value) => setValue(Math.round(value))}
          maximumValue={maxValue}
          thumbStyle={styles.thumb}
          trackStyle={styles.track}
        />
        {/* <Slider minimumValue={minValue} maximumValue={maxValue} /> */}
        <Text className="text-base font-medium color-[#0000005e]">
          {maxValue}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  thumb: {
    backgroundColor: "#5FD5E5",
    borderColor: "white",
    borderRadius: 10,
    borderWidth: 5,
    height: 20,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 2,
    width: 20,
  },
  track: {
    backgroundColor: "white",
    borderRadius: 4,
    height: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1,
  },
});
export default LimitSwitch;
