import React from "react";
import CategoryCard from "../CategoryCard/CategoryCard";
import "./CategoryCards.css";

const CategoryCards = () => {
  return (
    <div className="category-cards-container">
      <CategoryCard
        text="Snack"
        categoryImg={require("../../../assets/icons/snack.png")}
      />
      <CategoryCard
        text="Cold"
        categoryImg={require("../../../assets/icons/cold-coffee.png")}
      />
      <CategoryCard
        text="Hot"
        categoryImg={require("../../../assets/icons/coffee-cup.png")}
      />
      <CategoryCard
        text="Food"
        categoryImg={require("../../../assets/icons/fast-food.png")}
      />
    </div>
  );
};

export default CategoryCards;
