import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { TextInput } from "@react-native-material/core";
import ChildProfileFormViewModel from "./ChildProfileFormViewModel";
import DefaultButton from "../../components/DefaultButton";
import Spacer from "../../components/Spacer";
import { useNavigation, useRoute } from "@react-navigation/native";

const ChildProfileForm = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { isEditMode } = route.params;
  const {
    firstName,
    lastName,
    phone,
    braceletId,
    handleFormDataChange,
    selectImage,
    image,
    handleSubmit,
  } = ChildProfileFormViewModel(isEditMode);

  const title = isEditMode ? "Edit Profile" : "Add Child";
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        enabled={true}
      >
        <ScrollView
          className="w-full"
          contentContainerStyle={{ alignItems: "center" }}
        >
          <SafeAreaView />
          <TouchableOpacity
            className="absolute left-4 top-16"
            onPress={navigation.goBack}
          >
            <AntDesign name="left" size={25} />
          </TouchableOpacity>

          <Text className="text-2xl font-medium p-4 mb-5">{title}</Text>
          <Spacer space={5} />

          <View className="relative w-full items-center">
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <Image
                source={require("../../../../assets/imgs/user3.png")}
                style={styles.image}
              />
            )}
            <TouchableOpacity
              onPress={selectImage}
              className="absolute bottom-0  left-52"
            >
              <MaterialCommunityIcons name="square-edit-outline" size={30} />
            </TouchableOpacity>
          </View>
          <Spacer space={7} />
          <View className="w-full p-2">
            <TextInput
              variant="standard"
              label="First Name"
              style={styles.input}
              value={firstName}
              fontWeight="500"
              color="gray"
              fontSize={19}
              onChangeText={(value) => handleFormDataChange("firstName", value)}
            />
            <TextInput
              variant="standard"
              label="Last Name"
              style={styles.input}
              value={lastName}
              color="gray"
              fontWeight="500"
              fontSize={18}
              onChangeText={(value) => handleFormDataChange("lastName", value)}
            />
            <TextInput
              variant="standard"
              label="Phone"
              style={styles.input}
              value={phone}
              color="gray"
              fontWeight="500"
              keyboardType="phone-pad"
              fontSize={18}
              onChangeText={(value) => handleFormDataChange("phone", value)}
            />

            <TextInput
              variant="standard"
              label="Braclet Id"
              style={styles.input}
              value={braceletId}
              color="gray"
              fontWeight="500"
              fontSize={18}
              keyboardType="phone-pad"
              onChangeText={(value) =>
                handleFormDataChange("braceletId", value)
              }
            />
          </View>
          <Spacer space={7} />
          <DefaultButton
            text={isEditMode ? "Save Changes" : "Add Child"}
            style={{ width: "50%", height: 45 }}
            onPress={handleSubmit}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 100,
  },
  placeholderText: {
    fontSize: 18,
    color: "gray",
  },
  input: {
    width: "90%",
    margin: 16,
    fontSize: 55,
  },
});

export default ChildProfileForm;
