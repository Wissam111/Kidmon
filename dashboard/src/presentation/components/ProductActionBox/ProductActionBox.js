import { useState } from "react";
import Select from "react-select";
import "./ProductActionBox.css";
import Input from "../Input/Input";
import IngerdientCard from "../IngerdientCard/IngerdientCard";
import { allergicIngredients, categoriesOptions } from "../../../data/data";

const ProductActionBox = ({ handlePublishProduct }) => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [allergiesList, setAllergiesList] = useState([]);
  const defaultOption = categoriesOptions[0];

  const handePriceChange = (e) => {
    const regex = /^[0-9]*\.?[0-9]*$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setProductPrice(e.target.value);
    }
  };
  const handleSelectIngerdient = (ingredient) => {
    console.log(ingredient);
    let tempList = [...allergiesList];
    const index = tempList.indexOf(ingredient);

    if (index > -1) {
      tempList.splice(index, 1);
    } else {
      tempList.push(ingredient);
    }

    setAllergiesList(tempList);
  };
  const resetInputs = () => {
    setProductName("");
    setProductCategory("");
    setProductPrice("");
    setAllergiesList([]);
  };

  return (
    <div className="product-action-cta">
      <Input
        text={"Product Name"}
        value={productName}
        handleChange={(e) => setProductName(e.target.value)}
      />
      <div className="action-select-category">
        <Select
          options={categoriesOptions}
          defaultValue={defaultOption}
          value={productCategory}
          onChange={(option) => {
            setProductCategory(option);
          }}
          menuPortalTarget={document.body}
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
        />
      </div>
      <Input
        text={"Price"}
        type="numbers"
        value={productPrice}
        handleChange={handePriceChange}
      />
      <div className="allergic-product-wrapper">
        {allergicIngredients.map((ingredient, index) => (
          <IngerdientCard
            key={index}
            text={ingredient}
            handleSelectInerdient={() => handleSelectIngerdient(ingredient)}
            isActive={allergiesList.includes(ingredient)}
          />
        ))}
      </div>
      <button
        className="publish-product-btn"
        onClick={() =>
          handlePublishProduct(
            productName,
            productPrice,
            productCategory?.value,
            allergiesList,
            resetInputs
          )
        }
      >
        Publish Product
      </button>
    </div>
  );
};

export default ProductActionBox;
