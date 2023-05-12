import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Spacer from "../../../components/Spacer";
import EntryButton from "./EntryButton";
import OTPInputView from "@twotalltotems/react-native-otp-input";
const Confirm = ({ handleVerfication }) => {
  const [OTP, setOTP] = useState("");

  return (
    <View
      style={{ width: "91%" }}
      className="absolute h-80 bg-white z-50 top-60 rounded-xl p-6 items-center shadow-md"
    >
      <Text className="text-3xl font-semibold mt-3">Confirm OTP</Text>
      <Spacer space={10} />
      <Text className="text-sm color-[#00000061] bg-yellow  pl-2">
        Enter the OTP sent to{" "}
        <Text className="color-black font-medium">0547973441</Text>
      </Text>
      <Spacer space={10} />
      <OTPInputView
        style={{ width: "100%", height: 90 }}
        pinCount={4}
        // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
        onCodeChanged={(code) => {
          setOTP(code);
        }}
        autoFocusOnLoad
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={(code) => {
          console.log(`Code is ${code}, you are good to go!`);
        }}
      />
      <Spacer space={2} />
      <View className="w-full flex-row justify-between">
        <Text className="color-gray-400">Time remaining 2:00s</Text>
        <TouchableOpacity className="border-b-2 border-[#5FD5E5]">
          <Text className="color-gray-500">Resend</Text>
        </TouchableOpacity>
      </View>

      <EntryButton onPress={() => handleVerfication(OTP)} />
    </View>
  );
};
const styles = StyleSheet.create({
  borderStyleBase: {
    width: 40,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    color: "black",
    fontWeight: "600",
    fontSize: 17,
    borderRadius: 10,
    width: 58,
    height: 54,
    borderWidth: 1,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
});
export default Confirm;
