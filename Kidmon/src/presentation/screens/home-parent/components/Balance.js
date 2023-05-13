import { Text, View } from "react-native";
import { primaryColor } from "../../../styles";
const Balance = ({ amount }) => {
  return (
    <View
      className="w-4/5 h-16 rounded-lg shadow-md"
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: primaryColor,
      }}
    >
      <Text className="text-base color-[#333333b5]">Balance</Text>
      <Text className="text-2xl font-medium">{amount} P</Text>
    </View>
  );
};

export default Balance;
