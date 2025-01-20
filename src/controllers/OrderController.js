import Order from "../models/OrderModel.js";
import User from "../models/UserModel.js";
import Product from "../models/ProductModel.js";
export const createOrder = async (req, res) => {
  const sessionId = req.session.getUserId();
  const user = await User.findOne({ superTokenId: sessionId });
  const { details } = req.body;
  const purchasedItemsIds = details.items_IDs.split(",");
  Product.updateMany(
    { _id: { $in: purchasedItemsIds } },
    { $inc: { stock: -1 } }, //decrement stock by 1
    { multi: true },
    function (err, result) {
      if (err) {
        console.log(err);
      }
    }
  );
  const order = await Order.create({
    orderItems: purchasedItemsIds,
    shippingAddress: `${user.country}, ${user.city}, ${user.address} `,
    paymentMethod: details.paymentMethod || "paymentMethod",
    shippingPrice: details.shippingPrice,
    totalPrice: details.totalPrice,
    user: user._id,
  });
};

export const getAllOrders = async (req, res) => {
  //get current user
  const sessionId = req.session.getUserId();
  const user = await User.findOne({ superTokenId: sessionId });
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const orders = await Order.find({ user: user._id }).populate("orderItems");

  res.json(orders);
};
