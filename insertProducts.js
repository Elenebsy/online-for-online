require("dotenv").config();
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcryptjs");

const Product = require("./models/productModel"); // Adjust path as needed
const Category = require("./models/categoryModel");
const SubCategory = require("./models/subCategoryModel");
const Brand = require("./models/brandModel");
const Coupon = require("./models/couponModel");
const Review = require("./models/reviewModel");
const User = require("./models/userModel");

mongoose
  .connect(
    "mongodb+srv://bdalkhalqbdalrhym06:XwkwrbrcioeABGsN@cluster0.oqgoz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Database Connected"))
  .catch((err) => console.error("DB Connection Error:", err));

const generateProducts = async (count = 100) => {
  const categories = await Category.find().select("_id"); // Fetch existing categories
  const subCategories = await SubCategory.find().select("_id"); // Fetch existing subcategories
  const brands = await Brand.find().select("_id"); // Fetch existing brands
  let products = [];
  for (let i = 0; i < count; i++) {
    products.push({
      name: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      slug: faker.lorem.slug(),
      quantity: faker.number.int({ min: 1, max: 500 }),
      sold: faker.number.int({ min: 0, max: 100 }),
      price: faker.number.float({ min: 10, max: 2000, precision: 0.01 }),
      priceAfterDiscount: faker.number.float({
        min: 5,
        max: 1999,
        precision: 0.01,
      }),
      colors: [faker.color.human()],
      imageCover: faker.image.urlLoremFlickr({ category: "products" }),
      images: [faker.image.urlLoremFlickr({ category: "products" })],
      category_id:
        categories[Math.floor(Math.random() * categories.length)]._id, // Replace with real category IDs
      subCategory_id:
        subCategories[Math.floor(Math.random() * categories.length)]._id, // Replace with real subcategory IDs
      brand_id: brands[Math.floor(Math.random() * categories.length)]._id, // Replace with real brand IDs
      ratingsAverage: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
      ratingsQuantity: faker.number.int({ min: 0, max: 1000 }),
    });
  }
  return products;
};
const generateBrands = (count = 100) => {
  let brands = [];
  for (let i = 0; i < count; i++) {
    brands.push({
      name: faker.company.name().substring(0, 31), // Generates random company names
      slug: faker.lorem.slug(),
      image: faker.image.avatar(), // Generates random image URLs
    });
  }
  return brands;
};

const generateCategories = (count = 50) => {
  let categories = [];
  for (let i = 0; i < count; i++) {
    categories.push({
      name: faker.commerce.department(), // Generates random category names
      slug: faker.lorem.slug(),
      image: faker.image.urlLoremFlickr({ category: "abstract" }), // Generates random image URLs
    });
  }
  return categories;
};

// Generate Fake SubCategories
const generateSubCategories = async (count = 50) => {
  const categories = await Category.find().select("_id");

  if (!categories.length) {
    console.error("❌ No categories found! Cannot insert subcategories.");
    process.exit(1);
  }

  let subCategories = [];
  let usedNames = new Set();

  while (usedNames.size < count) {
    let name = faker.commerce.productName();
    if (!usedNames.has(name)) {
      usedNames.add(name);
    }
  }

  const uniqueNames = Array.from(usedNames);

  for (let i = 0; i < count; i++) {
    let category =
      categories[Math.floor(Math.random() * categories.length)]._id;

    subCategories.push({
      name: uniqueNames[i],
      slug: faker.lorem.slug(),
      category,
    });
  }

  return subCategories;
};

// Generate Fake Coupon Data
const generateCoupons = (count = 50) => {
  let coupons = [];
  for (let i = 0; i < count; i++) {
    coupons.push({
      name: faker.string.alphanumeric(10).toUpperCase(), // Generates random coupon codes
      expire: faker.date.future(), // Random future expiration date
      discount: faker.number.int({ min: 5, max: 50 }), // Discount between 5% and 50%
    });
  }
  return coupons;
};
// Generate Fake Reviews
const generateReviews = async (count = 100) => {
  const users = await User.find().select("_id"); // Fetch existing users
  const products = await Product.find().select("_id"); // Fetch existing products

  if (!users.length || !products.length) {
    console.error(
      "❌ No users or products found! Add users and products before running this script."
    );
    process.exit(1);
  }

  let reviews = [];
  for (let i = 0; i < count; i++) {
    reviews.push({
      title: faker.lorem.sentence(), // Generates random review title
      ratings: faker.number.float({ min: 1, max: 5, precision: 0.1 }), // Random rating between 1 and 5
      user: users[Math.floor(Math.random() * users.length)]._id, // Assign a random user
      product: products[Math.floor(Math.random() * products.length)]._id, // Assign a random product
    });
  }
  return reviews;
};

const generateUsers = async (count = 50) => {
  let users = [];
  for (let i = 0; i < count; i++) {
    const password = await bcrypt.hash("password123", 10); // Encrypt password
    users.push({
      name: faker.person.fullName(), // Generates a realistic full name
      slug: faker.lorem.slug(),
      email: faker.internet.email().toLowerCase(), // Generates a unique email
      phone: faker.phone.number("+1-###-###-####"), // Random phone number
      profileImg: faker.image.avatar(), // Generates a random profile image
      password: password, // Hashed password
      wishlist: [], // Empty wishlist for now
    });
  }
  return users;
};

const insertData = async () => {
  try {
    await Category.insertMany(generateCategories());
    await SubCategory.insertMany(await generateSubCategories());
    console.log("✅ SubCategories Inserted");
    await Brand.insertMany(generateBrands());
    await Coupon.insertMany(generateCoupons());
    await User.insertMany(await generateUsers());
    await Product.insertMany(await generateProducts());
    await Review.insertMany(await generateReviews());

    console.log("✅ 1000 Products Inserted Successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error Inserting Data:", error);
  }
};

insertData();
