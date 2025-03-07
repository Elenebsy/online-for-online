const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");
const bcrypt = require("bcrypt");
require("dotenv").config();

// Import Routes
const brandRoute = require("./routes/brandRoute");
const categoryRoute = require("./routes/categoryRoute");
const subCategoryRoute = require("./routes/subCategoryRoute");
const couponRoute = require("./routes/couponRoute");
const reviewRoute = require("./routes/reviewRoute");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const cartRoute = require("./routes/cartRoute");
const orderRoute = require("./routes/orderRoute");
const wishlistRoute = require("./routes/wishlistRoute");
const authRoute = require("./routes/authRoute");

const port = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://bdalkhalqbdalrhym06:XwkwrbrcioeABGsN@cluster0.oqgoz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// App service
const app = express();

// Auto refresh for development
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

app.use(connectLivereload());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// Basic test route
app.get("/", (req, res) => {
  res.send("Hello World, from cs309");
});

//routes

app.use("/api/v1/brands", brandRoute);
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/subcategories", subCategoryRoute);
app.use("/api/v1/coupons", couponRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/carts", cartRoute);
app.use("/api/v1/orders", orderRoute);
app.use("/api/v1/wishlists", wishlistRoute);

app.use("/api/v1/auth", authRoute);
// MongoDB connection and server startup
mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
