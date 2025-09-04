import React from 'react';
import { specialityData } from '../assets/assets_frontend/assets';
import { Link } from 'react-router-dom';

const SpecialityMenu = () => {
    return (
        <div className='flex flex-col items-center gap-4 py-16 md:py-24 text-center' id='speciality'>
            <h2 className='text-3xl font-bold text-slate-800'>
                Find by Speciality
            </h2>
            <p className='sm:w-1/3 text-slate-500 text-sm'>
                Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
            </p>
            <div className='grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6 pt-8 w-full px-4 md:px-0'>
                {specialityData.map((item) => (
                    <Link
                        key={item.speciality}
                        onClick={() => window.scrollTo(0, 0)}
                        className='flex flex-col items-center text-center p-4 bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer'
                        to={`/doctors/${item.speciality}`}
                    >
                        <img className='w-16 sm:w-20 mb-3' src={item.image} alt={item.speciality} />
                        <p className='text-xs font-medium text-slate-700'>{item.speciality}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SpecialityMenu;