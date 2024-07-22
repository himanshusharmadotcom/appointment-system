import express from 'express'
import { createAppointment, getAppointments, confirmAppointment } from "../controllers/appointmentController.js"
import auth from "../middleware/authMiddleware.js"

const router = express.Router();

router.post('/', auth, createAppointment);
router.get('/', auth, getAppointments);
router.put('/confirm/:id', auth, confirmAppointment);

export default router
