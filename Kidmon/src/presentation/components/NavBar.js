import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useState } from "react";
import {
  Feather,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const NavBar = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const handleChange = (route) => {
    navigation.navigate(route);
  };

  return (
    <View className="w-full items-center absolute bottom-5">
      <View
        style={styles.shadow}
        className="w-11/12 h-16  bg-white justify-between items-center p-4  flex-row rounded-lg"
      >
        <TouchableOpacity onPress={() => handleChange("HomeParent")}>
          <Feather
            name="home"
            size={26}
            color={route.name === "HomeParent" ? "#5FD5E5" : "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChange("Profile")}>
          <Feather
            name="user"
            size={27}
            color={route.name === "Profile" ? "#5FD5E5" : "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChange("FamilyMemberHome")}>
          <MaterialCommunityIcons
            name="view-dashboard-outline"
            size={27}
            color={route.name === "FamilyMemberHome" ? "#5FD5E5" : "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChange("FamilyMemberSettings")}>
          {/* <Image
            className="w-6 h-6 mr-1"
            source={require("../../../assets/imgs/settings.png")}
          /> */}
          <FontAwesome
            name="sliders"
            size={25}
            color={route.name === "FamilyMemberSettings" ? "#5FD5E5" : "black"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
});

export default NavBar;
