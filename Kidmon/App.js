import { StatusBar } from 'expo-status-bar';
import { I18nManager, StyleSheet, Text, View } from 'react-native';

I18nManager.allowRTL(true)
I18nManager.forceRTL()


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
