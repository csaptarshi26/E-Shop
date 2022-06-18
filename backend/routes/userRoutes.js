import express from "express";
import { authUser, deleteUser, getUserById, getUserProfile, getUsers, registerUser, updateUser, updateUserProfile } from "../controllers/userController.js";
import { isAdmin, protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post('/login', authUser)
router.route('/').post(registerUser).get(protect, isAdmin, getUsers)
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router.route('/:id')
  .delete(protect, isAdmin, deleteUser)
  .get(protect, isAdmin, getUserById)
  .put(protect, isAdmin, updateUser)

export default router;