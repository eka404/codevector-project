require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const productRoutes = require("./routes/products");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.use(
  "/api/products",
  productRoutes
);

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Product Browser API"
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(
      "MongoDB Connected"
    );

    app.listen(
      process.env.PORT || 5000,
      () =>
        console.log(
          "Server Running"
        )
    );
  })
  .catch(console.error);