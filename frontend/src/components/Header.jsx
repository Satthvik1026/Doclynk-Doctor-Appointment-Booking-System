import React from 'react';
import { assets } from '../assets/assets_frontend/assets';

const Header = () => {
    return (
        <div className='flex flex-col md:flex-row bg-slate-200 rounded-2xl px-6 md:px-10 lg:px-20 overflow-hidden'>
            {/* ----Left side----*/}
            <div className='md:w-1/2 flex flex-col items-start justify-center gap-6 py-10 md:py-24'>
                <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent leading-tight'>
                    Book Appointments<br /> With Trusted Doctors
                </h1>
                <div className='flex items-center gap-4 text-slate-500 text-sm'>
                    <img className='w-28' src={assets.group_profiles} alt="User avatars" />
                    <p>
                        Simply browse our extensive list of trusted doctors,
                        <br className='hidden sm:block' /> schedule your appointment today.
                    </p>
                </div>
                <a href="#speciality" className='flex items-center gap-2 bg-teal-500 text-white px-8 py-3 rounded-full text-sm shadow-lg hover:bg-teal-600 hover:scale-105 transition-all duration-300'>
                    Book Appointment <img className='w-3' src={assets.arrow_icon} alt="arrow" />
                </a>
            </div>

            {/* ----Right side----*/}
            <div className='md:w-1/2 flex items-end justify-center'>
                <img className='w-full h-auto' src={assets.header_img2} alt="Doctors" />
            </div>
        </div>
    );
};

export default Header;