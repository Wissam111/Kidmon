import { useApiContext } from "../hooks/useApiContext";
import { BASE_URL } from "../context/ApiContext";
const ProductRepository = () => {
  const { apiCall } = useApiContext();

  const getProducts = async (category, pageSize, page) => {
    let url = `products?category=${category}&page=${page}&pageSize=${pageSize}&sort=${"desc"}`;
    console.log(url);
    const data = apiCall(url);
    return data;
  };

  const getProductsByCategory = async (category) => {
    let url = `products?category=${category}&sort=${"desc"}`;
    const data = apiCall(url);
    return data;
  };
  //CRUD
  const createProduct = async (title, price, category, allergicIngredients) => {
    const data = apiCall("products", "POST", {
      title,
      price,
      category,
      allergicIngredients,
    });
    return data;
  };
  const deleteProdcut = async () => {};
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
