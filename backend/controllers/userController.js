import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'; // Ensure this import is correct
// import Stripe from 'stripe'

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//     apiVersion: '2022-11-15', // Use a recent stable API version
// });


// API to register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !password || !email) {
            return res.json({ success: false, message: "Missing details" })
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "User with this email already exists." });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a valid email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Enter a strong password (min 8 characters)" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid Credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to update user profile data
const updateProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const { name, phone, address, dob, gender } = req.body;
        const imageFile = req.file;

        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Data Missing" });
        }

        let parsedAddress;
        try {
            parsedAddress = JSON.parse(address);
        } catch (parseError) {
            return res.json({ success: false, message: "Invalid address format" });
        }

        await userModel.findByIdAndUpdate(userId, { name, phone, address: parsedAddress, dob, gender });

        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
            const imageURL = imageUpload.secure_url;
            await userModel.findByIdAndUpdate(userId, { image: imageURL });
        }

        res.json({ success: true, message: "Profile updated successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to get user profile data
const getProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const userData = await userModel.findById(userId).select('-password');
        if (!userData) {
            return res.json({ success: false, message: "User profile not found." });
        }
        res.json({ success: true, userData });
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to book appointment
const bookAppointment = async (req, res) => {
    try {
        const userId = req.userId;
        const { docId, slotDate, slotTime } = req.body;

        if (!userId || !docId || !slotDate || !slotTime) {
            return res.json({ success: false, message: "Missing required booking details." });
        }

        // FIX: Moved docData fetch to the top of the logic block
        const docData = await doctorModel.findById(docId).select('-password');

        if (!docData) {
            return res.json({ success: false, message: "Doctor with the provided ID not found." });
        }

        // FIX: Uses 'available' assuming the typo in doctorModel.js has been corrected
        if (!docData.available) {
            return res.json({ success: false, message: "Doctor is not available for booking." });
        }

        let slots_booked = docData.slots_booked || {};

        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: "Selected slot is already booked." });
            } else {
                slots_booked[slotDate].push(slotTime);
            }
        } else {
            slots_booked[slotDate] = [slotTime];
        }

        const userData = await userModel.findById(userId).select('-password');
        if (!userData) {
            return res.json({ success: false, message: "User data not found for booking." });
        }

        const docDataForAppointment = {
            _id: docData._id,
            name: docData.name,
            email: docData.email,
            image: docData.image,
            speciality: docData.speciality,
            experience: docData.experience,
            degree: docData.degree,
            about: docData.about,
            fees: docData.fees,
            address: docData.address,
        };

        const appointmentData = {
            userId: userId,
            docId: docId,
            userData: {
                _id: userData._id,
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
            },
            docData: docDataForAppointment,
            amount: docData.fees,
            slotDate,
            slotTime,
            date: Date.now(),
        };

        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        res.json({ success: true, message: "Appointment booked successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to get user appointments for frontend my-appointments page
const listAppointment = async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.json({ success: false, message: "Authentication required to list appointments." });
        }

        const appointments = await appointmentModel.find({ userId });

        res.json({ success: true, appointments });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const cancelAppointment = async (req, res) => {
    try {
        const userId = req.userId;
        const { appointmentId } = req.body;

        if (!userId || !appointmentId) {
            return res.json({ success: false, message: "Missing required details for cancellation." });
        }

        const appointmentData = await appointmentModel.findById(appointmentId);

        if (!appointmentData) {
            return res.json({ success: false, message: "Appointment not found." });
        }

        if (appointmentData.userId.toString() !== userId.toString()) {
            return res.json({ success: false, message: "Unauthorized action to cancel this appointment." });
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        const { docId, slotDate, slotTime } = appointmentData;
        const doctorData = await doctorModel.findById(docId);

        if (doctorData && doctorData.slots_booked && doctorData.slots_booked[slotDate]) {
            let slots_booked = doctorData.slots_booked;
            slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);

            await doctorModel.findByIdAndUpdate(docId, { slots_booked });
        } else {
            console.warn(`[Cancellation Warning] Doctor or slot data missing/invalid for slot release: DocID=${docId}, Date=${slotDate}, Time=${slotTime}. Proceeding with appointment cancellation.`);
        }

        res.json({ success: true, message: "Appointment cancelled successfully." });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to create a Stripe Payment Intent
// const createPaymentIntent = async (req, res) => {
//     try {
//         const { appointmentId } = req.body; // You can also send amount from frontend but verify on backend

//         const appointmentData = await appointmentModel.findById(appointmentId);

//         if (!appointmentData) {
//             return res.json({ success: false, message: "Appointment not found." });
//         }
//         if (appointmentData.cancelled) {
//             return res.json({ success: false, message: "Appointment is cancelled." });
//         }
//         if (appointmentData.payment) { // Assuming 'payment' field indicates if it's paid
//             return res.json({ success: false, message: "Appointment already paid." });
//         }

//         const amountInCents = Math.round(appointmentData.amount * 100); // Stripe requires amount in cents/lowest currency unit

//         if (amountInCents <= 0) {
//             return res.json({ success: false, message: "Payment amount must be greater than zero." });
//         }

//         const paymentIntent = await stripe.paymentIntents.create({
//             amount: amountInCents,
//             currency: process.env.CURRENCY || 'inr', // Use your desired currency, e.g., 'inr' for India
//             metadata: {
//                 appointmentId: appointmentId.toString(), // Attach metadata for later reference
//                 userId: req.userId.toString(), // User ID from auth middleware
//                 docId: appointmentData.docId.toString()
//             },

//             automatic_payment_methods: { enabled: true },
//         });

//         res.json({
//             success: true,
//             clientSecret: paymentIntent.client_secret, // Send client_secret to frontend
//             amount: paymentIntent.amount,
//             currency: paymentIntent.currency,
//         });

//     } catch (error) {
//         console.log("Error creating Stripe Payment Intent:", error);
//         res.json({ success: false, message: "Failed to create payment intent: " + error.message });
//     }
// };

// const confirmPaymentStatus = async (req, res) => {
//     try {
//         const { paymentIntentId, appointmentId } = req.body;
//         const userId = req.userId; // From auth middleware

//         if (!paymentIntentId || !appointmentId || !userId) {
//             return res.json({ success: false, message: "Missing required data for payment confirmation." });
//         }

//         const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

//         // Verify the payment intent actually belongs to this appointment/user (optional but recommended)
//         if (paymentIntent.metadata.appointmentId !== appointmentId.toString() || paymentIntent.metadata.userId !== userId.toString()) {
//             return res.json({ success: false, message: "Payment Intent mismatch." });
//         }

//         if (paymentIntent.status === 'succeeded') {
//             await appointmentModel.findByIdAndUpdate(appointmentId, { payment: true });
//             return res.json({ success: true, message: "Payment confirmed and appointment updated!" });
//         } else {
//             // Handle other statuses like 'requires_payment_method', 'requires_confirmation', 'requires_action'
//             return res.json({ success: false, message: `Payment not succeeded. Current status: ${paymentIntent.status}` });
//         }

//     } catch (error) {
//         console.log("Error confirming payment status:", error);
//         res.json({ success: false, message: "Error in payment confirmation process: " + error.message });
//     }
// };

export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment };