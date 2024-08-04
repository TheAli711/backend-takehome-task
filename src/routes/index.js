const authRoutes = require("./auth.routes");
const documentRoutes = require("./document.routes");

const routes = (app) => {
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/documents", documentRoutes);
};

module.exports = routes;
