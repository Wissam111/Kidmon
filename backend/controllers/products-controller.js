const { productService } = require("../use-cases");

const createProduct = async (req, res, next) => {
  // #swagger.tags = ['Products']
  try {
    const { title, price, category, allergicIngredients } = req.body;
    const image = req.file?.filename;
    const product = await productService.createProduct({
      allergicIngredients,
      title,
      price,
      category,
      image,
    });
    res.status(201).json({
      message: "Product created successfull",
      product,
    });
  } catch (e) {
    console.log(e);
    next(e)
  }
};

const deleteProduct = async (req, res, next) => {
  // #swagger.tags = ['Products']
  try {
    const { productId } = req.params;
    await productService.deleteProduct({ productId: productId });
    res.status(200).json({
      message: "product deleted successfully",
    });
  } catch (e) {
    console.log(e);
    next(e)
  }
};

const getProduct = async (req, res, next) => {
  // #swagger.tags = ['Products']
  try {
    const { productId } = req.params;
    const product = await productService.getProduct({ productId: productId });
    res.status(200).json({
      message: "fetching product successfully",
      product,
    });
  } catch (e) {
    console.log(e);
    next(e)
  }
};

const getProducts = async (req, res, next) => {
  // #swagger.tags = ['Products']
  try {
    const { search, sort, category } = req.query;
    const page = +req.query.page;
    const pageSize = +req.query.pageSize;

    const data = await productService.getProducts({
      page,
      pageSize,
      search,
      sort,
      category,
    });
    res.status(200).json({
      message: "fetching products successfully",
      ...data,
    });
  } catch (e) {
    console.log(e);
    next(e)
  }
};

module.exports = {
  getProduct,
  getProducts,
  createProduct,
  deleteProduct,
};
