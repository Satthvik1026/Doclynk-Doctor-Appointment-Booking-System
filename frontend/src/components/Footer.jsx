import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();

    return (
        <div className='md:mx-10 mt-16'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-10 text-sm'>
                {/*--------left sections------- */}
                <div>
                    <img className='mb-5 w-40' src={assets.logo} alt="" />
                    <p className='w-full md:w-2/3 text-gray-600 leading-6 text-justify'>
                        Doclynk is a convenient doctor appointment booking system designed to connect patients with healthcare professionals easily. It simplifies scheduling, helps manage appointments efficiently, and makes healthcare access more organized and reliable.
                    </p>
                </div>

                {/*--------center sections------- */}
                <div>
                    <p className='text-xl font-medium mb-5 mt-3'>
                        COMPANY
                    </p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li
                            onClick={() => {
                                navigate('/')
                                window.scrollTo(0, 0)
                            }}
                        >Home</li>

                        <li
                            onClick={() => {
                                navigate('/about')
                                window.scrollTo(0, 0)
                            }}
                        >About</li>

                        <li
                            onClick={() => {
                                navigate('/contact')
                                window.scrollTo(0, 0)
                            }}
                        >Contact us</li>

                        <li
                            onClick={() => {
                                navigate('/privacy-policy')
                                window.scrollTo(0, 0)
                            }}
                        >Privacy policy</li>
                    </ul>

                </div>

                {/*--------right sections------- */}
                <div>
                    <p className='text-xl font-medium mb-5 mt-3'>
                        GET IN TOUCH
                    </p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>+1-123-456-7890</li>
                        <li>satthvik1026@gmail.com</li>
                    </ul>
                </div>
            </div>
            {/*----------copyright text---------*/}
            <div className='py-4'>
                <hr className='mb-2' />
                <p className='text-center text-sm text-gray-600'>
                    © 2025 Doclynk. All rights reserved.

                </p>
            </div>
        </div>
    )
}

export default Footer