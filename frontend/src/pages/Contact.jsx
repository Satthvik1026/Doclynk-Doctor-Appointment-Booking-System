import React from 'react'
import { assets } from "../assets/assets_frontend/assets"
import { toast } from 'react-toastify'
const Contact = () => {
    return (
        <div>
            <div className='text-center text-2xl pt-10 text-gray-500'>
                <p className=''>CONTACT <span>US</span></p>
            </div>

            <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
                <img className='w-full max-w-[360px]' src={assets.contact_image} alt="" />
                <div className='flex flex-col justify-center items-start gap-6'>
                    <p className='font-semibold text-lg text-gray-600'>Our OFFICE</p>
                    <p className='text-gray-500'>54709 Sion Station <br />
                        Suite 350, Mumbai, India</p>
                    <p className='text-gray-500'>Tel: (012) 345‑6789 <br />Email: satthvik1026@gmail.com</p>
                    <p className='font-semibold text-lg text-gray-600'>Careers at DOCLYNK</p>
                    <p className='text-gray-500'>Learn more about our teams and job openings.</p>
                    <button onClick={() => toast('No jobs available now')} className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
                </div>

            </div>
        </div>
    )
}

export default Contact