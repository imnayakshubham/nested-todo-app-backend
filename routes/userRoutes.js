import express from "express";
import { register, login } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/register").post(register);
router.post("/login", login);

export default router;