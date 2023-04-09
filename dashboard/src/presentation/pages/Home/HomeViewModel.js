import React, { useEffect, useState } from "react";
import ProductRepository from "../../../repository/ProductRepository";
import { categories } from "../../../data/data";

const HomeViewModel = () => {
  const productRepos = ProductRepository();
  const [products, setProducts] = useState([]);

  const [currentCategory, setCurrentCategory] = useState(categories[0]);

  const getProductsByCategory = async () => {
    try {
      const data = await productRepos.getProductsByCategory(
        currentCategory.text
      );
      console.log(data);
      setProducts(data.products);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSelectCategory = (category) => {
    setCurrentCategory(category);
  };
  useEffect(() => {
    getProductsByCategory();
  }, [currentCategory]);

  return { products, categories, currentCategory, handleSelectCategory };
};

export default HomeViewModel;
