import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'
import { useSelector } from 'react-redux'
import Header from '../Header/Header';
import './Body.css';
import { Toaster } from 'react-hot-toast';
import Login from '../Login/Login';

const Body = () => {

    const showSidebar = useSelector((store) => store.app.showSidebar);
    const showLoginSidebar = useSelector((store) => store.app.showLoginSidebar);

    return (
        <>
            <Toaster
                position='top-center'
                gutter={12}
                containerStyle={{ margin: '8px' }}
                toastOptions={{
                    success: {
                        duration: 3000
                    },
                    error: {
                        duration: 5000
                    },
                    style: {
                        fontSize: '16px',
                        maxWidth: '500px'
                    }
                }} />
            <Header />
            <div className='body-container pt-16'>
                {showSidebar && <Sidebar />}
                {showLoginSidebar && <Login />}
                <Outlet />
            </div>
        </>
    )
}

export default Body