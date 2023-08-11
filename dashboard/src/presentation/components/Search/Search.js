import React from "react";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { HiOutlineSearch } from "react-icons/hi";
import "./Search.css";
const Search = ({ onChange, handleSearch }) => {
  return (
    <div className="p-inputgroup">
      <InputText placeholder="Search" onChange={onChange} />
      <Button
        onClick={handleSearch}
        // className="p-button-warning"
        icon={<HiOutlineSearch size={20} />}
        style={{ background: "#2be1bd", borderColor: "white" }}
      />
    </div>
    // <div className="search-menu-wrapper">
    //   <input placeholder="search for product" type={"search"} />
    // </div>
  );
};

export default Search;
