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
import { IMG_URL } from "../../../../network/apiCall";

const Header = ({ name, status, image }) => {
  const navigation = useNavigation();

  const handlePressSettings = () => {
    navigation.navigate("ChildProfileForm", { isEditMode: true });
  };

  return (
    <View>
      <SafeAreaView />
      <View className="flex-row justify-between items-center p-5 pb-1 mt-5 ">
        <View className="flex-row items-center p-2">
          <Image
            className="w-24 h-24 rounded-full"
            source={
              image
                ? { uri: IMG_URL + `${image}` }
                : require("../../../../../assets/imgs/user2.png")
            }
          />
          <Spacer space={5} />
          <View>
            <Text className="text-2xl font-medium">{name}</Text>
            <View className="flex-row items-end">
              <Text className="text-sm color-[#00000075]">{status}</Text>
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
          onPress={handlePressSettings}
        >
          <Ionicons name="ios-settings-sharp" size={28} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
