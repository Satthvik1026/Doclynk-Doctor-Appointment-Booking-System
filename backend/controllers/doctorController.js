import doctorModel from "../models/doctorModel.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from '../models/appointmentModel.js'

const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body
        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available })
        res.json({ success: true, message: 'Availablity Changed' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email'])
        res.json({ success: true, doctors })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;

        const doctor = await doctorModel.findOne({ email });

        if (!doctor) {
            return res.json({ success: false, message: "Doctor does not exist" });
        }

        const isMatch = await bcrypt.compare(password, doctor.password);

        if (isMatch) {
            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid Credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


//API to get docotr appointments for doctor panel
const appointmentsDoctor = async (req, res) => {
    try {
        const docId = req.docId

        const appointments = await appointmentModel
            .find({ docId })
            .populate("userId", "name dob");
        res.json({ success: true, appointments })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


//API to mark appointment as completed for doctor panel
const appointmentComplete = async (req, res) => {
    try {
        const docIdFromToken = req.docId;
        const { appointmentId } = req.body;

        if (!docIdFromToken || !appointmentId) {
            return res.json({ success: false, message: "Missing required details." });
        }

        const appointmentData = await appointmentModel.findById(appointmentId);

        if (!appointmentData) {
            return res.json({ success: false, message: "Appointment not found." });
        }

        if (appointmentData.docId.toString() !== docIdFromToken.toString()) {
            return res.json({ success: false, message: "Unauthorized action." });
        }

        if (appointmentData.isCompleted) {
            return res.json({ success: false, message: "Appointment is already completed." });
        }
        if (appointmentData.cancelled) {
            return res.json({ success: false, message: "Cancelled appointment cannot be marked as completed." });
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
        res.json({ success: true, message: "Appointment marked as completed." });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

//API to cancel appointment for doctor panel
const appointmentCancel = async (req, res) => {
    try {

        const docIdFromToken = req.docId;
        const { appointmentId } = req.body;

        if (!docIdFromToken || !appointmentId) {
            return res.json({ success: false, message: "Missing required details." });
        }

        const appointmentData = await appointmentModel.findById(appointmentId);

        if (!appointmentData) {
            return res.json({ success: false, message: "Appointment not found." });
        }


        if (appointmentData.docId.toString() !== docIdFromToken.toString()) {
            return res.json({ success: false, message: "Unauthorized action." });
        }

        if (appointmentData.cancelled) {
            return res.json({ success: false, message: "Appointment is already cancelled." });
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        // Release the slot on the doctor's schedule
        const doctorData = await doctorModel.findById(docIdFromToken);
        if (doctorData && doctorData.slots_booked && doctorData.slots_booked[appointmentData.slotDate]) {
            let slots_booked = doctorData.slots_booked;
            slots_booked[appointmentData.slotDate] = slots_booked[appointmentData.slotDate].filter(e => e !== appointmentData.slotTime);
            await doctorModel.findByIdAndUpdate(docIdFromToken, { slots_booked });
        }

        res.json({ success: true, message: "Appointment cancelled." });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

//API to get dashboard data for doctor panel
const doctorDashboard = async (req, res) => {
    try {

        const docId = req.docId;

        if (!docId) {
            return res.json({ success: false, message: "Doctor ID not found in token." });
        }

        const appointments = await appointmentModel
            .find({ docId })
            .populate("userId", "name dob image") // FIX: Populate userId to get patient data
            .lean();

        let earnings = 0;
        let uniquePatientIds = new Set();

        appointments.forEach(item => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount;
            }
            uniquePatientIds.add(item.userId._id.toString());
        });

        const latestAppointments = await appointmentModel
            .find({ docId })
            .populate("userId", "name dob image")
            .sort({ date: -1 })
            .limit(5);

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: uniquePatientIds.size,
            latestAppointments
        };

        res.json({ success: true, dashData });

    } catch (error) {
        console.log("Error in doctorDashboard:", error);
        res.json({ success: false, message: error.message });
    }
}

//API to get doctor profile for Doctor panel
const doctorProfile = async (req, res) => {
    try {
        const docId = req.docId;
        if (!docId) {
            return res.json({ success: false, message: "Doctor ID not found in token." });
        }

        const profileData = await doctorModel.findById(docId).select('-password');

        if (!profileData) {
            console.log("Profile not found for docId:", docId);
            return res.json({ success: false, message: "Profile not found." });
        }

        res.json({ success: true, profileData });
    } catch (error) {
        console.log("Error in doctorProfile:", error);
        res.json({ success: false, message: error.message });
    }
}

//API to update doctor profile data from Doctor Panel
const updateDoctorProfile = async (req, res) => {
    try {
        const docId = req.docId;
        const { fees, address, available } = req.body;

        if (!docId || !fees || !address || typeof available === 'undefined') {
            return res.json({ success: false, message: "Missing required profile data." });
        }

        let parsedAddress = address;
        if (typeof address === 'string') {
            try {
                parsedAddress = JSON.parse(address);
            } catch (e) {
                return res.json({ success: false, message: "Invalid address format." });
            }
        }

        await doctorModel.findByIdAndUpdate(docId, { fees, address: parsedAddress, available });

        res.json({ success: true, message: "Profile updated successfully" });
    } catch (error) {
        console.log("Error in updateDoctorProfile:", error); // FIX: Corrected the console log message
        res.json({ success: false, message: error.message });
    }
}
export { changeAvailability, doctorList, loginDoctor, appointmentsDoctor, appointmentCancel, appointmentComplete, doctorDashboard, doctorProfile, updateDoctorProfile }