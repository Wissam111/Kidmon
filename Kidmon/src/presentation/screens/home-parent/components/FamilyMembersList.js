import FamilyMemberCard from "../../../components/FamilyMemberCard";
import Spacer from "../../../components/Spacer";
import { View, ScrollView, Text } from "react-native";


const FamilyMembersList = ({ familyMembers }) => {
    return (
        <View>
            <Text style={{ paddingHorizontal: 12, paddingBottom: 12 }}>Family</Text>
            <ScrollView
                contentContainerStyle={{ padding: 8 }}
                style={{ flexGrow: 0 }}
                horizontal
                showsHorizontalScrollIndicator={false}>

                {
                    familyMembers.map(element => (
                        <View key={element.id} style={{ flexDirection: 'row' }}>
                            <FamilyMemberCard style={{ padding: 8 }} text={`${element.firstName} ${element.lastName}`} />
                            <Spacer space={4} />
                        </View>
                    ))
                }
            </ScrollView>
        </View>
    );
}

export default FamilyMembersList;