import { Image, SafeAreaView, View, StyleSheet } from "react-native";
import { primaryColor } from "../../../styles";
import { Text } from "react-native";
import DefualtButton from "../../../components/DefualtButton";
const Header = () => {
  return (
    <View className="p-4 h-2/5" style={{ backgroundColor: primaryColor }}>
      <View className="justify-between items-center flex-row relative">
        <SafeAreaView className="justify-between items-center flex-row relative h-full w-full">
          <View className="m-4">
            <Text className="text-xl font-medium">Good Morning,</Text>
            <Text className="text-base font-medium color-[#0000005c]">
              Tarik
            </Text>
          </View>

          <View className="absolute right-4 top-20">
            <Image
              className="z-50"
              style={{}}
              source={require("../../../../../assets/imgs/sun.png")}
            />
          </View>
        </SafeAreaView>
      </View>

      <View
        className="items-center mt-5"
        style={{ borderWidth: 2, borderColor: "red" }}
      >
        <Text className="color-[#757575] font-medium text-base">
          Total balance
        </Text>
        <Text className="color-[#333333] text-3xl font-semibold ">
          12,698 P
        </Text>
        <DefualtButton text={"Buy"} tailWindStyle="mt-10" />
      </View>
    </View>
  );
};

export default Header;
