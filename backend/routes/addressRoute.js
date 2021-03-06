import express from "express";
import { createMyAddress, deleteAddress, getMyAddress, getMyAddressById } from "../controllers/addressController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route('/:id').get(protect, getMyAddressById).delete(protect,deleteAddress);

router.route('/')
  .get(protect, getMyAddress)
  .post(protect, createMyAddress)

export default router;