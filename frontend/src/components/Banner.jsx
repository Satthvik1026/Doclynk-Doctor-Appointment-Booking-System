import React from 'react';
import { assets } from '../assets/assets_frontend/assets';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const navigate = useNavigate();

    return (
        <div className='flex bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-600 rounded-2xl px-6 md:px-14 lg:px-12 my-20'>
            {/* ---------Left side-------*/}
            <div className='flex-1 py-10 sm:py-16 lg:py-24 flex flex-col justify-center'>
                <div className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight'>
                    <p>Book an Appointment</p>
                    <p className='mt-2'>With 100+ Trusted Doctors</p>
                </div>
                <button
                    onClick={() => { navigate('/login'); window.scrollTo(0, 0); }}
                    className='bg-white text-sm sm:text-base text-teal-600 px-8 py-3 rounded-full mt-8 w-fit font-semibold hover:scale-105 transition-transform'
                >
                    Create Account
                </button>
            </div>

            {/* ---------Right side-------*/}
            <div className='hidden md:block md:w-1/2 lg:w-[400px] relative'>
                <img className='w-full absolute bottom-0 right-0' src={assets.appointment_img2} alt="Doctor with clipboard" />
            </div>
        </div>
    );
};

export default Banner;