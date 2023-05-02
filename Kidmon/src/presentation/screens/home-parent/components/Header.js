import { Image, SafeAreaView, View, StyleSheet } from "react-native";
import { primaryColor } from "../../../styles";
import { Text } from "react-native";

const Header = () => {
  return (
    <View
      className="p-4  h-44 justify-between items-center flex-row relative"
      style={{ backgroundColor: primaryColor }}
    >
      <SafeAreaView className="justify-between items-center flex-row relative h-full w-full">
        <View className="m-4">
          <Text className="text-xl font-medium">Good Morning,</Text>
          <Text className="text-base  font-medium color-[#0000005c]">
            Tarik
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
