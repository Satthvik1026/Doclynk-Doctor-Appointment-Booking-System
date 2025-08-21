import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { useEffect } from 'react'

const DoctorProfile = () => {

    const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext)
    const { currency, backendUrl } = useContext(AppContext)

    useEffect(() => {
        getProfileData()
    }, [dToken])
    return profileData && (
        <div>
            <div className='flex- flex-col gap-4 m-5'>
                <div>
                    <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg' src={profileData.image} alt="" />
                </div>

                <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
                    {/* -----------Doc Info : name, degree, experience----------- */}

                    <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profileData.name}</p>
                    <div>
                        <p>{profileData.degree} - {profileData.experience}</p>
                        <button>{profileData.experience}</button>
                    </div>

                    {/* --------Doc About------ */}
                    <div>
                        <p>About:</p>
                        <p>{profileData.about}</p>
                    </div>

                    <p>
                        Appointment fee: <span>{currency} {profileData.fees}</span>
                    </p>

                    <div>
                        <p>Address:</p>
                        <p>
                            {profileData.address.line1}
                            <br />
                            {profileData.address.line2}
                        </p>
                    </div>

                    <div>
                        <input type="checkbox" name="" id="" />
                        <label htmlFor="">Available</label>
                    </div>

                    <button>Edit</button>
                </div>
            </div>
        </div>
    )
}

export default DoctorProfile