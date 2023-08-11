import { Image, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import Spacer from "./Spacer";
import { white } from "../styles";

const ActivityCard = ({ image, text, datetime, onPress, totalPrice }) => {
  return (
    <View
      style={{
        ...styles,
      }}
    >
      <Image
        className="w-8 h-8"
        source={require("../../../assets/imgs/school.png")}
      />

      <Spacer space={8} />
      <View style={{ flexGrow: 1 }}>
        <Text className="font-medium">
          {text?.charAt(0).toUpperCase() + text?.slice(1)}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="time-outline" size={14} color={"#00000075"} />
          <Spacer space={1} />
          <Text className="color-[#00000075] text-xs">
            {moment(datetime).format("HH:mm")}
          </Text>
        </View>
      </View>
      <Text className="font-medium pr-2">
        - {parseFloat(totalPrice?.toFixed(2))} P
      </Text>
    </View>
  );
};

export default ActivityCard;

const styles = StyleSheet.create({
  padding: 12,
  borderRadius: 23,
  height: 65,
  backgroundColor: white,
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  shadowColor: "black",
  shadowRadius: 4,
  shadowOpacity: 0.1,
  shadowOffset: { width: 1, height: 1 },
});
