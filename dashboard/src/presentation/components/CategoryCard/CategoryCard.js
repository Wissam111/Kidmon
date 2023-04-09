import React from "react";
import "./CategoryCard.css";

const CategoryCard = ({ category, isActive, handleSelectCategory }) => {
  return (
    <div
      className={`category-container ${isActive ? "active-category" : ""}`}
      onClick={() => handleSelectCategory(category)}
    >
      <div className="category-img-wrapper">
        <img src={category.categoryImg} alt="category-img" />
      </div>
      <span>{category.text}</span>
    </div>
  );
};

export default CategoryCard;
