import React from 'react';
import { motion } from 'framer-motion';

const Pricing = () => {
    return (
        <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}>
            <div className='mt-2'>
                <h2 className="text-4xl font-semibold flex justify-center">Pricing</h2>
                <h4 className='mt-4 text-gray-700 font-medium flex justify-center'>Pay only for what you use.</h4>
                <div className='flex justify-center mt-8 mb-8'>
                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl'>
                        {/* <motion.div
                            className="text-center"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.0 }}
                            viewport={{ once: false }}>
                            <div className='w-full max-w-[350px]'>
                                <div className='rounded-xl bg-card text-card-foreground shadow h-full relative overflow-hidden flex flex-col border border-gray-200'>
                                    <div className='flex flex-col space-y-1.5 p-6 relative  bg-transparent'>
                                        <div className="px-4 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-gray-600 to-gray-500 rounded-full w-fit mb-4">
                                            Starter
                                        </div>
                                        <p className="text-sm text-muted-foreground flex items-baseline gap-2 mt-2 relative ">
                                            <span className="text-4xl font-bold text-gray-900" style={{ color: 'rgb(0, 0, 0)' }}>
                                                ₹99
                                            </span>
                                        </p>
                                        <div className="text-sm font-medium text-gray-600 mt-1 mb-2 relative ">
                                            Ideal for students or hobbyists
                                        </div>
                                    </div>
                                    <div className="p-6 pt-0 flex-grow relative  bg-transparent">
                                        <div className="px-3 py-2 mb-4 rounded-lg text-xs font-medium bg-gray-50 text-gray-800">
                                            <div className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles w-3 h-3 mr-1"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path><path d="M20 3v4"></path><path d="M22 5h-4"></path><path d="M4 17v2"></path><path d="M5 18H3"></path>
                                                </svg>
                                                Try it out with minimal investment
                                            </div>
                                        </div>
                                        <ul className="space-y-3 mt-4">
                                            <li className="flex items-start">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"><path d="M20 6 9 17l-5-5"></path>
                                                </svg>
                                                <span className="text-gray-600 relative ">
                                                    Access to stocks profit/loss analysis
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"><path d="M20 6 9 17l-5-5"></path>
                                                </svg>
                                                <span className="text-gray-600 relative ">
                                                    Trending finance news at your fingertip
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="flex items-center p-6 relative mt-auto pt-6  bg-transparent">
                                        <button className="inline-flex items-center justify-center rounded-md transition-colors 
                                focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
                                disabled:pointer-events-none disabled:opacity-50 shadow h-9 px-4 w-full py-6 text-lg 
                                font-medium bg-gray-800 hover:bg-gray-900 text-white cursor-pointer hover:-translate-y-1">
                                            Purchase
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div> */}
                        <motion.div
                            className="text-center"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.0 }}
                            viewport={{ once: false }}>
                            <div className='w-full max-w-[350px]'>
                                <div className='rounded-xl bg-card text-card-foreground h-full relative overflow-hidden flex flex-col border-2 border-red-500 shadow-xl'>
                                    <div className='flex flex-col space-y-1.5 p-6 relative bg-transparent'>
                                        <div className="px-4 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-500 rounded-full w-fit mb-4">
                                            Most Popular
                                        </div>
                                        <p className="text-2xl font-bold tracking-tight text-gray-900 relative">
                                            <span className="text-4xl font-bold text-gray-900" style={{ color: 'rgb(220, 38, 38)' }}>
                                                ₹49 <span className='text-lg'>/month</span>
                                            </span>
                                        </p>
                                        <div className="text-sm font-medium text-gray-600 mt-1 mb-2 relative">
                                            Perfect for professionals
                                        </div>
                                    </div>
                                    <div className="p-6 pt-0 flex-grow relative bg-transparent">
                                        <div className="px-3 py-2 mb-4 rounded-lg text-xs font-medium bg-gray-50 text-gray-800">
                                            <div className="px-3 py-2 mb-4 rounded-lg text-xs font-medium bg-red-50 text-red-800 flex">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                    className="lucide lucide-sparkles w-3 h-3 mr-1">
                                                    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path><path d="M20 3v4"></path><path d="M22 5h-4"></path><path d="M4 17v2"></path>
                                                    <path d="M5 18H3"></path>
                                                </svg>
                                                <span>Best value for most users</span>
                                            </div>
                                        </div>
                                        <ul className="space-y-3 mt-4">
                                            <li className="flex items-start">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"><path d="M20 6 9 17l-5-5"></path>
                                                </svg>
                                                <span className="text-gray-600 relative">
                                                    Access to quick career search
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"><path d="M20 6 9 17l-5-5"></path>
                                                </svg>
                                                <span className="text-gray-600 relative">
                                                    Trending tech news at your fingertip
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"><path d="M20 6 9 17l-5-5"></path>
                                                </svg>
                                                <span className="text-gray-600 relative ">
                                                    Bookmark your favorite companies and track job openings with single click
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"><path d="M20 6 9 17l-5-5"></path>
                                                </svg>
                                                <span className="text-gray-600 relative ">
                                                    Track all stages of your interview process right from applying to receiving offer.
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="flex items-center p-6 relative mt-auto pt-6  bg-transparent">
                                        <button className="inline-flex items-center justify-center rounded-md transition-colors 
                                focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
                                disabled:pointer-events-none disabled:opacity-50 text-primary-foreground 
                                shadow h-9 px-4 w-full py-6 text-lg font-medium bg-red-600 hover:bg-red-700 text-white
                                cursor-pointer hover:-translate-y-1">
                                            Purchase
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            className="text-center"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.0 }}
                            viewport={{ once: false }}>
                            <div className='w-full max-w-[350px]'>
                                <div className='rounded-xl bg-card text-card-foreground h-full relative overflow-hidden flex flex-col border-2 border-violet-500 shadow-xl'>
                                    <div className='flex flex-col space-y-1.5 p-6 relative  bg-transparent'>
                                        <div className="px-4 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-violet-500 rounded-full w-fit mb-4">
                                            Ultimate
                                        </div>
                                        <p className="text-2xl font-bold tracking-tight text-gray-900 relative">
                                            <span className="text-4xl font-bold text-gray-900" style={{ color: 'rgb(109, 40, 217)' }}>
                                                ₹99 <span className='text-lg'>/month</span>
                                            </span>
                                        </p>
                                        <div className="text-sm font-medium text-gray-600 mt-1 mb-2 relative ">
                                            <span>Enjoy all the services</span>
                                        </div>
                                    </div>
                                    <div className="p-6 pt-0 flex-grow relative  bg-transparent">
                                        <div className="px-3 py-2 mb-4 rounded-lg text-xs font-medium bg-violet-50 text-violet-800">
                                            <div className="px-3 py-2 mb-4 rounded-lg text-xs font-medium bg-red-50 text-red-800 flex">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                    className="lucide lucide-sparkles w-3 h-3 mr-1"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path><path d="M20 3v4"></path><path d="M22 5h-4"></path><path d="M4 17v2"></path>
                                                    <path d="M5 18H3"></path>
                                                </svg>
                                                <span>For intense users with all the benefits</span>
                                            </div>
                                        </div>
                                        <ul className="space-y-3 mt-4">
                                            <li className="flex items-start">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"><path d="M20 6 9 17l-5-5"></path>
                                                </svg>
                                                <span className="text-gray-600 relative ">
                                                    Access to quick career search
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"><path d="M20 6 9 17l-5-5"></path>
                                                </svg>
                                                <span className="text-gray-600 relative ">
                                                    Trending tech news at your fingertip
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"><path d="M20 6 9 17l-5-5"></path>
                                                </svg>
                                                <span className="text-gray-600 relative ">
                                                    Bookmark your favorite companies and track job openings with single click
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"><path d="M20 6 9 17l-5-5"></path>
                                                </svg>
                                                <span className="text-gray-600 relative ">
                                                    Track all stages of your interview process right from applying to receiving offer.
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"><path d="M20 6 9 17l-5-5"></path>
                                                </svg>
                                                <span className="text-gray-600 relative ">
                                                    Calendar view of your upcoming interviews.
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"><path d="M20 6 9 17l-5-5"></path>
                                                </svg>
                                                <span className="text-gray-600 relative ">
                                                    Learning resources to enhance your tech skills
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"><path d="M20 6 9 17l-5-5"></path>
                                                </svg>
                                                <span className="text-gray-600 relative ">
                                                    Personalised tips based on your interview tracking
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="flex items-center p-6 relative mt-auto pt-6  bg-transparent">
                                        <button className="inline-flex items-center justify-center rounded-md 
                                transition-colors focus-visible:outline-none focus-visible:ring-1 
                                focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 
                                shadow h-9 px-4 w-full py-6 text-lg font-medium bg-violet-600 
                                hover:bg-violet-700 text-white cursor-pointer hover:-translate-y-1">
                                            Purchase
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Pricing