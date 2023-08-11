import { Text, View, TouchableOpacity } from "react-native";
import { primaryColor } from "../../../styles";
const Balance = ({ amount, showModal }) => {
  return (
    <TouchableOpacity
      className="w-4/5 h-16 rounded-lg shadow-md"
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: primaryColor,
      }}
      onPress={showModal}
    >
      <Text className="text-base color-[#333333b5]">Balance</Text>
      <Text className="text-2xl font-medium">{amount} P</Text>
    </TouchableOpacity>
  );
};

export default Balance;
