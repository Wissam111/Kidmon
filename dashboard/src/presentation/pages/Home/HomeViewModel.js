import { useEffect, useState } from "react";
import ProductRepository from "../../../repository/ProductRepository";
import { categories } from "../../../data/data";
import { useLoadingContext } from "../../../hooks/useLoadingContext";

const HomeViewModel = () => {
  const productRepos = ProductRepository();
  const [products, setProducts] = useState([]);
  const { setLoading } = useLoadingContext();
  const [currentCategory, setCurrentCategory] = useState(categories[0]);
  const [showScan, setShowScan] = useState(false);

  const getProductsByCategory = async () => {
    try {
      const data = await productRepos.getProductsByCategory(
        currentCategory.text
      );
      setProducts(data.products);
    } catch (e) {
      console.log(e);
    }
  };

  const handleShowScan = () => {
    setShowScan(!showScan);
  };

  const handleSelectCategory = (category) => {
    setCurrentCategory(category);
  };
  useEffect(() => {
    const HomePageInit = async () => {
      setLoading(true);
      await getProductsByCategory();
      setLoading(false);
    };

    HomePageInit();
  }, [currentCategory]);

  return {
    products,
    categories,
    currentCategory,
    handleSelectCategory,
    showScan,
    handleShowScan,
  };
};

export default HomeViewModel;
