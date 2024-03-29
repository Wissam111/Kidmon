import { useApiContext } from "../hooks/useApiContext";
import axios from "axios";
import { BASE_URL } from "../context/ApiContext";
const ProductRepository = () => {
  const { apiCall, axiosPost } = useApiContext();

  const getProducts = async (category, pageSize, page) => {
    let url;
    if (category === "All") {
      url = `products?page=${page}&pageSize=${pageSize}&sort=${"desc"}`;
    } else {
      url = `products?category=${category}&page=${page}&pageSize=${pageSize}&sort=${"desc"}`;
    }

    const data = apiCall(url);
    return data;
  };

  const getProductsByCategory = async (category) => {
    let url = `products?category=${category}&sort=${"desc"}`;
    const data = apiCall(url);
    return data;
  };

  //------CRUD------
  const createProduct = async (productFormData) => {
    const data = await axiosPost("products", productFormData);
    return data;
  };
  const deleteProdcut = async (productId) => {
    const data = apiCall(`products/${productId}`, "DELETE");
    return data;
  };
  const updateProduct = async () => {};
  const getProduct = async () => {};

  return {
    getProducts,
    getProductsByCategory,
    getProduct,
    createProduct,
    deleteProdcut,
    updateProduct,
  };
};
export default ProductRepository;
