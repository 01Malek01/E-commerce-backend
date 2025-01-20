import express from "express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import {
  addToCart,
  clearCart,
  getAllProducts,
  getCart,
  getProductById,
  removeFromCart,
} from "../controllers/ProductController.js";
import protect from "../middleware/Protect.js";

const router = express.Router();

router.get("/", getAllProducts);

router.post("/:productId/add-to-cart", verifySession(), protect, addToCart);
router.delete(
  "/:productId/remove-from-cart",
  verifySession(),
  protect,
  removeFromCart
);
router.delete("/clear-cart", verifySession(), protect, clearCart);
router.get("/cart", verifySession(), protect, getCart);
router.get("/:productId", verifySession(), protect, getProductById);
export default router;
