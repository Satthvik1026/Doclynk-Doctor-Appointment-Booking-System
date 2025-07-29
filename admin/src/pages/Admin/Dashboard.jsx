import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets_admin/assets'
import { toast } from 'react-toastify'

const Dashboard = () => {
    const {
        aToken,
        getDashData,
        cancelAppointment,
        dashData
    } = useContext(AdminContext)

    useEffect(() => {
        if (aToken) {
            getDashData()
        }
    }, [aToken])


    return dashData && (
        <div className='m-5'>
            {/* Dashboard Summary */}
            <div className='flex flex-wrap gap-3'>
                <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                    <img className='w-14' src={assets.doctor_icon} alt="Doctors" />
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>{dashData.doctors}</p>
                        <p className='text-gray-400'>Doctors</p>
                    </div>
                </div>

                <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                    <img className='w-14' src={assets.appointment_icon} alt="Appointments" />
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
                        <p className='text-gray-400'>Appointments</p>
                    </div>
                </div>

                <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                    <img className='w-14' src={assets.patients_icon} alt="Patients" />
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
                        <p className='text-gray-400'>Patients</p>
                    </div>
                </div>
            </div>

            {/* Latest Bookings */}
            <div className='bg-white mt-10 rounded'>
                <div className='flex items-center gap-2.5 px-4 py-4 rounded-t border-b'>
                    <img src={assets.list_icon} alt="List" />
                    <p className='font-semibold'>Latest Bookings</p>
                </div>

                <div className='p-4 flex flex-col gap-4'>
                    {dashData.latestAppointments.length === 0 ? (
                        <p className='text-gray-400'>No recent bookings.</p>
                    ) : (
                        dashData.latestAppointments.map((item, index) => (
                            <div
                                key={index}
                                className='flex justify-between items-center bg-gray-50 p-3 rounded shadow-sm border hover:shadow-md transition-all'
                            >
                                <div className='flex items-center gap-4'>
                                    <img
                                        className='w-16 h-16 object-cover rounded-full'
                                        src={item.docData.image}
                                        alt="Doctor"
                                    />
                                    <div>
                                        <p className='font-medium text-gray-700'>{item.docData.name}</p>
                                        <p className='text-sm text-gray-500'>Patient: {item.userData.name}</p>
                                        <p className='text-sm text-gray-500'>
                                            {item.slotDate} | {item.slotTime}
                                        </p>
                                    </div>
                                </div>

                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
