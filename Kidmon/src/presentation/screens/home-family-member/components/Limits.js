import { View, Text, StyleSheet } from "react-native";
import React from "react";
import LimitProgress from "../../../components/LimitProgress";
import Spacer from "../../../components/Spacer";
const Limits = () => {
  return (
    <View style={styles.style}>
      <Text className="text-xl font-medium">Limits</Text>
      <Spacer space={10} />
      <LimitProgress text={"Daily"} percentage={20} />
      <Spacer space={10} />
      <LimitProgress text={"Weakly"} percentage={40} />
      <Spacer space={10} />
      <LimitProgress text={"Monthly"} percentage={92} />
    </View>
  );
};
const styles = StyleSheet.create({
  style: {
    width: "92%",
    height: 350,
    backgroundColor: "white",
    shadowColor: "#BFD1C6",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.53,
    shadowRadius: 30,
    borderRadius: 6,
    padding: 25,
  },
});

export default Limits;
