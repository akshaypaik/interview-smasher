import React from 'react';
import './AuthProviderLogin.css';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from '../../../utils/firebase/firbaseAuth';
import { useDispatch } from 'react-redux';
import { setUserInfo, updateShowLoginSidebar } from '../../../utils/ReduxStore/appSlice';
import Cookies from 'js-cookie';

const AuthProviderLogin = () => {

    const dispatch = useDispatch();

    const handleGoogleLogin = () => {
        signInWithPopup(auth, provider).then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            const { uid, email, displayName, photoURL, providerData } = user;
            dispatch(setUserInfo({ uid, email, displayName, photoURL, providerData }));
            Cookies.set('authToken', user?.stsTokenManager?.accessToken,
                { expires: user?.stsTokenManager?.expirationTime, secure: true });
            dispatch(updateShowLoginSidebar(false));
            const body = document.body;
            body?.classList.remove('no-scroll');
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
    }

    return (
        <div className='auth-login-container'>
            <h4>Login into your account using</h4>
            <div className='auth-provider-btn btn-auth-google' onClick={handleGoogleLogin}>
                <svg width="52" height="52" role="img">
                    <title>Google's Logo</title>
                    <g id="Google-Button" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <rect x="0" y="0" width="52" height="52" rx="2"></rect>
                        <g id="logo_googleg_48dp" transform="translate(13.65, 13.65) scale(1.4300000000000002)"><path d="M17.64,9.20454545 C17.64,8.56636364 17.5827273,7.95272727 17.4763636,7.36363636 L9,7.36363636 L9,10.845 L13.8436364,10.845 C13.635,11.97 13.0009091,12.9231818 12.0477273,13.5613636 L12.0477273,15.8195455 L14.9563636,15.8195455 C16.6581818,14.2527273 17.64,11.9454545 17.64,9.20454545 L17.64,9.20454545 Z" id="Shape" fill="#4285F4"></path>
                            <path d="M9,18 C11.43,18 13.4672727,17.1940909 14.9563636,15.8195455 L12.0477273,13.5613636 C11.2418182,14.1013636 10.2109091,14.4204545 9,14.4204545 C6.65590909,14.4204545 4.67181818,12.8372727 3.96409091,10.71 L0.957272727,10.71 L0.957272727,13.0418182 C2.43818182,15.9831818 5.48181818,18 9,18 L9,18 Z" id="Shape" fill="#34A853"></path><path d="M3.96409091,10.71 C3.78409091,10.17 3.68181818,9.59318182 3.68181818,9 C3.68181818,8.40681818 3.78409091,7.83 3.96409091,7.29 L3.96409091,4.95818182 L0.957272727,4.95818182 C0.347727273,6.17318182 0,7.54772727 0,9 C0,10.4522727 0.347727273,11.8268182 0.957272727,13.0418182 L3.96409091,10.71 L3.96409091,10.71 Z" id="Shape" fill="#FBBC05">
                            </path>
                            <path d="M9,3.57954545 C10.3213636,3.57954545 11.5077273,4.03363636 12.4404545,4.92545455 L15.0218182,2.34409091 C13.4631818,0.891818182 11.4259091,0 9,0 C5.48181818,0 2.43818182,2.01681818 0.957272727,4.95818182 L3.96409091,7.29 C4.67181818,5.16272727 6.65590909,3.57954545 9,3.57954545 L9,3.57954545 Z" id="Shape" fill="#EA4335"></path><path d="M0,0 L18,0 L18,18 L0,18 L0,0 Z" id="Shape">
                            </path>
                        </g>
                    </g>
                </svg>
                <span>Google</span>
            </div>
        </div>
    )
}

export default AuthProviderLogin