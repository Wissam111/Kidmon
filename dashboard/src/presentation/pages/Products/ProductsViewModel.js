import { useEffect, useState } from "react";
import ProductRepository from "../../../repository/ProductRepository";
import { useLoadingContext } from "../../../hooks/useLoadingContext";
import { useAlertsContext } from "../../../hooks/useAlertsContext";
const ProductsViewModel = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const { showSuccess, showError } = useAlertsContext();
  const [category, setCategory] = useState("All");
  const [refreshKey, setRefreshKey] = useState(0);
  const [numofPages, setNumOfPages] = useState(1);
  const { setLoading } = useLoadingContext();
  const PAGE_SIZE = 10;
  const productRepo = ProductRepository();

  const getProducts = async () => {
    try {
      const data = await productRepo.getProducts(category, PAGE_SIZE, page);
      setNumOfPages(Math.round(data.count / PAGE_SIZE));
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProduct = async (product) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }
    setLoading(true);
    try {
      await productRepo.deleteProdcut(product.id);
      refresh();
      showSuccess("Successfully deleted product");
    } catch (error) {
      console.log(error?.error?.message);
      showError(error?.error?.messag);
    }
    setLoading(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSelectCategory = (category) => {
    setCategory(category);
  };

  const refresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };
  useEffect(() => {
    const ProudctsPageInit = async () => {
      setLoading(true);
      await getProducts();
      setLoading(false);
    };

    ProudctsPageInit();
  }, [page, category, refreshKey]);

  return {
    products,
    page,
    numofPages,
    handleChangePage,
    handleSelectCategory,
    handleDeleteProduct,
  };
};

export default ProductsViewModel;
