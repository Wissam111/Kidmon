import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { BarChart } from "react-native-gifted-charts";
import { primaryColor } from "../../../styles";
import moment from "moment";
const Chart = ({ spendings }) => {
  const [chartData, setChartData] = useState([
    { value: 0, label: "Su" },
    { value: 0, label: "Mo", frontColor: "#5FD5E5" },
    { value: 0, label: "Tu", frontColor: "#5FD5E5" },
    { value: 0, label: "We" },
    { value: 0, label: "Th", frontColor: "#5FD5E5" },
    { value: 0, label: "Fr" },
    { value: 0, label: "Sa" },
  ]);

  const today = new Date().getDay();


  useEffect(() => {
    const updateChart = () => {
      const tempData = [...chartData];
      spendings.forEach((spending , i) => {
          const dateStr = `${spending.year}-${spending.month}-${spending.day}`
          const d = moment(dateStr,'yyyy-MM-DD')
          const index = d.weekday() % 7; // Adding 1 and taking modulo 7 to match the chartData index
          tempData[index].value = spending.totalSpendings;
      });
      setChartData(tempData);
    };
    updateChart();
  }, [spendings]);


  return (
    <View style={styles.style}>
      <View className="flex-row justify-between p-4">
        <View>
          <Text className="text-xl font-medium">Spending</Text>
          <Text className="text-sm color-[#00000075]">This Week</Text>
        </View>
        <View>
          <Text className="text-lg font-medium">
            {parseFloat(chartData[today].value.toFixed(2))} P
          </Text>
          <Text className="text-sm color-[#00000075]">Spent today</Text>
        </View>
      </View>
      <BarChart
        barWidth={17}
        noOfSections={3}
        barBorderRadius={8}
        frontColor="lightgray"
        data={chartData}
        yAxisThickness={0}
        xAxisThickness={0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  style: {
    width: "92%",
    height: 380,
    backgroundColor: "white",
    shadowColor: "#BFD1C6",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    padding: 10,
    shadowOpacity: 0.53,
    shadowRadius: 30,
    borderRadius: 6,
  },
});

export default Chart;
