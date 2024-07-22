import express from 'express'
import { getProfile, updateProfile, deleteProfile, getTeachers } from "../controllers/userController.js"
import auth from "../middleware/authMiddleware.js"

const router = express.Router();

router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);
router.delete('/profile', auth, deleteProfile);
router.get('/teachers', auth, getTeachers);

export default router