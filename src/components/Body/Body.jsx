import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'
import { useSelector } from 'react-redux'
import Header from '../Header/Header';
import './Body.css';
import { Toaster } from 'react-hot-toast';
import Login from '../Login/Login';
import { AnimatePresence, motion } from "framer-motion";

const Body = () => {

    const showSidebar = useSelector((store) => store.app.showSidebar);
    const showLoginSidebar = useSelector((store) => store.app.showLoginSidebar);
    const userInfo = useSelector((store) => store.app.userInfo);

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
                {showSidebar && userInfo?.email && <Sidebar />}
                {showLoginSidebar && (
                    <motion.div
                        initial={{ x: "100%" }}        
                        animate={{ x: 0 }}            
                        exit={{ x: "100%" }}          
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="fixed right-0 top-0 h-full w-96 z-50">
                        <Login />
                    </motion.div>
                )}
                <Outlet />
            </div>
        </>
    )
}

export default Body