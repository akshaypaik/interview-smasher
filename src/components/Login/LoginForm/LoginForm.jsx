import React from 'react'
import { useForm } from 'react-hook-form';
import AuthProviderLogin from '../AuthProviderLogin/AuthProviderLogin';
import { useNavigate } from 'react-router-dom';
import { LOGIN_USER } from '../../../utils/constants/apiConstants';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setCurrentSidebarTab, setUserInfo, updateShowLoginSidebar } from '../../../utils/ReduxStore/appSlice';
import axios from 'axios';

const LoginForm = ({ setShowRegister }) => {

    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const body = document.body;

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
                    dispatch(setCurrentSidebarTab("home"));
                    toast.success("Logged in");
                    body?.classList.remove('no-scroll');
                    navigate("/");
                } else {
                    toast.error(data?.messageModel?.statusMessage);
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    const handleError = (errors) => {
        // console.log(errors);
    }

    return (
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
            <button type='submit'>Submit</button>
            <div className='register-btn-container'>
                <h6>Don't have an account?</h6>
                <button className='register-btn' onClick={() => setShowRegister(true)}>Register</button>
            </div>
            <span className='login-or-text'>OR</span>
            <AuthProviderLogin />
        </form>
    )
}

export default LoginForm