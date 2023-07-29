import { useState } from "react";
import ProductRepository from "../../../repository/ProductRepository";
import { useLoadingContext } from "../../../hooks/useLoadingContext";
import { useAlertsContext } from "../../../hooks/useAlertsContext";
const ProductActionViewModel = () => {
  const [file, setFile] = useState(null);
  const { setLoading } = useLoadingContext();
  const productRepo = ProductRepository();
  const { showSuccess, showError } = useAlertsContext();
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
    setLoading(true);
    const formData = createFormData(title, price, category, allergicList);
    try {
      await productRepo.createProduct(formData);
      showSuccess("Product created successfully");
    } catch (error) {
      console.log(error?.response.data);
      showError(error?.response.data?.message);
    }

    setLoading(false);
    resetInputs();
    setFile(null);
  };

  const createFormData = (title, price, category, allergicList) => {
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

    return formData;
  };

  return {
    file,
    handleChangeFile,
    handlePublishProduct,
  };
};

export default ProductActionViewModel;
