import React, { useRef } from 'react';
import './Login.css';
import { useForm } from 'react-hook-form';

const Login = () => {

    const { register, handleSubmit } = useForm();

    const handleLoginSubmit = (data) => {
        if (data) {
            const loginDetails = {
                email: data.email,
                password: data.password
            }
            console.log(loginDetails);
        }
    }

    return (
        <div className='login-container'>
            <h2>Login</h2>
            <form className='login-form' onSubmit={handleSubmit(handleLoginSubmit)}>
                <div className='login-field'>
                    <label>Email</label>
                    <input type='text' placeholder='Email' id='email' {...register("email")} />
                </div>
                <div className='login-field'>
                    <label>Password</label>
                    <input type='password' placeholder='Password' id='password' {...register("password")} />
                </div>
                <button onClick={(e) => handleLoginSubmit(e)}>Submit</button>
            </form>
        </div>
    )
}

export default Login