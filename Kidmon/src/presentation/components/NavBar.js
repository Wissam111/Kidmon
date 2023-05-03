import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Feather, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const NavBar = () => {
  const navigation = useNavigation();
  return (
    <View className="w-full items-center absolute bottom-0">
      <View className="w-full h-16  bg-gray-100 shadow-md justify-between items-center p-4  flex-row">
        <TouchableOpacity onPress={() => navigation.navigate("HomeParent")}>
          <Feather name="home" size={32} color="#2AB130" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Feather name="user" size={32} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("FamilyMemberSettings")}
        >
          <Image source={require("../../../assets/imgs/setting.png")} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NavBar;
