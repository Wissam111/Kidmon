import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
const FamilyMemberCard = ({ image, text, style }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        ...styles,
        ...style,
      }}
      onPress={() => navigation.navigate("FamilyMemberHome")}
    >
      <Image
        className="w-16 h-16 rounded-full"
        style={{}}
        source={require("../../../assets/imgs/kid.jpg")}
      />
      <Text className="text-base color-[#000000b5] font-medium mt-2">
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default FamilyMemberCard;

const styles = StyleSheet.create({
  justifyContent: "center",
  alignItems: "center",
  elevation: 8,
  borderRadius: 12,
  shadowColor: "black",
  shadowRadius: 6,
  shadowOpacity: 0.1,
  shadowOffset: { width: 0, height: 0 },
  backgroundColor: "white",
  minWidth: 145,
  minHeight: 140,
});
