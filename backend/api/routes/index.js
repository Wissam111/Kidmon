const usersRoutes = require("./users");
const productRoutes = require("./products");
const activitiesRoutes = require("./activities");
const authRoutes = require("./auth");
const swaggerUI = require("swagger-ui-express");
const docs = require("../docs");
const { Router } = require("express");
const { errors } = require("celebrate");
const { useSwaggerMiddlewares } = require("../swagger");

module.exports = async () => {
  const router = Router();
  
  router.use("/users", usersRoutes);
  router.use("/products", productRoutes);
  router.use("/activities", activitiesRoutes);
  router.use("/auth", authRoutes);
  // router.use("/docs", swaggerUI.serve, swaggerUI.setup(docs));
  router.use("/docs", await useSwaggerMiddlewares())

  router.use(errors());
  return router;
};
