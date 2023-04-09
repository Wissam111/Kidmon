import React from "react";

import "./Search.css";
const Search = () => {
  return (
    <div className="search-menu-wrapper">
      {/* <BsSearch size={12} color="gray" /> */}
      <input placeholder="search for product" type={"search"} />
    </div>
  );
};

export default Search;
