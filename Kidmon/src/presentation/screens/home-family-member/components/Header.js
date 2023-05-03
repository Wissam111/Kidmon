import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import React from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Spacer from "../../../components/Spacer";
import { useNavigation } from "@react-navigation/native";
const Header = () => {
  const navigation = useNavigation();
  return (
    <View>
      <SafeAreaView />
      {/* <TouchableOpacity className="p-2 pl-5 pt-2">
        <AntDesign name="arrowleft" size={30} />
      </TouchableOpacity> */}
      <View className="flex-row justify-between items-center p-5 pb-1 mt-5 ">
        <View className="flex-row items-center p-2">
          <Image
            className="w-24 h-24 rounded-full"
            source={require("../../../../../assets/imgs/kid.jpg")}
          />
          <Spacer space={5} />
          <View>
            <Text className="text-2xl font-medium">Feras</Text>
            <View className="flex-row items-end">
              <Text className="text-sm color-[#00000075]">At School</Text>
              <Spacer space={2} />
              <Image
                className="w-6 h-6"
                source={require("../../../../../assets/imgs/school.png")}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity
          className="w-12 h-12 items-center justify-center border-2 border-solid border-[#c2c2c299] rounded-full"
          onPress={() => navigation.navigate("FamilyMemberSettings")}
        >
          <Ionicons name="ios-settings-sharp" size={28} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
