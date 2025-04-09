import React from 'react';
import './Register.css';
import { updateShowLoginSidebar } from '../../utils/ReduxStore/appSlice';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { REGISTER_USER } from '../../utils/constants/apiConstants';
import toast from 'react-hot-toast';

const Register = ({ setShowRegister }) => {

    const body = document.body;
    const dispatch = useDispatch();
    const { register, handleSubmit, formState, reset } = useForm();
    const { errors } = formState;

    const handleRegisterClose = () => {
        dispatch(updateShowLoginSidebar(false));
        body.classList.remove('no-scroll');
    }

    const handleRegisterSubmit = async (formData) => {
        if (formData) {
            try {
                const { data } = await axios.post(REGISTER_USER, formData);
                reset();
                toast.success("User registered.");
                setShowRegister(false);
            } catch (error) {
                toast.error("User registration failed. Please try again later.");
            }
        }
    }


    return (
        <>
            <div className='register-container'>
                <div className='register-header'>
                    <h2>Register</h2>
                    <div onClick={handleRegisterClose}>
                        <svg stroke="currentColor" fill="currentColor"
                            strokeWidth="0" viewBox="0 0 512 512" style={{ height: '32px' }} xmlns="http://www.w3.org/2000/svg">
                            <path d="M331.3 308.7L278.6 256l52.7-52.7c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-52.7-52.7c-6.2-6.2-15.6-7.1-22.6 0-7.1 7.1-6 16.6 0 22.6l52.7 52.7-52.7 52.7c-6.7 6.7-6.4 16.3 0 22.6 6.4 6.4 16.4 6.2 22.6 0l52.7-52.7 52.7 52.7c6.2 6.2 16.4 6.2 22.6 0 6.3-6.2 6.3-16.4 0-22.6z"></path><path d="M256 76c48.1 0 93.3 18.7 127.3 52.7S436 207.9 436 256s-18.7 93.3-52.7 127.3S304.1 436 256 436c-48.1 0-93.3-18.7-127.3-52.7S76 304.1 76 256s18.7-93.3 52.7-127.3S207.9 76 256 76m0-28C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48z">
                            </path>
                        </svg>
                    </div>
                </div>
                <form className='register-form' onSubmit={handleSubmit(handleRegisterSubmit)}>
                    <div className='register-field'>
                        <label htmlFor='firstName'>First Name</label>
                        <input type='text' placeholder='First Name' id='first-name' {...register("firstName", {
                            required: "This field is required"
                        })} />
                        {errors?.firstName?.message &&
                            <span className='error-msg'>{errors?.firstName?.message}</span>}
                    </div>
                    <div className='register-field'>
                        <label htmlFor='lastName'>Last Name</label>
                        <input type='text' placeholder='Last Name' id='first-name' {...register("lastName", {
                            required: "This field is required"
                        })} />
                        {errors?.lastName?.message &&
                            <span className='error-msg'>{errors?.lastName?.message}</span>}
                    </div>
                    <div className='register-field'>
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
                    <div className='register-field'>
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
                    <div className='register-field'>
                        <label htmlFor='password'>Confirm Password</label>
                        <input type='password' placeholder='Confirm Password' id='confirm-password' {...register("confirmPassword", {
                            required: "This field is required",
                            validate: (value) => {
                                const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value);
                                return isPasswordValid || "Password is not valid. Please provide one uppercase, one special character and one number and a minimum of eight characters";
                            }
                        })} />
                        {errors?.confirmPassword?.message &&
                            <span className='error-msg'>{errors?.confirmPassword?.message}</span>}
                    </div>
                    <div className='register-field'>
                        <label htmlFor='phoneNumber'>Phone Number</label>
                        <input type='text' placeholder='Phone Number' id='phone-number' {...register("phoneNumber", {
                            required: "This field is required",
                            validate: (value) => {
                                const isPhoneNumberValid = /^[0-9]{10}$/.test(value);
                                return isPhoneNumberValid || "Phone number is not valid.";
                            }
                        })} />
                        {errors?.phoneNumber?.message &&
                            <span className='error-msg'>{errors?.phoneNumber?.message}</span>}
                    </div>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </>
    )
}

export default Register;