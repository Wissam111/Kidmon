import { useState } from "react";
import { useFamilyMemberContext } from "../../../hooks/useFamilyMemberContext";
import * as ImagePicker from "expo-image-picker";
import { IMG_URL } from "../../../network/apiCall";
import UserRepository from "../../../repository/UserRepository";
import { useLoadingContext } from "../../../hooks/useLoadingContext";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAlertsContext } from "../../../hooks/useAlertsContext";

const ChildProfileFormViewModel = (isEditMode) => {
  const { familyMember } = useFamilyMemberContext();
  const { setLoading } = useLoadingContext();
  const { user } = useAuthContext();
  const { showSuccess, showError } = useAlertsContext();

  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    firstName: isEditMode ? familyMember.firstName : "",
    lastName: isEditMode ? familyMember.lastName : "",
    phone: isEditMode ? familyMember.phone : "",
    braceletId: isEditMode ? familyMember.braceletId : "",
  });
  const [image, setImage] = useState(
    isEditMode && familyMember.image ? IMG_URL + familyMember.image : null
  );

  const userRepository = UserRepository();
  const SaveChanges = async () => {
    setLoading(true);
    try {
      const data = await userRepository.updateUser({
        userId: familyMember.id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        braceletId: formData.braceletId,
      });
      console.log(data);
      showSuccess("Child saved successfully");
      NavigateHome();
    } catch (error) {
      showError("Error saving" + error.message);
    }
    setLoading(false);
  };

  const CreateChild = async () => {
    setLoading(true);
    const childFormData = createChildFormData();
    try {
      const data = await userRepository.createFamilyMember(childFormData);
      showSuccess("Child created successfully");
      NavigateHome();
    } catch (error) {
      showError("Error Creating Child " + error.message);
    }

    setLoading(false);
  };

  const handleSubmit = async () => {
    if (isEditMode) {
      SaveChanges();
    } else {
      CreateChild();
    }
  };

  const createChildFormData = () => {
    const childFormData = new FormData();
    if (image) {
      const fileUriParts = image.split(".");
      const fileType = fileUriParts[fileUriParts.length - 1];
      childFormData.append("image", {
        uri: image,
        name: `child_image.${fileType}`,
        type: `image/${fileType}`,
      });
    }
    childFormData.append("firstName", formData.firstName);
    childFormData.append("lastName", formData.lastName);
    childFormData.append("phone", formData.phone);
    childFormData.append("braceletId", formData.braceletId);
    childFormData.append("parentId", user.id);
    return childFormData;
  };

  const handleFormDataChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const handleAlert = (type, message) => {
    const alertTitle = type === "success" ? "Success" : "Error";
    const alertButton = { text: "OK", onPress: () => {} };
    Alert.alert(alertTitle, message, [alertButton], { cancelable: false });
  };
  const NavigateHome = () => {
    navigation.navigate("HomeParent");
  };
  return {
    ...formData,
    handleFormDataChange,
    selectImage,
    image,
    handleSubmit,
  };
};

export default ChildProfileFormViewModel;
