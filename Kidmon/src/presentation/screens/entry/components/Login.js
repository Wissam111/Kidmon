import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import Spacer from "../../../components/Spacer";
import EntryButton from "./EntryButton";
const Login = ({ handleLogin }) => {
  const [phone, setPhone] = useState("");

  return (
    <View
      style={{ width: "91%" }}
      className="absolute  h-80 bg-white z-50 top-56 rounded-xl p-6 items-center shadow-md"
    >
      <Text className="text-3xl font-semibold mt-3">Login</Text>
      <Spacer space={10} />
      <TextInput
        className="h-12 w-full border border-solid border-gray-400 border-opacity-35 rounded-lg p-2"
        keyboardType="phone-pad"
        value={phone}
        placeholder="Enter your phone number"
        onChangeText={(value) => setPhone(value)}
      />
      <Spacer space={17} />
      <Text className="text-sm color-[#00000061]">
        We will send you one time password
      </Text>
      <EntryButton onPress={() => handleLogin(phone)} />
    </View>
  );
};

export default Login;
