import React from "react";

import Spacer from "../../../components/Spacer";
import Card from "@mui/material/Card";
const ProductRow = ({ product }) => {
  return (
    <Card
      className="added-product-card-container"
      //   style={{
      //     display: "flex",
      //     justifyContent: "space-between",
      //     // flexDirection: "row",
      //   }}
      //   style={{ display: "flex", height: 100, padding: 10 }}
    >
      <div>
        <h4>{product.title}</h4>
        <div className="added-product-img-wrapper">
          <img
            style={{ width: "40px", height: "40px" }}
            src={product.img}
            alt=""
          />
        </div>
      </div>
      <p>{"25" + "₪"}</p>
    </Card>
  );
};

export default ProductRow;
