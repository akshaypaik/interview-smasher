import React from 'react';
import './Profile.css';
import { useDispatch, useSelector } from 'react-redux';
import { toggleShowAvatarDetails, updateShowLoginSidebar } from '../../../utils/ReduxStore/appSlice';
import AvatarMenu from './AvatarMenu/AvatarMenu';
import DarkModeIcon from './DarkModeIcon/DarkModeIcon';
import { USER_PROFILE_PIC_BACKEND_DIRECTORY } from '../../../utils/constants/constants';

const Profile = () => {

    const userInfo = useSelector((store) => store.app.userInfo);
    const showAvatarDetails = useSelector((store) => store.app.showAvatarDetails);
    const dispatch = useDispatch();

    const handleLoginClick = () => {
        dispatch(updateShowLoginSidebar(true));
    }

    const handleAvatarClick = () => {
        dispatch(toggleShowAvatarDetails(true));
    }

    return (
        <div className='profile-container'>
            {!userInfo?.email && <button className='profile-login-btn' onClick={handleLoginClick}>
                <svg className="group-hover:fill-color-2"
                    viewBox="6 0 12 24" height="18" width="18" fill="white">
                    <path d="M11.9923172,11.2463768 C8.81761115,11.2463768 6.24400341,8.72878961 6.24400341,5.62318841 C6.24400341,2.5175872 8.81761115,0 11.9923172,0 C15.1670232,0 17.740631,2.5175872 17.740631,5.62318841 C17.740631,8.72878961 15.1670232,11.2463768 11.9923172,11.2463768 Z M11.9923172,9.27536232 C14.0542397,9.27536232 15.7257581,7.64022836 15.7257581,5.62318841 C15.7257581,3.60614845 14.0542397,1.97101449 11.9923172,1.97101449 C9.93039471,1.97101449 8.25887628,3.60614845 8.25887628,5.62318841 C8.25887628,7.64022836 9.93039471,9.27536232 11.9923172,9.27536232 Z M24,24 L0,24 L1.21786143,19.7101449 L2.38352552,15.6939891 C2.85911209,14.0398226 4.59284263,12.7536232 6.3530098,12.7536232 L17.6316246,12.7536232 C19.3874139,12.7536232 21.1256928,14.0404157 21.6011089,15.6939891 L22.9903494,20.5259906 C23.0204168,20.63057 23.0450458,20.7352884 23.0641579,20.8398867 L24,24 Z M21.1127477,21.3339312 L21.0851024,21.2122487 C21.0772161,21.1630075 21.0658093,21.1120821 21.0507301,21.0596341 L19.6614896,16.2276325 C19.4305871,15.4245164 18.4851476,14.7246377 17.6316246,14.7246377 L6.3530098,14.7246377 C5.4959645,14.7246377 4.55444948,15.4231177 4.32314478,16.2276325 L2.75521062,21.6811594 L2.65068631,22.0289855 L21.3185825,22.0289855 L21.1127477,21.3339312 Z"></path>
                </svg>
                <span>Log In</span>
            </button>}
            {userInfo?.email && <div>
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24"
                    fill="currentColor" className="mercado-match" width="24" height="28" focusable="false">
                    <path d="M22 19.24a3.46 3.46 0 01-.09.78l-.22 1-6.76-1.51A2.16 2.16 0 0115 20a2 2 0 11-3.53-1.28L2 16.62l.22-1A4.45 4.45 0 014 13.12l1.22-.93 15.46 3.44.7 1.36a5 5 0 01.62 2.25zm-1.49-10.4a6.29 6.29 0 00-4.92-6.69A6.76 6.76 0 0014.18 2a6.29 6.29 0 00-5.9 4.12l-2 5.27 13.8 3.08z"></path>
                </svg> */}
                <svg xmlns="http://www.w3.org/2000/svg" id="bell-fill-medium" fill="currentColor"
                    className='dark:bell-icon cursor-pointer'
                    data-supported-dps="24x24" viewBox="0 0 24 24" data-token-id="240"
                    aria-label="" aria-hidden="true"
                    style={{ width: '28px', minWidth: '28px', height: '28px', minHeight: '28px' }}>
                    <path d="M22 19h-8.28a2 2 0 1 1-3.44 0H2v-1a4.52 4.52 0 0 1 1.17-2.83l1-1.17h15.7l1 1.17A4.42 4.42 0 0 1 22 18zM18.21 7.44A6.27 6.27 0 0 0 12 2a6.27 6.27 0 0 0-6.21 5.44L5 13h14z"></path>
                </svg>
            </div>}
            {userInfo?.email && <div className='user-avatar-container'>
                {userInfo?.authProvider && userInfo?.photoURL ?
                    <img src={userInfo?.photoURL} alt='user-avatar'
                        onClick={handleAvatarClick} />
                    :
                    userInfo?.profilePicURL ?
                        <img src={`${USER_PROFILE_PIC_BACKEND_DIRECTORY}${userInfo?.profilePicURL}?t=${new Date().getTime()}`}
                            alt='user-avatar'
                            onClick={handleAvatarClick} className='h-12 w-12' />
                        :
                        <svg onClick={handleAvatarClick} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
                        </svg>
                }
                <span className='user-username-text hidden md:block lg:block'>Hi, {userInfo?.displayName}</span>
                {showAvatarDetails && <AvatarMenu />}
            </div>}
            {!userInfo?.email && <DarkModeIcon />}
        </div>
    )
}

export default Profile