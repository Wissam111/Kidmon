import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { BarChart } from "react-native-gifted-charts";
import { primaryColor } from "../../../styles";
const Chart = () => {
  const barData = [
    { value: 10, label: "Su" },
    { value: 40, label: "Mo", frontColor: "#5FD5E5" },
    { value: 12, label: "Tu", frontColor: "#5FD5E5" },
    { value: 15, label: "We" },
    { value: 40, label: "Th", frontColor: "#5FD5E5" },
    { value: 20, label: "Fr" },
    { value: 5, label: "Sa" },
  ];
  return (
    <View style={styles.style}>
      <View className="flex-row justify-between p-4">
        <View>
          <Text className="text-xl font-medium">Spending</Text>
          <Text className="text-sm color-[#00000075]">This Week</Text>
        </View>
        <View>
          <Text className="text-lg font-medium">13.34 P</Text>
          <Text className="text-sm color-[#00000075]">Spent today</Text>
        </View>
      </View>
      <BarChart
        barWidth={17}
        noOfSections={3}
        barBorderRadius={8}
        frontColor="lightgray"
        data={barData}
        yAxisThickness={0}
        xAxisThickness={0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  style: {
    width: "92%",
    height: 400,
    backgroundColor: "white",
    shadowColor: "#BFD1C6",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.53,
    shadowRadius: 30,
    borderRadius: 6,
  },
});

export default Chart;
