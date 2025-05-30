import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { setUserInfo } from '../../utils/ReduxStore/appSlice';
import axios from 'axios';
import { UPDATE_USER_PROFILE, UPDATE_USER_PROFILE_PICTURE } from '../../utils/constants/apiConstants';
import toast from 'react-hot-toast';
import Cookies from "js-cookie";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { FaAngleDown, FaAngleUp, FaCircleInfo, FaGithub, FaLinkedin, FaPencil } from 'react-icons/fa6';
import { USER_PROFILE_PIC_BACKEND_DIRECTORY } from '../../utils/constants/constants';
import { CgWebsite } from "react-icons/cg";
import { IoShareSocialSharp } from "react-icons/io5";

const UserProfile = () => {

    const userInfo = useSelector((store) => store.app.userInfo);
    const [showEditProfilePic, setShowEditProfilePic] = useState(false);
    const userProfilePicInput = useRef(null);
    const [userProfilePicURL, setUserProfilePicURL] = useState("");
    const [isSocialLinkOpen, setIsSocialLinkOpen] = useState(false);

    const { handleSubmit } = useForm();
    const dispatch = useDispatch();

    const saveUserProfile = async () => {
        try {
            const { data } = await axios.post(UPDATE_USER_PROFILE, userInfo);
            toast.success(data?.messageModel.statusMessage);
            if (data?.token) {
                Cookies.set("is_token", data?.token);
            }
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

    const onEditProfilePicClick = () => {
        userProfilePicInput.current?.click();
    }

    const handleUserImageChange = async (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const modifiedFile = new File([file], userInfo?.email, {
                type: file.type,
            });
            const formData = new FormData();
            formData.append("file", modifiedFile);
            formData.append("email", userInfo?.email);
            formData.append("authProvider", userInfo?.authProvider);
            formData.append("displayName", userInfo?.displayName);
            formData.append("firstName", userInfo?.firstName);
            formData.append("lastName", userInfo?.lastName);
            formData.append("phoneNumber", userInfo?.phoneNumber);
            formData.append("githubProfileURL", userInfo?.githubProfileURL);
            formData.append("linkedInProfileURL", userInfo?.linkedInProfileURL);
            formData.append("portfolioWebsiteURL", userInfo?.portfolioWebsiteURL);
            try {
                const { data } = await axios.post(UPDATE_USER_PROFILE_PICTURE, formData);
                toast.success(data?.messageModel.statusMessage);
                if (data?.token) {
                    Cookies.set("is_token", data?.token);
                    let newUserInfo = { ...userInfo };
                    newUserInfo.profilePicURL = data?.profilePicURL
                    dispatch(setUserInfo(newUserInfo));
                }
            } catch (error) {
                toast.error(error);
            }
        }
    };

    useEffect(() => {
        if (userInfo?.profilePicURL) {
            const profilePicURL = `${userInfo.profilePicURL}?t=${new Date().getTime()}`;
            setUserProfilePicURL(profilePicURL);
        }
    }, [userInfo]);

    return (
        <div className='w-full h-screen m-8'>
            <h1 className='font-bold text-2xl'>Profile</h1>
            <div className='flex'>
                <div className='m-12 flex flex-col justify-center items-center gap-4 bg-white border-gray-800 shadow hover:shadow-2xl px-4 py-8 dark:bg-gray-800 h-48 w-68 rounded-2xl'>
                    <div className='w-24 h-24 flex justify-center items-center 
                    dark:bg-gray-500 bg-gray-300 rounded-[50%] hover:cursor-pointer'
                        onMouseEnter={() => setShowEditProfilePic(true)}
                        onMouseLeave={() => setShowEditProfilePic(false)}
                        onClick={onEditProfilePicClick}>
                        {showEditProfilePic ?
                            <div className='cursor-pointer'>
                                <FaPencil />
                            </div> :
                            <div>
                                {userProfilePicURL != "" ?
                                    <img src={userInfo?.authProvider ? userInfo?.photoURL :
                                        `${USER_PROFILE_PIC_BACKEND_DIRECTORY}${userProfilePicURL}`} alt='user-photo'
                                        className='rounded-full h-24 w-24' />
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
                                    </svg>}
                            </div>}
                    </div>
                    <div>{userInfo?.displayName}</div>
                </div>
                <div className='m-12'>

                    <form className='flex flex-col gap-4 items-center' onSubmit={handleSubmit(saveUserProfile)} encType='multipart/form-data'>
                        <input
                            type="file"
                            accept="image/*"
                            name='userProfilePic'
                            id='userProfilePic'
                            ref={userProfilePicInput}
                            onChange={handleUserImageChange}
                            className="hidden"
                        />

                        {/* Basic Info */}
                        <div className='bg-white border-gray-800 shadow rounded-lg hover:shadow-2xl px-4 py-8 dark:bg-gray-800'>
                            <div className='flex items-center gap-2'>
                                <FaCircleInfo size={32} />
                                <div className='font-semibold text-2xl text-gray-600 dark:text-white'>Basic Info</div>
                            </div>
                            <hr className='m-4' />
                            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-col-2 gap-8'>
                                <div className='form-field'>
                                    <div className='font-semibold text-gray-500 text-lg dark:text-gray-300'>First Name</div>
                                    {userInfo?.authProvider ? <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <input type='text' maxLength="25" value={userInfo?.firstName} onChange={(e) => editUserProfile("firstName", e.target.value)}
                                                    className='bg-gray-100 dark:bg-gray-700 rounded-md p-2 mt-2' disabled={userInfo?.authProvider} />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Can not edit. You logged in using Auth Provider.</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider> : <input type='text' maxLength="25" value={userInfo?.firstName} onChange={(e) => editUserProfile("firstName", e.target.value)}
                                        className='bg-gray-50 shadow border border-gray-200 dark:bg-gray-500 rounded-md p-2 mt-2 w-72' required />}
                                </div>
                                <div className='form-field'>
                                    <div className='font-semibold text-gray-500 text-lg dark:text-gray-300'>Last Name</div>
                                    {userInfo?.authProvider ? <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <input type='text' maxLength="25" value={userInfo?.lastName} onChange={(e) => editUserProfile("lastName", e.target.value)}
                                                    className='bg-gray-200 dark:bg-gray-700 rounded-md p-2 w-72 mt-2' disabled={userInfo?.authProvider} />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Can not edit. You logged in using Auth Provider.</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider> : <input type='text' maxLength="25" value={userInfo?.lastName} onChange={(e) => editUserProfile("lastName", e.target.value)}
                                        className='bg-gray-50 shadow border border-gray-200 dark:bg-gray-700 rounded-md p-2 mt-2 w-72' required />}
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-8 mt-4'>
                                <div className='form-field'>
                                    <div className='font-semibold text-gray-500 text-lg dark:text-gray-300'>Email</div>
                                    <input type='text' value={userInfo?.email}
                                        className='bg-gray-50 shadow border border-gray-200 dark:bg-gray-700 rounded-md p-2 w-72 mt-2 cursor-not-allowed' disabled />
                                </div>
                                <div className='form-field'>
                                    <div className='font-semibold text-gray-500 text-lg dark:text-gray-300'>Phone Number</div>
                                    <input type='text' value={userInfo?.phoneNumber}
                                        className='bg-gray-50 shadow border border-gray-200 dark:bg-gray-700 rounded-md p-2 w-72 mt-2 cursor-not-allowed' disabled />
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className='bg-white border-gray-800 shadow rounded-lg hover:shadow-2xl px-4 py-8 mt-8 w-full dark:bg-gray-800'>
                            <div className='flex items-center gap-2 cursor-pointer' onClick={(() => setIsSocialLinkOpen(!isSocialLinkOpen))}>
                                <IoShareSocialSharp size={32} />
                                <div className='flex justify-between items-center w-full'>
                                    <div className='font-semibold text-2xl text-gray-600 dark:text-white'>Social Links</div>
                                    {isSocialLinkOpen ? <FaAngleDown size={32} /> :
                                        <FaAngleUp size={32} />}
                                </div>
                            </div>
                            {isSocialLinkOpen && <hr className='mt-4' />}
                            {isSocialLinkOpen && <div>
                                <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-col-2 gap-8 mt-4'>
                                    <div className='form-field'>
                                        <div className='flex gap-2 items-center'>
                                            <FaGithub size={24} />
                                            <div className='font-semibold text-gray-500 text-lg dark:text-gray-300'>Github Profile</div>
                                        </div>
                                        <input type='text' value={userInfo?.githubProfileURL} onChange={(e) => editUserProfile("githubProfileURL", e.target.value)}
                                            className='bg-gray-50 shadow border border-gray-200 dark:bg-gray-700 rounded-md p-2 w-72 mt-2' />
                                    </div>
                                    <div className='form-field'>
                                        <div className='flex gap-2 items-center'>
                                            <FaLinkedin size={24} />
                                            <div className='font-semibold text-gray-500 text-lg dark:text-gray-300'>LinkedIn Profile</div>
                                        </div>
                                        <input type='text' value={userInfo?.linkedInProfileURL} onChange={(e) => editUserProfile("linkedInProfileURL", e.target.value)}
                                            className='bg-gray-50 shadow border border-gray-200 dark:bg-gray-700 rounded-md p-2 w-72 mt-2' />
                                    </div>
                                </div>
                                <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-col-2 gap-8 mt-4'>
                                    <div className='form-field'>
                                        <div className='flex gap-2 items-center'>
                                            <CgWebsite size={24} />
                                            <div className='font-semibold text-gray-500 text-lg dark:text-gray-300'>Portfolio Website</div>
                                        </div>
                                        <input type='text' value={userInfo?.portfolioWebsiteURL} onChange={(e) => editUserProfile("portfolioWebsiteURL", e.target.value)}
                                            className='bg-gray-50 shadow border border-gray-200 dark:bg-gray-700 rounded-md p-2 w-72 mt-2' />
                                    </div>
                                </div>
                            </div>}
                        </div>

                        <div>
                            {!userInfo?.authProvider && <button
                                className='bg-green-400 px-24 py-2 rounded-lg font-bold
                                hover:cursor-pointer text-white hover:bg-gray-600  dark:hover:bg-white dark:hover:text-black'>
                                Save
                            </button>}
                        </div>

                    </form>

                </div>
            </div>
        </div>
    )
}

export default UserProfile