import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets_admin/assets'

const DoctorAppointments = () => {
    const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext)
    const { calculateAge, slotDateFormat, currency } = useContext(AdminContext)

    useEffect(() => {
        if (dToken) {

            getAppointments()

        }
    }, [dToken])
    console.log("Appointments from context:", appointments);


    return (
        <div className='w-full max-w-6xl m-5'>
            <p className='mb-3 text-lg font-medium'>My Appointments</p>
            <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
                <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_1fr_2fr_1fr_1fr] py-3 px-6 border-b font-medium'>
                    <p>#</p>
                    <p>Patient</p>
                    <p>Payment</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Fees</p>
                    <p>Actions</p>
                </div>
                {appointments.length === 0 ? (
                    <div className="p-6 text-center text-gray-400">No appointments found</div>
                ) : (
                    appointments.map((item, index) => (
                        <div
                            key={index}
                            className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_1fr_2fr_1fr_1fr] items-center text-gray-600 py-3 px-6 border-b hover:bg-gray-50'
                        >
                            <p className='max-sm:hidden'>{index + 1}</p>
                            <div className='flex items-center gap-2'>
                                <img className='w-8 h-8 rounded-full object-cover' src={item.userData?.image || ''} alt='' />
                                <p>{item.userData?.name || 'N/A'}</p>
                            </div>
                            <p>{item.payment ? 'Online' : 'Cash'}</p>
                            <p>{item.userData?.dob ? calculateAge(item.userData.dob) : 'N/A'}</p>
                            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
                            <p>{currency}{item.amount}</p>
                            <div className='flex gap-2'>
                                <img
                                    onClick={() => cancelAppointment(item._id)}
                                    className='w-6 h-6 cursor-pointer'
                                    src={assets.cancel_icon}
                                    alt='Cancel'
                                    title="Cancel"
                                />
                                <img
                                    onClick={() => completeAppointment(item._id)}
                                    className='w-6 h-6 cursor-pointer'
                                    src={assets.tick_icon}
                                    alt='Complete'
                                    title="Complete"
                                />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default DoctorAppointments
