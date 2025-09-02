import { createContext, useState } from "react"
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from "react"

export const AdminContext = createContext()

export const AdminContextProvider = (props) => {
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') || '')
    const [doctors, setDoctors] = useState([])
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false)

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAllDoctors = async () => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/admin/all-doctors',
                {},
                {
                    headers: {
                        aToken
                    }
                }
            )


            if (data.success) {
                setDoctors(data.doctors)


            } else {
                console.log("API returned success: false", data)
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    const changeAvailability = async (docId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/change-availability', { docId }, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                getAllDoctors()
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getAllAppointments = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/admin/appointments', { headers: { aToken } })
            if (data.success) {
                setAppointments(data.appointments)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)

        }
    }

    // from AdminContext
    const cancelAppointment = async (appointmentId) => {
        try {
            const response = await axios.post(backendUrl + '/api/admin/cancel-appointment', { appointmentId }, { headers: { aToken } });

            if (response.data.success) {
                toast.success(response.data.message);

                await getAllAppointments();

            } else {
                toast.error(response.data.message);
                console.log("Cancellation failed as per backend message:", response.data.message); // For debugging
            }
        } catch (error) {
            console.error("Error during admin cancellation request:", error);


            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(error.message);
            }
            console.log("Admin cancellation request caught an error. Check console for details."); // For debugging
        }
    };

    const getDashData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/dashboard', { headers: { aToken } }) // Fixed await + token key
            if (data.success) {
                setDashData(data.dashData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }


    const value = {
        aToken, setAToken,
        backendUrl, doctors,
        getAllDoctors, changeAvailability,
        appointments, setAppointments,
        getAllAppointments, cancelAppointment,
        dashData, getDashData
    }


    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}
