import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const DefualtButton = ({ text, style, tailWindStyle }) => {
  return (
    <TouchableOpacity
      className={`w-11/12 h-10 rounded-xl bg-[#5FD5E5] justify-center items-center ${tailWindStyle}`}
      style={{ ...style }}
    >
      <Text className="text-white text-lg font-normal">{text}</Text>
    </TouchableOpacity>
  );
};

export default DefualtButton;
