import React from "react";
import "react-dropdown/style.css";
import "./ProductBar.css";
import Select from "react-select";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { categoriesOptionsV2 } from "../../../data/data";
const ProductBar = ({ handleSelectCategory }) => {
  const navigate = useNavigate();

  const defaultOption = categoriesOptionsV2[0];
  return (
    <div className="product-bar-container">
      <div className="select-category">
        <Select
          options={categoriesOptionsV2}
          defaultValue={defaultOption}
          onChange={(option) => handleSelectCategory(option.value)}
          menuPortalTarget={document.body}
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
        />
      </div>

      <button
        className="add-product-btn"
        onClick={() => navigate("/product-action")}
      >
        <AiOutlinePlusCircle size={20} />
        <span>Add Product</span>
      </button>
    </div>
  );
};
export default ProductBar;
