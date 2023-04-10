import { useState } from "react";
import ProductRepository from "../../../repository/ProductRepository";
import { useLoadingContext } from "../../../hooks/useLoadingContext";

const ProductActionViewModel = () => {
  const [file, setFile] = useState(null);
  const { setLoading } = useLoadingContext();
  const productRepo = ProductRepository();
  const handleChangeFile = (fileList) => {
    console.log(fileList[0]);
    setFile(fileList[0]);
  };

  const handlePublishProduct = async (title, price, category, allergicList) => {
    setLoading(true);
    const formData = new FormData();
    if (file) {
      formData.append("image", file);
    }

    formData.append("title", title);
    formData.append("price", price);
    formData.append("category", category);
    // console.log(allergicList);
    // formData.append("allergicIngredients", JSON.stringify(allergicList));

    try {
      const res = await productRepo.createProduct(formData);
      const data = await res.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return { file, handleChangeFile, handlePublishProduct };
};

export default ProductActionViewModel;
