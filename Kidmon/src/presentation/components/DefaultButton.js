import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const DefaultButton = ({ text, style, tailWindStyle, onPress }) => {
  return (
    <TouchableOpacity
      className={`rounded-xl bg-[#5FD5E5] justify-center items-center ${tailWindStyle}`}
      style={{ ...style }}
      onPress={onPress}
    >
      <Text className="text-white text-lg font-normal">{text}</Text>
    </TouchableOpacity>
  );
};

export default DefaultButton;
