import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IMG_URL } from "../../network/apiCall";

const FamilyMemberCard = ({ image, text, style, onPress }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        ...styles,
        ...style,
      }}
      onPress={onPress}
    >
      <Image
        className="w-16 h-16 rounded-full"
        style={{}}
        source={
          image
            ? { uri: IMG_URL + `${image}` }
            : require("../../../assets/imgs/user2.png")
        }
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
