require("dotenv").config();

const mongoose =
  require("mongoose");

const Product =
  require("../models/Product");

const categories = [
  "Electronics",
  "Books",
  "Fashion",
  "Sports",
  "Home",
];

function randomPrice() {
  return (
    Math.random() * 1000
  ).toFixed(2);
}

async function seed() {
  await mongoose.connect(
    process.env.MONGO_URI
  );

  console.log(
    "Connected to MongoDB"
  );

  const BATCH = 5000;

  for (
    let i = 0;
    i < 200000;
    i += BATCH
  ) {
    const docs = [];

    for (
      let j = 0;
      j < BATCH;
      j++
    ) {
      docs.push({
        name: `Product ${
          i + j
        }`,

        category:
          categories[
            Math.floor(
              Math.random() *
                categories.length
            )
          ],

        price: Number(
          randomPrice()
        ),
      });
    }

    await Product.insertMany(
      docs
    );

    console.log(
      `${i + BATCH} inserted`
    );
  }

  process.exit();
}

seed();