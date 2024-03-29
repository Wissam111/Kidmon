import { View, FlatList, SafeAreaView, StyleSheet } from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import ActivityCard from "./ActivityCard";
import Spacer from "./Spacer";
import { Text } from "react-native";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

const ActivityList = ({ activities, style, snap1, snap2, isParent = true }) => {
  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => [snap1, snap2], []);

  const ActivityTitle = (item) => {
    const _type = item?.type.charAt(0).toUpperCase() + item?.type.slice(1);
    if (item?.type === "purchase") {
      return item?.user?.firstName + "-" + _type;
    }
    const name = isParent ? item?.to?.firstName : item?.from?.firstName;
    return name + "-" + _type;
  };

  const ActivityAmount = (item) => {
    if (item?.type === "purchase") {
      return "-" + parseFloat(item?.price?.toFixed(2));
    }
    const amount = parseFloat(item?.amount?.toFixed(2));
    return isParent ? "-" + amount : "+" + amount;
  };

  return (
    <BottomSheet
      style={styles.sheet}
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
    >
      <BottomSheetView style={{ ...style }}>
        <View className="flex-row justify-between items-center" style={{}}>
          <View>
            <Text className="text-lg font-medium">Activity</Text>
            <Text className="text-xs color-[#00000075]">
              {isParent ? "All family Members" : "Child activities"}
            </Text>
          </View>

          <Text>Today</Text>
        </View>
        <FlatList // change to
          data={activities}
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 8, paddingBottom: 100 }}
          ItemSeparatorComponent={<Spacer space={4} />}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ActivityCard
              text={ActivityTitle(item)}
              totalPrice={ActivityAmount(item)}
              datetime={item.createdAt}
            />
          )}
        />
      </BottomSheetView>
    </BottomSheet>
  );
};

export default ActivityList;

const styles = StyleSheet.create({
  sheet: {
    padding: 16,
    paddingTop: 26,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.32,
    // shadowRadius: 5.46,
    // elevation: 9,
  },
});
