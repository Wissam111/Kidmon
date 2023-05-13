import {
  Image,
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { primaryColor } from "../../../styles";
import { Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { useNavigation } from "@react-navigation/native";
const Header = ({ firstName }) => {
  const { dispatch } = useAuthContext();
  const navigation = useNavigation();
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigation.navigate("Entry");
  };
  return (
    <View
      className="p-4  h-44 justify-between items-center flex-row relative"
      style={{ backgroundColor: primaryColor }}
    >
      <SafeAreaView className="justify-between items-center flex-row relative h-full w-full">
        <TouchableOpacity
          className="absolute top-10 right-0"
          onPress={() => handleLogout()}
        >
          <MaterialIcons name="logout" size={30} />
        </TouchableOpacity>
        <View className="m-4 mt-12">
          <Text className="text-xl font-medium">Good Morning,</Text>
          <Text className="text-base  font-medium color-[#0000005c]">
            {firstName.charAt(0).toUpperCase() + firstName.slice(1)}
          </Text>
        </View>

        <View className="absolute right-0 top-20">
          <Image
            className="z-50"
            style={{}}
            source={require("../../../../../assets/imgs/sun.png")}
          />
          <View style={styles.triangleStyle} />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  triangleStyle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightWidth: 90,
    borderTopWidth: 90,
    borderRightColor: "transparent",
    borderTopColor: "white",
    transform: [{ rotate: "45deg" }],
    marginLeft: 10,
  },
});

export default Header;
