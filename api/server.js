import express from 'express'
import connectDB from './config/db.js';
import cors from 'cors'
import dotenv from 'dotenv'
import userRoute from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import appointmentRoutes from './routes/appointmentRoutes.js'
import path from 'path';

dotenv.config();

const app = express();

// Connect Database
connectDB();

const __dirname = path.resolve(); // captures the absolute path of the directory where this code is being executed

// Middleware
app.use(express.json({ extended: false })); //allows the client to send and reciece data in json format
app.use(cors());

// Define Routes
app.use('/api/users', userRoute);
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
