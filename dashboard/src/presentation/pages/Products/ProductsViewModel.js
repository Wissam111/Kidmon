import { useEffect, useState } from "react";
import ProductRepository from "../../../repository/ProductRepository";
import { useLoadingContext } from "../../../hooks/useLoadingContext";
const ProductsViewModel = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const [category, setCategory] = useState("Snack");
  const [numofPages, setNumOfPages] = useState(1);
  const { setLoading } = useLoadingContext();
  const PAGE_SIZE = 10;
  const productRepo = ProductRepository();

  const getProducts = async () => {
    try {
      const data = await productRepo.getProducts(category, PAGE_SIZE, page);
      console.log(data.count);
      setNumOfPages(Math.round(data.count / PAGE_SIZE));
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProduct = async (product) => {
    setLoading(true);

    try {
      const data = await productRepo.deleteProdcut(product.id);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSelectCategory = (category) => {
    setCategory(category);
  };

  useEffect(() => {
    const ProudctsPageInit = async () => {
      setLoading(true);
      await getProducts();
      setLoading(false);
    };

    ProudctsPageInit();
  }, [page, category]);

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
