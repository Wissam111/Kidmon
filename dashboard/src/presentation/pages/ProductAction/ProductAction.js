import { FileUploader } from "react-drag-drop-files";
import { fileTypes } from "../../../data/data";
import "./ProductAction.css";
import ProductActionBox from "../../components/ProductActionBox/ProductActionBox";
import ProductActionViewModel from "./ProductActionViewModel";

const ProductAction = () => {
  const { file, handleChangeFile, handlePublishProduct } =
    ProductActionViewModel();

  return (
    <div className="page-container">
      <div className="action-page-wrapper">
        <div className="product-action-container">
          <h3>Add Product</h3>
          <div className="product-action-cta-wrapper">
            <div className="upload-img-wrapper">
              <FileUploader
                multiple={true}
                handleChange={handleChangeFile}
                name="file"
                types={fileTypes}
              />
              <p>
                {file ? `File name: ${file.name}` : "no files uploaded yet"}
              </p>
            </div>
            <ProductActionBox handlePublishProduct={handlePublishProduct} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAction;
