import User from "../models/UserModel.js";
import Product from "../models/ProductModel.js";
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    if (!products) {
      return res.status(404).json({ message: "No products found" });
    }
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const addToCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const sessionId = req.session.getUserId();
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const user = await User.findOne({ superTokenId: sessionId });
    user.cart.push(productId);
    await user.save();
    res.json({ message: "Product added to cart", product: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getCart = async (req, res) => {
  try {
    const sessionId = req.session.getUserId();
    const user = await User.findOne({ superTokenId: sessionId });
    let cart;
    //find products whose id is in the user's cart
    if (user && user.cart.length > 0) {
      cart = await Product.find({ _id: { $in: user.cart } });
    }
    if (!user) {
      return res.status(401).json({ message: "You are not logged in" });
    }
    // if (!cart) {
    //   return res
    //     .status(404)
    //     .json({ message: "Cart is empty or products not found" });
    // }

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const sessionId = req.session.getUserId();
    const user = await User.findOne({ superTokenId: sessionId });
    user.cart = user.cart.filter(
      (item) => item._id.toString() !== productId.toString()
    );
    await user.save();
    res.json({ message: "Product removed from cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const clearCart = async (req, res) => {
  try {
    const sessionId = req.session.getUserId();
    const user = await User.findOne({ superTokenId: sessionId });
    user.cart = [];
    await user.save();
    res.json({ message: "Cart cleared" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
