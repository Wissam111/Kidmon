import { View, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
const Header = ({ navigation }) => {
  return (
    <View className="w-full p-4">
      <TouchableOpacity className="items-start" onPress={navigation.goBack}>
        <AntDesign name="left" size={25} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
