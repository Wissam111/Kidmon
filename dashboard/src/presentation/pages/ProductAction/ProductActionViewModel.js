import { useState } from "react";
import ProductRepository from "../../../repository/ProductRepository";
import { useLoadingContext } from "../../../hooks/useLoadingContext";

const ProductActionViewModel = () => {
  const [file, setFile] = useState(null);
  const { setLoading } = useLoadingContext();
  const productRepo = ProductRepository();
  const handleChangeFile = (file) => {
    setFile(file);
  };

  const hanldePublishProduct = async (title, price, category, allergicList) => {
    setLoading(true);
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
    setLoading(false);
  };

  return { file, handleChangeFile, hanldePublishProduct };
};

export default ProductActionViewModel;
