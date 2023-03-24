import React from "react";

import "./Home.css";
// import { BsSearch } from "react-icons/bs";
import CategoryCards from "../../components/CategoryCards/CategoryCards";
import MenuItemCard from "../../components/MenuItemCard/MenuItemCard";
import CartMenu from "../../components/CartMenu/CartMenu";

const Home = () => {
  return (
    <div className="page-container">
      <div className="home-container">
        <div className="home-orders-main">
          <div className="home-main-bar">
            <h1>
              Menu <span>Category</span>{" "}
            </h1>
            <div className="search-menu-wrapper">
              {/* <BsSearch size={12} color="gray" /> */}
              <input placeholder="search for food" type={"search"} />
            </div>
          </div>
          <CategoryCards />

          <div className="menu-item-cards">
            <MenuItemCard
              cardImg={require("../../../assets/imgs/dor1.jpg")}
              text="Green Doritos"
              price={5.99}
            />
            <MenuItemCard
              cardImg={require("../../../assets/imgs/bsli2.jpg")}
              text="Beasley Falafel"
              price={5.99}
            />
            <MenuItemCard
              cardImg={require("../../../assets/imgs/dor1.jpg")}
              text="Green Doritos"
              price={5.99}
            />
            <MenuItemCard
              cardImg={require("../../../assets/imgs/dor1.jpg")}
              text="Green Doritos"
              price={5.99}
            />
            <MenuItemCard
              cardImg={require("../../../assets/imgs/dor1.jpg")}
              text="Green Doritos"
              price={5.99}
            />
            <MenuItemCard
              cardImg={require("../../../assets/imgs/dor1.jpg")}
              text="Green Doritos"
              price={5.99}
            />
          </div>
        </div>
        <CartMenu />
      </div>
    </div>
  );
};

export default Home;
