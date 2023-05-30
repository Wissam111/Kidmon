import { useCallback, useEffect, useState } from "react";

import { useSpring } from "react-spring";

import { categories } from "../../../data/data";
import { useLoadingContext } from "../../../hooks/useLoadingContext";
import { useAlertContext } from "../../../hooks/useAlertContext";
import { useCartItemsContext } from "../../../hooks/useCartItemsContext";

import ProductRepository from "../../../repository/ProductRepository";
import UserRepository from "../../../repository/UserRepository";

const HomeViewModel = () => {
  const [products, setProducts] = useState([]);
  const { setLoading } = useLoadingContext();
  const [currentCategory, setCurrentCategory] = useState(categories[0]);
  const [showScan, setShowScan] = useState(false);
  const [currentChild, setCurrentChild] = useState(null);
  const { dispatch } = useCartItemsContext();

  const { invokeAlert } = useAlertContext();
  const productRepos = ProductRepository();
  const userRepository = UserRepository();
  const [childViewAnimation, setChildViewAnimation] = useSpring(() => ({
    opacity: 0,
    config: { duration: 300 },
  }));

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
  const makePurchase = useCallback(
    async (noneAllegicProducts) => {
      const products = noneAllegicProducts.map((p) => {
        return { id: p.id, amount: p.amount };
      });

      let isSuccess = false;
      let messg = "Purchase was successful";
      setLoading(true);
      try {
        console.log("making purchase", currentChild.id, products);
        const data = await userRepository.makePurchase(
          currentChild.id,
          products
        );
        console.log(data);
        isSuccess = true;
      } catch (error) {
        console.log(error);
        messg = error?.error.message;
      }
      setLoading(false);
      invokeAlert(isSuccess, messg);
      handleCloseChildInfo();
    },
    [currentChild, userRepository, invokeAlert, setLoading]
  );

  const scanChild = async (rfid) => {
    let isSuccess = null;
    let messg = "";
    setLoading(true);
    try {
      const data = await userRepository.getUserByRFID(rfid);
      setCurrentChild(data.user);
      handleShowScan();
    } catch (error) {
      console.log(error);
      messg = error?.error.message;
      isSuccess = false;
    }
    setLoading(false);
    invokeAlert(isSuccess, messg);
  };

  const handleShowScan = () => {
    setShowScan(!showScan);
  };
  const handleCloseChildInfo = () => {
    setCurrentChild(null);
    dispatch({ type: "CLEAR" });
  };

  const handleSelectCategory = (category) => {
    setCurrentCategory(category);
  };

  useEffect(() => {
    if (currentChild) {
      requestAnimationFrame(() => {
        setChildViewAnimation({ opacity: 1 });
      });
    } else {
      setChildViewAnimation({ opacity: 0 });
    }
  }, [currentChild]);
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
    handleCloseChildInfo,
    scanChild,
    currentChild,
    makePurchase,
    childViewAnimation,
  };
};

export default HomeViewModel;
