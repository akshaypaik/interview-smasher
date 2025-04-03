import React, { useRef } from 'react';
import './Login.css';

const Login = () => {

    const email = useRef(null);
    const password = useRef(null);

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const loginDetails = {
            email: email.current.value,
            password: password.current.value
        }
        console.log(loginDetails);
    }

    return (
        <div className='login-container'>
            <h2>Login</h2>
            <form className='login-form'>
                <input type='text' placeholder='Email' ref={email} />
                <input type='password' placeholder='Password'  ref={password} />
                <button onClick={(e) => handleLoginSubmit(e)}>Submit</button>
            </form>
        </div>
    )
}

export default Login