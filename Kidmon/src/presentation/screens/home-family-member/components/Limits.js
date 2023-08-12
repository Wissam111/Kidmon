import { View, Text, StyleSheet } from "react-native";
import React from "react";
import LimitProgress from "../../../components/LimitProgress";
import Spacer from "../../../components/Spacer";
const Limits = ({ spendingsLimits }) => {
  return (
    <View style={styles.style}>
      <Text className="text-xl font-medium">Limits</Text>
      <Spacer space={10} />
      <LimitProgress
        text={"Daily"}
        percentage={spendingsLimits?.daily?.percentage}
        remainin={spendingsLimits?.daily?.remainin}
        current={spendingsLimits?.daily?.current}
      />
      <Spacer space={10} />
      <LimitProgress
        text={"Weakly"}
        percentage={spendingsLimits?.weekly?.percentage}
        remainin={spendingsLimits?.weekly?.remainin}
        current={spendingsLimits?.weekly?.current}
      />
      <Spacer space={10} />
      <LimitProgress
        text={"Monthly"}
        percentage={spendingsLimits?.monthly?.percentage}
        remainin={spendingsLimits?.monthly?.remainin}
        current={spendingsLimits?.monthly?.current}
      />
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
