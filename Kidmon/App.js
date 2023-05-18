import { TailwindProvider } from "tailwindcss-react-native";
import { LoadingContextProvider } from "./src/context/LoadingContext";

import { StatusBar } from "expo-status-bar";
import { I18nManager, View } from "react-native";
import Navigation from "./src/presentation/Navigation";

I18nManager.allowRTL(true);
I18nManager.forceRTL();

export default function App() {
  return (
    <TailwindProvider>
      <LoadingContextProvider>
        <View style={{ flex: 1, position: "relative" }}>
          <StatusBar barStyle="light-content" />
          <Navigation />
        </View>
      </LoadingContextProvider>
    </TailwindProvider>
  );
}
