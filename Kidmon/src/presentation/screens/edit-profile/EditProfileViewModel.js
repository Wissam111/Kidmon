import { useState, useRef } from "react";
import { useFamilyMemberContext } from "../../../hooks/useFamilyMemberContext";
import * as ImagePicker from "expo-image-picker";
import { IMG_URL } from "../../../network/apiCall";

const EditProfileViewModel = () => {
  const { familyMember } = useFamilyMemberContext();

  const [formData, setFormData] = useState({
    firstName: familyMember.firstName,
    lastName: familyMember.lastName,
    phone: familyMember.phone,
    braceletId: familyMember.braceletId,
  });
  const [image, setImage] = useState(
    familyMember.image ? IMG_URL + familyMember.image : null
  );

  const onSaveChanges = async () => {
    try {
      console.log("hoxfox");
    } catch (error) {}
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

  return {
    ...formData,
    handleFormDataChange,
    selectImage,
    image,
    onSaveChanges,
  };
};

export default EditProfileViewModel;
