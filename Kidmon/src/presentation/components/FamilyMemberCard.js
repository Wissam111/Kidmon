import { Image, StyleSheet, Text, View } from "react-native";

const FamilyMemberCard = ({ image, text, style }) => {
  return (
    <View
      style={{
        ...styles,
        ...style,
      }}
    >
      <Image
        className="w-16 h-16 rounded-full"
        style={{}}
        source={require("../../../assets/imgs/kid.jpg")}
      />
      <Text className="text-base color-[#000000b5] font-medium mt-2">
        {text}
      </Text>
    </View>
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
