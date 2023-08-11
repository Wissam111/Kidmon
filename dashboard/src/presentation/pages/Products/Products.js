import React from "react";

import "./Products.css";
import Search from "../../components/Search/Search";
import ProductBar from "../../components/ProductBar/ProductBar";
import ProdcutsTable from "../../components/ProdcutsTable/ProdcutsTable";
import ProductsViewModel from "./ProductsViewModel";
import Spacer from "../../components/Spacer";

const Products = () => {
  const {
    products,
    searchedProducts,
    page,
    pageSize,
    numofPages,
    handleChangePage,
    handleSelectCategory,
    handleDeleteProduct,
    handleSearch,
  } = ProductsViewModel();
  return (
    <div className="page-container">
      <div className="products-container">
        <Search onChange={handleSearch} />
        <Spacer space={14} />
        <ProductBar handleSelectCategory={handleSelectCategory} />
        <Spacer space={6} />
        <ProdcutsTable
          products={searchedProducts}
          page={page}
          pageSize={pageSize}
          numofPages={numofPages}
          handleChangePage={handleChangePage}
          handleDeleteProduct={handleDeleteProduct}
        />
      </div>
    </div>
  );
};

export default Products;
