import "./Home.css";
import MenuItemCard from "../../components/MenuItemCard/MenuItemCard";
import CartMenu from "../../components/CartMenu/CartMenu";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import Search from "../../components/Search/Search";
import RFIDReader from "../../components/RFIDReader/RFIDReader";
import ChildInfo from "../../components/ChildInfo/ChildInfo";
import HomeViewModel from "./HomeViewModel";

const Home = () => {
  const {
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
  } = HomeViewModel();

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
              return <MenuItemCard product={product} />;
            })}
          </div>
        </div>
        <CartMenu handleShowScan={handleShowScan} />
        {currentChild && (
          <ChildInfo
            handleCloseChildInfo={handleCloseChildInfo}
            child={currentChild}
            makePurchase={makePurchase}
          />
        )}
        {showScan && (
          <RFIDReader handleCloseScan={handleShowScan} scanChild={scanChild} />
        )}
      </div>
    </div>
  );
};

export default Home;
