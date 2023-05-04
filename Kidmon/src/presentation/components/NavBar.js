import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
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
          onPress={() => navigation.navigate("FamilyMemberHome")}
        >
          <MaterialCommunityIcons name="view-dashboard-outline" size={32} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("FamilyMemberSettings")}
        >
          <Image
            className="w-7 h-7 mr-1"
            source={require("../../../assets/imgs/settings.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NavBar;
