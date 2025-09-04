import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {
    const navigate = useNavigate();
    const { doctors } = useContext(AppContext);

    return (
        <div className='flex flex-col items-center gap-4 py-16 md:py-24 bg-slate-50'>
            <h2 className='text-3xl font-bold text-slate-800'>
                Top Doctors to Book
            </h2>
            <p className='sm:w-1/3 text-center text-slate-500 text-sm'>
                Simply browse through our extensive list of trusted doctors.
            </p>
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 px-4 md:px-10'>
                {doctors.slice(-8).map((item) => (
                    <div
                        onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0); }}
                        className='bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group hover:-translate-y-2 transition-all duration-300'
                        key={item._id}
                    >
                        <div className="overflow-hidden h-56">
                            <img className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300' src={item.image} alt={item.name} />
                        </div>
                        <div className='p-5'>
                            <div className={`flex items-center gap-2 text-sm ${item.available ? 'text-teal-600' : 'text-red-500'}`}>
                                <p className={`w-2.5 h-2.5 ${item.available ? 'bg-teal-500' : 'bg-red-500'} rounded-full`}></p>
                                <p>{item.available ? 'Available' : 'Not Available'}</p>
                            </div>
                            <p className='text-slate-900 text-lg font-semibold mt-2'>{item.name}</p>
                            <p className='text-slate-500 text-sm'>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button
                onClick={() => { navigate('/doctors'); window.scrollTo(0, 0); }}
                className='border border-teal-500 text-teal-600 px-12 py-3 rounded-full mt-10 hover:bg-teal-500 hover:text-white transition-all'
            >
                View All Doctors
            </button>
        </div>
    );
};

export default TopDoctors;