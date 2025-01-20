import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    shippingAddress: {
      address: String,
      city: String,
      country: String,
    },
    paymentMethod: String,
    shippingPrice: Number,
    totalPrice: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
const Order = mongoose.model("Order", orderSchema);
export default Order;
