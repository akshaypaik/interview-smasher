import React, { useEffect, useRef, useState } from 'react';
import './Login.css';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo, updateShowLoginSidebar } from '../../utils/ReduxStore/appSlice';
import AuthProviderLogin from './AuthProviderLogin/AuthProviderLogin';
import Register from '../Register/Register';
import axios from 'axios';
import { LOGIN_USER } from '../../utils/constants/apiConstants';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const showLoginSidebar = useSelector((store) => store.app.showLoginSidebar);
    const dispatch = useDispatch();
    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;
    const [showRegister, setShowRegister] = useState(false);
    const body = document.body;
    const navigate = useNavigate();


    useEffect(() => {
        if (showLoginSidebar) {
            body?.classList.add('no-scroll');
        } else {
            body?.classList.remove('no-scroll');
        }
    }, [showLoginSidebar]);


    const handleLoginSubmit = async (loginData) => {
        if (loginData?.email && loginData?.password) {
            try {
                const loginDetails = {
                    email: loginData.email,
                    password: loginData.password
                }
                const { data } = await axios.post(LOGIN_USER, loginDetails);
                if (data?.messageModel?.statusCode === 0) {
                    Cookies.set("is_token", data?.token.toString());
                    dispatch(updateShowLoginSidebar(false));
                    const userInfo = {
                        uid: data.email,
                        email: data.email, displayName: data.email,
                        photoURL: data?.profilePhotoURL, authProvider: false
                    }
                    dispatch(setUserInfo(userInfo));
                    toast.success("Logged in");
                    navigate("/");
                } else {
                    toast.error(data?.messageModel?.statusMessage);
                }
            } catch (error) {

            }
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
            {!showRegister && <div className='login-container'>
                <div className='login-header'>
                    <h2>Login</h2>
                    <div onClick={handleLoginClose}>
                        <svg stroke="currentColor" fill="currentColor"
                            strokeWidth="0" viewBox="0 0 512 512" style={{ height: '32px' }} xmlns="http://www.w3.org/2000/svg">
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
                    <div className='register-btn-container'>
                        <h6>Don't have an account?</h6>
                        <button className='register-btn' onClick={() => setShowRegister(true)}>Register</button>
                    </div>
                    <span style={{ textAlign: 'center', fontWeight: '600', fontSize: '1.2rem' }}>OR</span>
                    <AuthProviderLogin />
                </form>
            </div>}
            {showRegister && <Register setShowRegister={setShowRegister} />}
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