import FamilyMemberCard from "../../../components/FamilyMemberCard";
import Spacer from "../../../components/Spacer";
import { View, ScrollView, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
const FamilyMembersList = ({ familyMembers }) => {
  const navigation = useNavigation();
  return (
    <View>
      <Text
        style={{
          paddingHorizontal: 12,
          paddingBottom: 12,
          fontSize: 20,
          fontWeight: 500,
        }}
      >
        Family
      </Text>
      <ScrollView
        contentContainerStyle={{ padding: 8 }}
        style={{ flexGrow: 0 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {familyMembers.map((user) => (
          <View key={user.id} style={{ flexDirection: "row" }}>
            <FamilyMemberCard
              style={{ padding: 8 }}
              text={`${user.firstName} ${user.lastName}`}
              image={user.image}
              onPress={() => navigation.navigate("FamilyMemberHome", { user })}
            />
            <Spacer space={8} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default FamilyMembersList;
