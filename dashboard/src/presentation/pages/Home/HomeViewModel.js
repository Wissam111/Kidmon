import { useCallback, useEffect, useState } from "react";

import { useSpring } from "react-spring";

import { categories } from "../../../data/data";
import { useLoadingContext } from "../../../hooks/useLoadingContext";
import { useAlertsContext } from "../../../hooks/useAlertsContext";
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

  const { showSuccess, showError } = useAlertsContext();
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

      setLoading(true);
      try {
        console.log("making purchase", currentChild.id, products);
        const data = await userRepository.makePurchase(
          currentChild.id,
          products
        );
        handleCloseChildInfo(true);
        showSuccess("Purchase was successful");
      } catch (error) {
        console.log(error);
        showError(error?.error.message);
      }
      setLoading(false);
    },
    [currentChild, userRepository, setLoading]
  );

  const scanChild = async (rfid) => {
    setLoading(true);
    try {
      const data = await userRepository.getUserByRFID(rfid);
      setCurrentChild(data.user);
      handleShowScan();
      showSuccess("Scan was successful");
    } catch (error) {
      console.log(error);
      showError(error?.error.message);
    }
    setLoading(false);
  };

  const handleShowScan = () => {
    setShowScan(!showScan);
  };
  const handleCloseChildInfo = (clearCart) => {
    if (clearCart) {
      dispatch({ type: "CLEAR" });
    }
    setCurrentChild(null);
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
