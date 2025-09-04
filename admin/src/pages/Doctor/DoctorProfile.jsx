import React, { useState, useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorProfile = () => {
    const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext)
    const { currency } = useContext(AppContext)

    const [isEdit, setIsEdit] = useState(false)

    // A single handler for all input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === 'line1' || name === 'line2') {
            setProfileData(prev => ({
                ...prev,
                address: { ...prev.address, [name]: value }
            }));
        } else {
            setProfileData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const updateProfile = async () => {
        try {
            // We can send the whole profileData object or just the fields that can be updated.
            // Sending only the editable fields is slightly more secure.
            const updateData = {
                address: profileData.address,
                fees: profileData.fees,
                available: profileData.available
            };

            const { data } = await axios.post(`${backendUrl}/api/doctor/update-profile`, updateData, { headers: { dToken } });

            if (data.success) {
                toast.success(data.message);
                setIsEdit(false);
                getProfileData(); // Refetch data to ensure UI is in sync with the database
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred while updating.');
            console.log(error);
        }
    };

    useEffect(() => {
        if (dToken) {
            getProfileData();
        }
    }, [dToken, getProfileData]);


    return profileData && (
        <div>
            <div className='flex flex-col gap-4 m-5'>
                <div>
                    <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg' src={profileData.image} alt="Doctor Profile" />
                </div>

                <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
                    <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profileData.name}</p>
                    <div className='flex items-center gap-2 mt-1 text-gray-600'>
                        <p>{profileData.degree} - {profileData.speciality}</p>
                        <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</button>
                    </div>

                    <div>
                        <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>About:</p>
                        <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{profileData.about}</p>
                    </div>

                    <p className='text-gray-600 font-medium mt-4'>
                        Appointment fee: <span className='text-gray-800'>{currency} {isEdit ? <input className='w-20 p-1 border rounded' type="number" name="fees" onChange={handleChange} value={profileData.fees} /> : profileData.fees}</span>
                    </p>

                    <div className='flex gap-2 py-2'>
                        <p>Address:</p>
                        <p className='text-sm'>
                            {isEdit ? <input className='w-full p-1 border rounded mb-1' type="text" name="line1" onChange={handleChange} value={profileData.address.line1} /> : profileData.address.line1}
                            <br />
                            {isEdit ? <input className='w-full p-1 border rounded' type="text" name="line2" onChange={handleChange} value={profileData.address.line2} /> : profileData.address.line2}
                        </p>
                    </div>

                    <div className='flex items-center gap-2 pt-2'>
                        <input onChange={handleChange} checked={profileData.available} type="checkbox" name="available" id="available-checkbox" disabled={!isEdit} />
                        <label htmlFor="available-checkbox">Available for appointments</label>
                    </div>

                    {
                        isEdit ?
                            <button onClick={updateProfile} className='px-4 py-1 border border-primary text-sm rounded mt-5 hover:bg-primary hover:text-white transition-all'>Save</button>
                            :
                            <button onClick={() => setIsEdit(true)} className='px-4 py-1 border border-primary text-sm rounded mt-5 hover:bg-primary hover:text-white transition-all'>Edit</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default DoctorProfile;