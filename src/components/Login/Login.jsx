import React, { useEffect, useRef } from 'react';
import './Login.css';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateShowLoginSidebar } from '../../utils/ReduxStore/appSlice';

const Login = () => {

    const showLoginSidebar = useSelector((store) => store.app.showLoginSidebar);
    const dispatch = useDispatch();
    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;

    const body = document.body;

    useEffect(() => {
        if (showLoginSidebar) {
            body?.classList.add('no-scroll');
        }
    }, [showLoginSidebar]);


    const handleLoginSubmit = (data) => {
        if (data) {
            const loginDetails = {
                email: data.email,
                password: data.password
            }
            console.log(loginDetails);
        }
    }

    const handleLoginClose = () => {
        dispatch(updateShowLoginSidebar(false));
        body.classList.remove('no-scroll');
    }

    const handleError = (errors) => {
        // console.log(errors);
    }

    return (
        <>
            <div className='login-container'>
                <div className='login-header'>
                    <h2>Login</h2>
                    <div onClick={handleLoginClose}>
                        <svg stroke="currentColor" fill="currentColor"
                            stroke-width="0" viewBox="0 0 512 512" style={{ height: '32px' }} xmlns="http://www.w3.org/2000/svg">
                            <path d="M331.3 308.7L278.6 256l52.7-52.7c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-52.7-52.7c-6.2-6.2-15.6-7.1-22.6 0-7.1 7.1-6 16.6 0 22.6l52.7 52.7-52.7 52.7c-6.7 6.7-6.4 16.3 0 22.6 6.4 6.4 16.4 6.2 22.6 0l52.7-52.7 52.7 52.7c6.2 6.2 16.4 6.2 22.6 0 6.3-6.2 6.3-16.4 0-22.6z"></path><path d="M256 76c48.1 0 93.3 18.7 127.3 52.7S436 207.9 436 256s-18.7 93.3-52.7 127.3S304.1 436 256 436c-48.1 0-93.3-18.7-127.3-52.7S76 304.1 76 256s18.7-93.3 52.7-127.3S207.9 76 256 76m0-28C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48z">
                            </path>
                        </svg>
                    </div>
                </div>
                <form className='login-form' onSubmit={handleSubmit(handleLoginSubmit, handleError)}>
                    <div className='login-field'>
                        <label htmlFor='email'>Email</label>
                        <input type='text' placeholder='Email' id='email' {...register("email", {
                            required: "This field is required",
                            validate: (value) => {
                                const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(value);
                                return isEmailValid || "Email ID is not valid";
                            }
                        })} />
                        {errors?.email?.message &&
                            <span className='error-msg'>{errors?.email?.message}</span>}
                    </div>
                    <div className='login-field'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' placeholder='Password' id='password' {...register("password", {
                            required: "This field is required",
                            validate: (value) => {
                                const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value);
                                return isPasswordValid || "Password is not valid. Please provide one uppercase, one special character and one number and a minimum of eight characters";
                            }
                        })} />
                        {errors?.password?.message &&
                            <span className='error-msg'>{errors?.password?.message}</span>}
                    </div>
                    <button onClick={(e) => handleLoginSubmit(e)}>Submit</button>
                    <span>OR</span>
                    <div className='auth-login-container'>
                        <span>Login into your account using</span>
                        <div className='auth-provider-btn'>
                            <svg width="52" height="52" role="img">
                                <title>Google's Logo</title>
                                <g id="Google-Button" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
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
                </form>
            </div>
            <div style={{
                display: `${showLoginSidebar ? 'block' : 'none'}`,
                opacity: 0.7, top: 0, bottom: 0, left: 0, right: 0, zIndex: 20,
                backgroundColor: '#282c3f', overflow: 'hidden',
                position: 'fixed'
            }}></div>
        </>
    )
}

export default Login