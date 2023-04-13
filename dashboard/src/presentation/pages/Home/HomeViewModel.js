import { useEffect, useState } from "react";

import { categories } from "../../../data/data";
import { useLoadingContext } from "../../../hooks/useLoadingContext";
import { useAlertContext } from "../../../hooks/useAlertContext";

import ProductRepository from "../../../repository/ProductRepository";
import UserRepository from "../../../repository/UserRepository";

const HomeViewModel = () => {
  const [products, setProducts] = useState([]);
  const { setLoading } = useLoadingContext();
  const [currentCategory, setCurrentCategory] = useState(categories[0]);
  const [showScan, setShowScan] = useState(false);
  const [showChildInfo, setShowChildInfo] = useState(false);
  const [currentChild, setCurrentChild] = useState(null);
  const { invokeAlert } = useAlertContext();
  const productRepos = ProductRepository();
  const userRepository = UserRepository();

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

  const scanChild = async (rfid) => {
    let isSuccess = null;
    let messg = "";
    setLoading(true);
    try {
      const data = await userRepository.getUserByRFID(rfid);
      setCurrentChild(data.user);

      console.log(data);
    } catch (error) {
      console.log(error);
      messg = error?.error.message;
      isSuccess = false;
    }
    setLoading(false);
    handleShowScan();
    invokeAlert(isSuccess, messg);
  };

  const handleShowScan = () => {
    setShowScan(!showScan);
  };
  const handleCloseChildInfo = () => {
    setCurrentChild(null);
    setShowChildInfo(!showChildInfo);
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
    showChildInfo,
    handleShowScan,
    handleCloseChildInfo,
    scanChild,
    currentChild,
  };
};

export default HomeViewModel;
