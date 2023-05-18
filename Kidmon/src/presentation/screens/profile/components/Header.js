import { Image, SafeAreaView, View, StyleSheet } from "react-native";
import { primaryColor } from "../../../styles";
import { Text } from "react-native";
import DefaultButton from "../../../components/DefaultButton";
const Header = ({ name, balance }) => {
  return (
    <View className="p-4 h-2/5" style={{ backgroundColor: primaryColor }}>
      <View className="justify-between items-center flex-row relative">
        <SafeAreaView className="justify-between items-center flex-row relative h-full w-full">
          <View className="m-4">
            <Text className="text-xl font-medium">Good Morning,</Text>
            <Text className="text-base font-medium color-[#0000005c]">
              {name}
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

      <View className="items-center mt-5">
        <Text className="color-[#757575] font-medium text-base">
          Total balance
        </Text>
        <Text className="color-[#333333] text-3xl font-semibold ">
          {parseFloat(balance.toFixed(2))} P
        </Text>
        <DefaultButton text={"Charge"} tailWindStyle="mt-10 w-11/12 h-12" />
      </View>
    </View>
  );
};

export default Header;
