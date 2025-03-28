import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'

const Body = () => {
    return (
        <>
            <Sidebar />
            <Outlet />
        </>
    )
}

export default Body