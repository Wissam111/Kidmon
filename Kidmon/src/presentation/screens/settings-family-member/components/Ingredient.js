import { View, Image, Text, TouchableOpacity } from "react-native";
import React from "react";

const Ingredient = ({ image, text, isActive, handlePress }) => {
  return (
    <TouchableOpacity
      className="items-center m-2"
      onPress={() => handlePress(text)}
    >
      <View
        className={`${
          isActive ? "bg-[#EEFBF3]" : "bg-gray-200"
        } w-14 h-14 items-center justify-center rounded-full`}
      >
        <Image className="w-7 h-7" source={image} />
      </View>
      <Text className="mt-1 color-[#000000b5]">{text}</Text>
    </TouchableOpacity>
  );
};

export default Ingredient;
