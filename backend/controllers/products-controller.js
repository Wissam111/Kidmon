const { productService } = require("../use-cases");

const createProduct = async (req, res) => {
  try {
    const { title, price, category, allergicIngredients } = req.body;
    const product = await productService.createProduct({
      allergicIngredients,
      title,
      price,
      category,
    });
    res.status(201).json({
      message: "Product created successfull",
      product,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "error creating product",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    await productService.deleteProduct({ productId: productId });
    res.status(200).json({
      message: "product deleted successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "error creating product",
    });
  }
};

const getProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await productService.getProduct({ productId: productId });
    res.status(200).json({
      message: "fetching product successfully",
      product,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "error fetching product",
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const { search, sort, category } = req.query;
    const page = +req.query.page;
    const pageSize = +req.query.pageSize;

    const products = await productService.getProducts({
      page,
      pageSize,
      search,
      sort,
      category,
    });
    res.status(200).json({
      message: "fetching products successfully",
      products,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "error fetching products",
    });
  }
};

module.exports = {
  getProduct,
  getProducts,
  createProduct,
  deleteProduct,
};
