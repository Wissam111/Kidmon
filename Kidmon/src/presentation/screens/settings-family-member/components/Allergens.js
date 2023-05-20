import { View, Text, Image } from "react-native";
import Spacer from "../../../components/Spacer";
import Ingredient from "./Ingredient";
import { allergicIngredients } from "../../../../data/data";
const Allergens = ({ childAllergies, handleAllergies }) => {
  return (
    <View
      className="bg-white shadow-md rounded-md"
      style={{ width: "94%", minHeight: "40%" }}
    >
      <View className="flex-row items-start p-4">
        <Image
          className="w-7 h-7"
          source={require("../../../../../assets/imgs/allerg.png")}
        />
        <Spacer space={10} />
        <View>
          <Text className="text-xl font-medium color-[#000000bf]">
            Allergens
          </Text>
          <Text className="text-sm color-[#7979797d]">
            by adding allergens, this family member{"\n"}will not able to buy
            items that contains {"\n"}that allergens
          </Text>
        </View>
      </View>
      <View className="flex-row flex-wrap p-3 pl-5 justify-center">
        {allergicIngredients.map((inger, index) => (
          <Ingredient
            key={index}
            text={inger.text}
            image={inger.image}
            handlePress={handleAllergies}
            isActive={childAllergies.includes(inger.text)}
          />
        ))}
      </View>
    </View>
  );
};

export default Allergens;
