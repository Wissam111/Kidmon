import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  ImageBackground,
  Keyboard,
} from "react-native";
import React, { useEffect } from "react";
import Login from "./components/Login";
import Confirm from "./components/Confirm";
import EntryViewModel from "./EntryViewModel";

const Entry = () => {
  const { handleLogin, handleVerfication, showLogin } = EntryViewModel();

  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <View className="flex-1 items-center">
        <Image
          className="w-full h-2/5 opacity-80"
          source={require("../../../../assets/imgs/family-background.jpg")}
        />
        {showLogin ? (
          <Login handleLogin={handleLogin} />
        ) : (
          <Confirm handleVerfication={handleVerfication} />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Entry;
