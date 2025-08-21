import React from 'react'
import { useContext, useEffect, useCallback } from 'react' // FIX: Import useCallback
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets_admin/assets'
import { AppContext } from '../../context/AppContext'

const DoctorDashboard = () => {
    const { dToken, dashData, getDashData } = useContext(DoctorContext)
    const { currencySymbol, slotDateFormat } = useContext(AppContext)


    const fetchDashboardData = useCallback(() => {
        if (dToken) {
            getDashData();
        }
    }, [dToken, getDashData]);


    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    return dashData && (
        <div className='mt-5 ml-5'>
            <div className='flex flex-wrap gap-3'>
                <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                    <img className='w-14' src={assets.earning_icon} alt="Earnings Icon" />
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>{currencySymbol} {dashData.earnings}</p>
                        <p className='text-gray-400'>Earnings</p>
                    </div>
                </div>

                <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                    <img className='w-14' src={assets.appointment_icon} alt="Appointments Icon" />
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
                        <p className='text-gray-400'>Appointments</p>
                    </div>
                </div>

                <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                    <img className='w-14' src={assets.patients_icon} alt="Patients Icon" />
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
                        <p className='text-gray-400'>Patients</p>
                    </div>
                </div>
            </div>
            <div className='bg-white mt-10 rounded'>
                <div className='flex items-center gap-2.5 px-4 py-4 rounded-t border-b'>
                    <img src={assets.list_icon} alt="List Icon" />
                    <p className='font-semibold'>Latest Bookings</p>
                </div>

                <div className='p-4 flex flex-col gap-4'>
                    {dashData.latestAppointments.length === 0 ? (
                        <p className='text-gray-400'>No recent bookings.</p>
                    ) : (
                        dashData.latestAppointments.map((item) => (
                            <div
                                key={item._id}
                                className='flex justify-between items-center bg-gray-50 p-3 rounded shadow-sm border hover:shadow-md transition-all'
                            >
                                <div className='flex items-center gap-4'>
                                    <img
                                        className='w-16 h-16 object-cover rounded-full'
                                        src={item.docData.image}
                                        alt="Doctor"
                                    />
                                    <div>
                                        <p className='font-medium text-gray-700'>{item.userData.name}</p>
                                        <p className='text-sm text-gray-500'>
                                            {slotDateFormat(item.slotDate)} | {item.slotTime}
                                        </p>
                                        <p className='text-sm text-gray-500 font-medium'>
                                            Fee: {currencySymbol} {item.amount}
                                        </p>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-1 items-end text-sm'>
                                    {item.isCompleted ? (
                                        <span className='font-semibold text-green-500'>Completed</span>
                                    ) : item.cancelled ? (
                                        <span className='font-semibold text-red-500'>Cancelled</span>
                                    ) : (
                                        <span className='font-semibold text-blue-500'>Upcoming</span>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default DoctorDashboard;