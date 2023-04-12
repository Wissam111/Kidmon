import { Text, View } from "react-native";


const Balance = ({ amount }) => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text>Balance</Text>
            <Text>{amount}P</Text>
        </View>
    );
}

export default Balance;