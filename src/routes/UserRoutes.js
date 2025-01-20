import express from "express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { getProfile, updateProfile } from "../controllers/UserController.js";
import protect from "../middleware/Protect.js";
const router = express.Router();

router.get("/profile", verifySession(), protect, getProfile);
router.post("/profile", verifySession(), protect, updateProfile);

export default router;
