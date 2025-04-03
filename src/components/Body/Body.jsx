import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'
import { useSelector } from 'react-redux'
import Header from '../Header/Header';
import './Body.css';

const Body = () => {

    const showSidebar = useSelector((store) => store.app.showSidebar);

    return (
        <>
            <Header />
            <div className='body-container'>
                {showSidebar && <Sidebar />}
                <Outlet />
            </div>
        </>
    )
}

export default Body