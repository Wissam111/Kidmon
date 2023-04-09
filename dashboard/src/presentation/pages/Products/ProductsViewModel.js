import { useEffect, useState } from "react";
import ProductRepository from "../../../repository/ProductRepository";

const ProductsViewModel = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [category, setCategory] = useState("Snack");

  const productRepo = ProductRepository();

  const getProducts = async () => {
    try {
      const data = await productRepo.getProducts(category, pageSize, page);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSelectCategory = (category) => {
    setCategory(category);
  };

  useEffect(() => {
    getProducts();
  }, [page, category]);

  return { products, page, pageSize, handleChangePage, handleSelectCategory };
};

export default ProductsViewModel;
