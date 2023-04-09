import "./Home.css";
// import { BsSearch } from "react-icons/bs";
import MenuItemCard from "../../components/MenuItemCard/MenuItemCard";
import CartMenu from "../../components/CartMenu/CartMenu";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import Search from "../../components/Search/Search";
import { BASE_URL } from "../../../context/ApiContext";
import { ProdcutsTable } from "../../components/ProdcutsTable/ProdcutsTable";

import HomeViewModel from "./HomeViewModel";

const Home = () => {
  const { products, categories, currentCategory, handleSelectCategory } =
    HomeViewModel();

  return (
    <div className="page-container">
      <div className="home-container">
        <div className="home-orders-main">
          <div className="home-main-bar">
            <h1>
              Menu <span>Category</span>{" "}
            </h1>
            <Search />
          </div>
          <div className="category-cards-container">
            {categories.map((category) => {
              return (
                <CategoryCard
                  category={category}
                  isActive={currentCategory.text === category.text}
                  handleSelectCategory={handleSelectCategory}
                />
              );
            })}
          </div>

          <div className="menu-item-cards">
            {products.map((product) => {
              return (
                <MenuItemCard
                  cardImg={product.image}
                  text={product.title}
                  price={product.price}
                />
              );
            })}
          </div>
        </div>
        <CartMenu />
      </div>
    </div>
  );
};

export default Home;
