import express from 'express'
import { bookAppointment, getProfile, listAppointment, loginUser, registerUser, updateProfile, cancelAppointment } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'


const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

userRouter.get('/get-profile', authUser, getProfile)
userRouter.post('/update-profile', upload.single('image'), authUser, updateProfile)
userRouter.post('/book-appointment', authUser, bookAppointment)
userRouter.get('/appointments', authUser, listAppointment)
userRouter.post('/cancel-appointment', authUser, cancelAppointment)
// userRouter.post('/create-payment-intent', authUser, createPaymentIntent); // Endpoint to create PaymentIntent
// userRouter.post('/confirm-payment-status', authUser, confirmPaymentStatus); // Endpoint to confirm payment on backend

// userRouter.post('/payment-gateway')

export default userRouter