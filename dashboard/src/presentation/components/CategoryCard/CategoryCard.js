import React from "react";
import "./CategoryCard.css";

const CategoryCard = ({ text, categoryImg }) => {
  return (
    <div className="category-container">
      <div className="category-img-wrapper">
        <img src={categoryImg} alt="category-img" />
      </div>
      <span>{text}</span>
    </div>
  );
};

export default CategoryCard;
