import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0, // Ensure price is not negative
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    trim: true,
  },
  images: [
    {
      type: String, // URLs of product images
      required: true,
    },
  ],
  stock: {
    type: Number,
    required: true,
    min: 0, // Ensure stock is not negative
  },
  ratings: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
