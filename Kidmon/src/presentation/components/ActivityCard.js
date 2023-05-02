import { Image, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import Spacer from "./Spacer";
import { white } from "../styles";

const ActivityCard = ({ type, image, text, datetime, onPress }) => {
  return (
    <View
      style={{
        ...styles,
      }}
    >
      <Image source={require("../../../assets/imgs/sun.png")} />

      <Spacer space={8} />

      <View style={{ flexGrow: 1 }}>
        <Text>{text}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="time-outline" size={18} />
          <Spacer space={4} />
          <Text>{moment(datetime).format("HH:mm")}</Text>
        </View>
      </View>
    </View>
  );
};

export default ActivityCard;

const styles = StyleSheet.create({
  padding: 12,
  borderRadius: 100,
  backgroundColor: white,
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  shadowColor: "black",
  shadowRadius: 4,
  shadowOpacity: 0.1,
  shadowOffset: { width: 1, height: 1 },
});
