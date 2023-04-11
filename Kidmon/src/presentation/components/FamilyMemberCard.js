import { Image, StyleSheet, Text, View } from "react-native";


const FamilyMemberCard = ({ image, text, style }) => {
    return (
        <View style={{
            ...styles,
            ...style
        }}>
            <Image style={{}} source={require('../../../assets/imgs/sun.png')} />
            <Text>{text}</Text>
        </View>
    );
}

export default FamilyMemberCard;

const styles = StyleSheet.create({
    justifyContent: 'center', alignItems: 'center', elevation: 8,
    borderRadius: 12,
    shadowColor: 'black',
    shadowRadius: 6,
    shadowOpacity: .1,
    shadowOffset: { width: 0, height: 0 },
    backgroundColor: 'white',
    minWidth: 180,
    minHeight: 120,
})