import { TailwindProvider } from "tailwindcss-react-native";
import { LoadingContextProvider } from "./src/context/LoadingContext";

import { StatusBar } from "expo-status-bar";
import { I18nManager, View } from "react-native";
import Navigation from "./src/presentation/Navigation";
import { ToastProvider } from "react-native-toast-notifications";
import { AuthContextProvider } from "./src/context/AuthContext";
import { FamilyMemberContextProvider } from "./src/context/FamilyMemberContext";
import { AlertsContextProvider } from "./src/context/AlertsContext";

export default function App() {
  return (
    <TailwindProvider>
      <ToastProvider offsetTop={30}>
        <LoadingContextProvider>
          <AlertsContextProvider>
            <AuthContextProvider>
              <FamilyMemberContextProvider>
                <View style={{ flex: 1, position: "relative" }}>
                  <StatusBar barStyle="light-content" />
                  <Navigation />
                </View>
              </FamilyMemberContextProvider>
            </AuthContextProvider>
          </AlertsContextProvider>
        </LoadingContextProvider>
      </ToastProvider>
    </TailwindProvider>
  );
}
