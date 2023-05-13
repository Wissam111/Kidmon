import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import Spacer from "../../../components/Spacer";
import EntryButton from "./EntryButton";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { AntDesign } from "@expo/vector-icons";
const Confirm = ({ handleVerfication, handleShowOTP }) => {
  const [OTP, setOTP] = useState("");
  const [time, setTime] = useState(60);
  useEffect(() => {
    if (time === 0) return;

    const interval = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  const handleResend = () => {
    setTime(60);
  };

  return (
    <View
      style={{ width: "91%" }}
      className="absolute h-80 bg-white z-50 top-60 rounded-xl p-6 items-center shadow-md"
    >
      <TouchableOpacity
        className="absolute left-4 top-5"
        onPress={handleShowOTP}
      >
        <AntDesign name="left" size={25} />
      </TouchableOpacity>
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
        <Text className="color-gray-400">Time remaining: {time}</Text>
        <TouchableOpacity
          className="border-b-2 border-[#5FD5E5]"
          onPress={handleResend}
        >
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
