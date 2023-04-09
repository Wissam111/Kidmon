import { useState } from "react";
import ProductRepository from "../../../repository/ProductRepository";
const ProductActionViewModel = () => {
  const [file, setFile] = useState(null);

  const productRepo = ProductRepository();
  const handleChangeFile = (file) => {
    setFile(file);
  };

  const hanldePublishProduct = async (title, price, category, allergicList) => {
    try {
      const data = await productRepo.createProduct(
        title,
        price,
        category,
        allergicList
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    console.log(title);
    console.log(price);
    console.log(category);
    console.log(allergicList);
  };

  return { file, handleChangeFile, hanldePublishProduct };
};

export default ProductActionViewModel;
