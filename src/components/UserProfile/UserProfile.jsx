import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { setUserInfo } from '../../utils/ReduxStore/appSlice';
import axios from 'axios';
import { UPDATE_USER_PROFILE } from '../../utils/constants/apiConstants';
import toast from 'react-hot-toast';

const UserProfile = () => {

    const userInfo = useSelector((store) => store.app.userInfo);

    const { handleSubmit } = useForm();
    const dispatch = useDispatch();

    const saveUserProfile = async () => {
        console.log("clicked");
        try {
            const { data } = await axios.post(UPDATE_USER_PROFILE, userInfo);
            toast.success(data?.messageModel.statusMessage);
        } catch (error) {
            toast.error(error);
        }
    }

    const editUserProfile = (field, value) => {
        let userInfoObj = { ...userInfo };
        userInfoObj[field] = value;
        userInfoObj["displayName"] = userInfoObj?.firstName + " " + userInfoObj.lastName;
        dispatch(setUserInfo(userInfoObj));
    }

    return (
        <div className='w-full h-screen m-8'>
            <h1 className='font-bold text-2xl'>Profile</h1>
            <div className='flex'>
                <div className='m-12 flex flex-col justify-center items-center gap-4 w-24'>
                    {userInfo?.photoURL ? <img src={userInfo?.photoURL} alt='user-photo' className='rounded-full h-24 w-24' />
                        : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
                        </svg>}
                    <div>{userInfo?.displayName}</div>
                </div>
                <div className='m-12'>
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit(saveUserProfile)}>
                        <div className='form-field'>
                            <div>First Name</div>
                            <input type='text' value={userInfo?.firstName} onChange={(e) => editUserProfile("firstName", e.target.value)}
                                className='bg-gray-400 dark:bg-gray-700 rounded-md p-2 w-72 mt-2' />
                        </div>
                        <div className='form-field'>
                            <div>Last Name</div>
                            <input type='text' value={userInfo?.lastName} onChange={(e) => editUserProfile("lastName", e.target.value)}
                                className='bg-gray-400 dark:bg-gray-700 rounded-md p-2 w-72 mt-2' />
                        </div>
                        <div className='form-field'>
                            <div>Email</div>
                            <input type='text' value={userInfo?.email}
                                className='bg-gray-400 dark:bg-gray-700 rounded-md p-2 w-72 mt-2 cursor-not-allowed' disabled />
                        </div>
                        <div className='form-field'>
                            <div>Phone Number</div>
                            <input type='text' value={userInfo?.phoneNumber}
                                className='bg-gray-400 dark:bg-gray-700 rounded-md p-2 w-72 mt-2 cursor-not-allowed' disabled />
                        </div>
                        <div>
                            <button
                                className='bg-green-400 px-8 py-2 rounded-lg font-bold
                                hover:cursor-pointer text-white hover:bg-gray-600  dark:hover:bg-white dark:hover:text-black'>
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UserProfile