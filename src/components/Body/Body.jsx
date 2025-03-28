import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'
import { useSelector } from 'react-redux'

const Body = () => {

    const showSidebar = useSelector((store) => store.app.showSidebar);

    return (
        <>
            {showSidebar && <Sidebar />}
            <Outlet />
        </>
    )
}

export default Body