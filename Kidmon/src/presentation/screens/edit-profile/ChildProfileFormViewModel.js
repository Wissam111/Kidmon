import { useState, useRef } from "react";
import { useFamilyMemberContext } from "../../../hooks/useFamilyMemberContext";
import * as ImagePicker from "expo-image-picker";
import { IMG_URL } from "../../../network/apiCall";
import UserRepository from "../../../repository/UserRepository";
import { useLoadingContext } from "../../../hooks/useLoadingContext";
import { useAuthContext } from "../../../hooks/useAuthContext";

const ChildProfileFormViewModel = (isEditMode) => {
  const { familyMember } = useFamilyMemberContext();
  const { setLoading } = useLoadingContext();
  const { authData } = useAuthContext();

  const [formData, setFormData] = useState({
    firstName: isEditMode ? familyMember.firstName : "",
    lastName: isEditMode ? familyMember.lastName : "",
    phone: isEditMode ? familyMember.phone : "",
    braceletId: isEditMode ? familyMember.braceletId : "",
  });
  const [image, setImage] = useState(
    isEditMode && familyMember.image ? IMG_URL + familyMember.image : null
  );

  console.log(familyMember);
  const userRepository = UserRepository();

  const SaveChanges = async () => {
    try {
      console.log("saved");
    } catch (error) {}
  };

  const CreateChild = async () => {
    setLoading(true);
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
    childFormData.append("parentId", authData.user.id);
    try {
      const data = await userRepository.createFamilyMember(childFormData);
      console.log(data);
    } catch (error) {
      console.log("-------", error);
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
    handleSubmit,
  };
};

export default ChildProfileFormViewModel;
