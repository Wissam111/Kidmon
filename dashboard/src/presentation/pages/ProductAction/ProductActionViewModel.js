import { useState } from "react";
import ProductRepository from "../../../repository/ProductRepository";
import { useLoadingContext } from "../../../hooks/useLoadingContext";
import { useAlertContext } from "../../../hooks/useAlertContext";
const ProductActionViewModel = () => {
  const [file, setFile] = useState(null);
  const { setLoading } = useLoadingContext();
  const productRepo = ProductRepository();
  const { invokeAlert } = useAlertContext();
  const handleChangeFile = (fileList) => {
    setFile(fileList[0]);
  };

  const handlePublishProduct = async (
    title,
    price,
    category,
    allergicList,
    resetInputs
  ) => {
    let isSuccess = false;
    let messg = "";
    setLoading(true);
    const formData = new FormData();
    if (file) {
      formData.append("image", file);
    }
    formData.append("title", title);
    formData.append("price", price);
    formData.append("category", category);
    allergicList.forEach((allergic) => {
      formData.append("allergicIngredients[]", allergic);
    });
    try {
      await productRepo.createProduct(formData);
      isSuccess = true;
    } catch (error) {
      console.log(error?.response.data);
      messg = error?.response.data?.message;
    }

    setLoading(false);
    resetInputs();
    setFile(null);
    invokeAlert(isSuccess, messg);
  };

  return {
    file,
    handleChangeFile,
    handlePublishProduct,
  };
};

export default ProductActionViewModel;
