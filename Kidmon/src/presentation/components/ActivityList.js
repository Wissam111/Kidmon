import { View, FlatList, SafeAreaView } from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import ActivityCard from "./ActivityCard";
import Spacer from "./Spacer";
import { Text } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
const ActivityList = ({ activities, style, snap1, snap2 }) => {
  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => [snap1, snap2], []);
  return (
    <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints}>
      <View style={{ ...style }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 12,
            paddingBottom: 12,
            alignItems: "center",
          }}
        >
          <View>
            <Text className="text-lg font-medium">Activity</Text>
            <Text className="text-xs color-[#00000075]">
              All family Members
            </Text>
          </View>

          <Text>Today</Text>
        </View>

        <FlatList
          data={activities}
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 8 }}
          ItemSeparatorComponent={<Spacer space={4} />}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ActivityCard type={item.type} text={"Enter-In"} />
          )}
        />
      </View>
    </BottomSheet>
  );
};

export default ActivityList;
