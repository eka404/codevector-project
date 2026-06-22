const express = require("express");
const router = express.Router();

const Product =
  require("../models/Product");

router.get("/count", async (req, res) => {
  const count =
    await Product.countDocuments();

  res.json({ count });
});

router.get("/", async (req, res) => {
  try {
    const limit =
      parseInt(req.query.limit) || 20;

    const category =
      req.query.category;

    const cursor =
      req.query.cursor;

    let query = {};

    if (category) {
      query.category = category;
    }

    if (cursor) {
      const decoded =
        JSON.parse(
          Buffer.from(
            cursor,
            "base64"
          ).toString()
        );

      query.$or = [
        {
          createdAt: {
            $lt: new Date(
              decoded.createdAt
            ),
          },
        },
        {
          createdAt: new Date(
            decoded.createdAt
          ),
          _id: {
            $lt: decoded.id,
          },
        },
      ];
    }

    const products =
      await Product.find(query)
        .sort({
          createdAt: -1,
          _id: -1,
        })
        .limit(limit);

    let nextCursor = null;

    if (products.length > 0) {
      const last =
        products[
          products.length - 1
        ];

      nextCursor = Buffer.from(
        JSON.stringify({
          createdAt:
            last.createdAt,
          id: last._id,
        })
      ).toString("base64");
    }

    res.json({
      products,
      nextCursor,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;