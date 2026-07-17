const express = require("express");
const cors = require("cors");

const healthRoutes = require("./routes/health.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");

const errorHandler = require("./middleware/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", healthRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/products", productRoutes);

app.use(errorHandler);

module.exports = app;
