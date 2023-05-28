import {
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  Image,
} from "react-native";
import { useState } from "react";
import Spacer from "../../components/Spacer";
import Header from "./components/Header";
import { TextInput } from "react-native-gesture-handler";
import DefaultButton from "../../components/DefaultButton";
import TransferViewModel from "./TransferViewModel";
import { IMG_URL } from "../../../network/apiCall";

const Transfer = ({ navigation }) => {
  const { points, hanldeChangePoints, handleTransferPoints, familyMember } =
    TransferViewModel();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1">
        <SafeAreaView />
        <Header navigation={navigation} />
        <View className="flex-1 items-center mt-6 relative">
          <Image
            className="w-24 h-24 absolute rotate-45 top-64 left-2"
            source={require("../../../../assets/imgs/handprint3.png")}
          />

          <View className="items-center">
            <Text className="text-3xl font-light tracking-wide">
              Charging money
            </Text>
            <Spacer space={3} />
            <Text className="text-3xl font-light tracking-wide">
              to {familyMember?.firstName + " " + familyMember?.lastName}
            </Text>
          </View>
          <Spacer space={17} />
          <TextInput
            variant="standard"
            color="black"
            fontWeight="500"
            value={points}
            keyboardType="phone-pad"
            className="bg-[#F9F9F9] min-w-[50%] h-14 rounded-lg p-2 text-center tracking-widder"
            fontSize={23}
            onChangeText={hanldeChangePoints}
            placeholder="0"
            style={{ letterSpacing: 2 }}
          />
          <Spacer space={8} />
          <View className="items-center flex-1 w-full">
            <View style={{ width: 3 }} className="h-32 bg-[#f8e7c7]"></View>

            <View className="border-4 p-4 rounded-full mt-4 border-[#f8e7c7] border-dotted z-50 -mb-11">
              <Image
                className="w-24 h-24 rounded-full "
                source={
                  familyMember?.image
                    ? { uri: IMG_URL + `${familyMember.image}` }
                    : require("../../../../assets/imgs/kid.jpg")
                }
              />
            </View>
            <View className="bg-[#EEFBF3] w-full flex-1  justify-center items-center relative">
              <View
                className="absolute top-0 bg-gray-100"
                style={{
                  width: 174,
                  height: 65,
                  borderBottomLeftRadius: 100,
                  borderBottomRightRadius: 200,
                  overflow: "hidden",
                }}
              />
              <DefaultButton
                style={{ width: "75%", height: 45 }}
                text={"Charge"}
                onPress={handleTransferPoints}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Transfer;
