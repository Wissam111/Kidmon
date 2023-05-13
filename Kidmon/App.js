import { TailwindProvider } from "tailwindcss-react-native";

import { StatusBar } from "expo-status-bar";
import { I18nManager, View } from "react-native";
import Navigation from "./src/presentation/Navigation";

I18nManager.allowRTL(true);
I18nManager.forceRTL();

export default function App() {
  return (
    <TailwindProvider>
      <View style={{ flex: 1, position: "relative" }}>
        <StatusBar barStyle="light-content" />
        <Navigation />
      </View>
    </TailwindProvider>
  );
}
