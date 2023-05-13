import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
const EntryButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      className="w-14 h-14 bg-[#5FD5E5] rounded-full items-center justify-center absolute"
      style={{ bottom: -25 }}
      onPress={onPress}
    >
      <Ionicons name="arrow-forward-outline" color="white" size={35} />
    </TouchableOpacity>
  );
};

export default EntryButton;
