import { View, FlatList } from "react-native";
import ActivityCard from "../../../components/ActivityCard";
import Spacer from "../../../components/Spacer";
import { Text } from "react-native";

const ActivityList = ({ activities, style }) => {
  return (
    <View style={{ ...style }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 12,
          paddingBottom: 12,
        }}
      >
        <View>
          <Text>Activity</Text>
          <Text>All family Members</Text>
        </View>

        <Text>Today</Text>
      </View>

      <FlatList
        data={activities}
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 8 }}
        ItemSeparatorComponent={<Spacer space={4} />}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ActivityCard type={item.type} />}
      />
    </View>
  );
};

export default ActivityList;
