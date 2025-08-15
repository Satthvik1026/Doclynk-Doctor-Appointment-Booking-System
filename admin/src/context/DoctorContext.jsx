import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";

export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [dToken, setDToken] = useState(localStorage.getItem('dToken') || '')
    const [appointments, setAppointments] = useState([])

    const getAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/appointments', { headers: { dToken } })
            if (data.success) {
                setAppointments(data.appointments.reverse())
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (dToken) {
            getAppointments()
        }
    }, [dToken, getAppointments])


    const completeAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/doctor/complete-appointment', { appointmentId }, { headers: { dToken } })
            if (data.success) {
                toast.success(data.message);
                getAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)

        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/doctor/cancel-appointment', { appointmentId }, { headers: { dToken } })
            if (data.success) {
                toast.success(data.message);
                getAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)

        }
    }

    const value = {
        dToken, setDToken, backendUrl, setAppointments, appointments, getAppointments, cancelAppointment, completeAppointment,
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider