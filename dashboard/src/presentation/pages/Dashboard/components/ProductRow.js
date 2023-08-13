import React from "react";

import Spacer from "../../../components/Spacer";
import Card from "@mui/material/Card";
import { BASE_URL_1 } from "../../../../context/ApiContext";
const ProductRow = ({ product }) => {
  return (
    <Card className="added-product-card-container">
      <div>
        <h4>{product.title}</h4>
        <div className="added-product-img-wrapper">
          <img
            style={{ width: "40px", height: "40px" }}
            src={
              product.image
                ? BASE_URL_1 + `imgs/${product.image}`
                : require("../../../../assets/icons/help.png")
            }
            alt=""
          />
        </div>
      </div>
      {/* <p>{"25" + "₪"}</p> */}
    </Card>
  );
};

export default ProductRow;
