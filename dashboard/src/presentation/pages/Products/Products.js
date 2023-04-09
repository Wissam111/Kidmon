import React from "react";

import "./Products.css";
import Search from "../../components/Search/Search";
import ProductBar from "../../components/ProductBar/ProductBar";
import ProdcutsTable from "../../components/ProdcutsTable/ProdcutsTable";
import ProductsViewModel from "./ProductsViewModel";

const Products = () => {
  const { products, page, pageSize, handleChangePage, handleSelectCategory } =
    ProductsViewModel();
  return (
    <div className="page-container">
      <div className="products-container">
        <Search />
        <ProductBar handleSelectCategory={handleSelectCategory} />
        <ProdcutsTable
          products={products}
          page={page}
          pageSize={pageSize}
          handleChangePage={handleChangePage}
        />
      </div>
    </div>
  );
};

export default Products;
