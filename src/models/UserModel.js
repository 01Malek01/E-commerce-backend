import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
  },
  address: String,
  city: String,
  country: String,
  superTokenId: String,
  password: String,
  cart: [
    {
      // Reference to the Product model
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: Number,
    },
  ],
});
const User = mongoose.model("User", userSchema);
export default User;
