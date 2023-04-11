import { Image, SafeAreaView, View } from 'react-native';
import { primaryColor } from '../../../styles';
import { Text } from 'react-native';


const Header = () => {
    return (
        <View style={{ backgroundColor: primaryColor, minHeight: '20%', padding: 12 }}>
            <SafeAreaView/>

            <View>
                <Text>Good Morning,</Text>
                <Text>Tarik</Text>
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'start' }}>
                <Image style={{}} source={require('../../../../../assets/imgs/sun.png')} />
            </View>
        </View>
    );
}

export default Header;
