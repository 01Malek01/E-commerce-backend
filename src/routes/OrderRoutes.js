import express from "express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { createOrder, getAllOrders } from "../controllers/OrderController.js";
import protect from "../middleware/Protect.js";
const router = express.Router();

router.get("/", verifySession(), protect, getAllOrders);
router.post("/", verifySession(), protect, createOrder);

export default router;
