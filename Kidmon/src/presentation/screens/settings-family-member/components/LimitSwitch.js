import { View, Text, Switch, StyleSheet } from "react-native";
import { useState, memo, useEffect } from "react";
import { primaryColor } from "../../../styles";
import { Slider } from "@miblanchard/react-native-slider";

const LimitSwitch = ({
  text,
  minValue,
  maxValue,
  limit,
  handleLimitSwitchChange,
  handleSliderValueChange,
}) => {
  // const currentValue = limit?.value ? limit.value : 0;
  const [previewValue, setPreviewValue] = useState(0);
  const toggleSwitch = (isActive) => {
    handleLimitSwitchChange(text.toLowerCase(), isActive);
  };

  const handleSlider = (value) => {
    handleSliderValueChange(text.toLowerCase(), Math.round(value));
  };
  useEffect(() => {
    setPreviewValue(Math.round(limit?.value));
  }, [limit]);
  return (
    <View className={`w-full  h-28`} style={{ backgroundColor: primaryColor }}>
      <View className="flex-row justify-between p-4 z-50">
        <Text className="text-lg font-medium">{text}</Text>
        <Switch
          onValueChange={toggleSwitch}
          value={limit?.isActive}
          trackColor={{ false: "#767577", true: "#5FD5E5" }}
        />
      </View>
      <View className="flex-row items-center justify-between pr-2 pl-2">
        <Text className="text-base font-medium color-[#0000005e]">
          {previewValue}
        </Text>
        <Slider
          animateTransitions
          minimumTrackTintColor="#5FD5E5"
          width="76%"
          minimumValue={minValue}
          value={previewValue}
          onSlidingComplete={handleSlider}
          onValueChange={(val) => setPreviewValue(Math.round(val))}
          maximumValue={maxValue}
          thumbStyle={styles.thumb}
          trackStyle={styles.track}
        />
        <Text className="text-base font-medium color-[#0000005e]">
          {maxValue}
        </Text>
      </View>
      {!limit?.isActive && (
        <View className="w-full h-full bg-gray-700 absolute opacity-50 bottom-0"></View>
      )}
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
