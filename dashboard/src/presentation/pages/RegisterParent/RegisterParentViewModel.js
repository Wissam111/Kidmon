import { useState } from "react";
import ParentRepository from "../../../repository/ParentRepository";
import { useLoadingContext } from "../../../hooks/useLoadingContext";

const RegisterParentViewModel = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { setLoading } = useLoadingContext();

  const parentRepository = ParentRepository();

  const createParent = async () => {
    setLoading(true);
    try {
      const data = await parentRepository.createParent(
        firstName,
        lastName,
        phoneNumber
      );
      resetInputs();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const resetInputs = () => {
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const handlePhoneChange = (e) => {
    const regex = /^[0-9]*$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setPhoneNumber(e.target.value);
    }
  };

  return {
    firstName,
    lastName,
    phoneNumber,
    handleFirstNameChange,
    handleLastNameChange,
    handlePhoneChange,
    createParent,
  };
};

export default RegisterParentViewModel;
