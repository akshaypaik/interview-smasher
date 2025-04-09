import React from 'react';
import './Profile.css';
import { useDispatch, useSelector } from 'react-redux';
import { toggleShowAvatarDetails, toogleDarkMode, updateShowLoginSidebar } from '../../../utils/ReduxStore/appSlice';
import { useNavigate } from 'react-router-dom';
import AvatarMenu from './AvatarMenu/AvatarMenu';

const Profile = () => {

    const darkMode = useSelector((store) => store.app.darkMode);
    const userInfo = useSelector((store) => store.app.userInfo);
    // const [showAvatarDetails, setShowAvatarDetails] = useState(false);
    const showAvatarDetails = useSelector((store) => store.app.showAvatarDetails);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDarkMode = () => {
        dispatch(toogleDarkMode());
    }

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
            {userInfo?.email && <div className='user-avatar-container'>
                {userInfo?.photoURL ?
                    <img src={userInfo?.photoURL} alt='user-avatar'
                        onClick={handleAvatarClick} />
                    :
                    <svg onClick={handleAvatarClick} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
                    </svg>
                }
                <span className='user-username-text'>Hi, {userInfo?.displayName}</span>
                {showAvatarDetails && <AvatarMenu />}
            </div>}
            {!userInfo?.email && <div className='dark-mode-container' onClick={handleDarkMode}>
                {darkMode ?
                    <svg stroke='black' fill='black' height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" focusable="false" aria-hidden="true" style={{ display: 'inherit' }}>
                        <path d="M12 22C10.93 22 9.86998 21.83 8.83998 21.48L7.41998 21.01L8.83998 20.54C12.53 19.31 15 15.88 15 12C15 8.12 12.53 4.69 8.83998 3.47L7.41998 2.99L8.83998 2.52C9.86998 2.17 10.93 2 12 2C17.51 2 22 6.49 22 12C22 17.51 17.51 22 12 22ZM10.58 20.89C11.05 20.96 11.53 21 12 21C16.96 21 21 16.96 21 12C21 7.04 16.96 3 12 3C11.53 3 11.05 3.04 10.58 3.11C13.88 4.81 16 8.21 16 12C16 15.79 13.88 19.19 10.58 20.89Z"></path>
                    </svg> :
                    <svg height="24" viewBox="0 0 28 28" fill="white">
                        <circle cx="14" cy="14" r="3.5" stroke="black"></circle>
                        <path d="M14 8.5V6.5" stroke="black" strokeLinecap="round"></path><path d="M17.889 10.1115L19.3032 8.69727" stroke="black" strokeLinecap="round"></path><path d="M19.5 14L21.5 14" stroke="black" strokeLinecap="round"></path><path d="M17.889 17.8885L19.3032 19.3027" stroke="black" strokeLinecap="round"></path><path d="M14 21.5V19.5" stroke="black" strokeLinecap="round"></path><path d="M8.69663 19.3029L10.1108 17.8887" stroke="black" strokeLinecap="round"></path><path d="M6.5 14L8.5 14" stroke="black" strokeLinecap="round"></path><path d="M8.69663 8.69711L10.1108 10.1113" stroke="black" strokeLinecap="round"></path>
                    </svg>
                }
            </div>}
        </div>
    )
}

export default Profile