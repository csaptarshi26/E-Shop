import express from "express";
import { createMyAddress, getMyAddress } from "../controllers/addressController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route('/')
  .get(protect, getMyAddress)
  .post(protect, createMyAddress)

export default router;