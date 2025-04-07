import React, { useRef } from 'react';
import './Login.css';
import { useForm } from 'react-hook-form';

const Login = () => {

    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;
    console.log(errors);


    const handleLoginSubmit = (data) => {
        if (data) {
            const loginDetails = {
                email: data.email,
                password: data.password
            }
            console.log(loginDetails);
        }
    }

    const handleError = (errors) => {
        // console.log(errors);
    }

    return (
        <div className='login-container'>
            <h2>Login</h2>
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
            </form>
        </div>
    )
}

export default Login