import React from 'react';

const Home = () => {
    return (
        <>

            <div className='flex flex-col gap-4 items-center sm:flex-row'> One-stop <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-purple-500 2s ease-in-out 0s infinite normal none running pulse-glow"> destination </span> </div>
            <div>for</div>
            <div className='flex justify-center items-center w-full'>
                <span className="click-effect underline"> Interview Process Tracking</span>
            </div>
            <div className="text-lg font-medium text-gray-600 mt-8">
                From searching jobs to tracking all your interviews
            </div>
            <div className="text-lg font-medium text-gray-600">
                <span className="text-red-500 underline underline-offset-2 font-bold">Saving hours</span> of manual work
            </div>

            <a className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 text-white bg-red-600 rounded-lg 
                text-base sm:text-lg font-medium shadow-lg hover:shadow-2xl transform hover:-translate-y-1 
                transition-all duration-200 w-64 sm:w-auto justify-center mt-24 cursor-pointer explore-services-btn"
                href="#services" >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="lucide lucide-external-link mr-2 h-4 w-4 sm:h-6 sm:w-6">
                    <path d="M15 3h6v6"></path>
                    <path d="M10 14 21 3"></path>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                </svg>
                Explore Services
            </a>


            <div className="text-lg font-medium mt-8">
                <ul className="space-y-3 mt-4 flex gap-4">
                    <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"><path d="M20 6 9 17l-5-5"></path>
                        </svg>
                        <span className="text-gray-600 relative z-10">
                            Helps you monitor each stage of their job applications
                        </span>
                    </li>
                    <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"><path d="M20 6 9 17l-5-5"></path>
                        </svg>
                        <span className="text-gray-600 relative z-10">
                            Allowing you to discover and apply for jobs efficiently
                        </span>
                    </li>
                </ul>
                <ul>
                    <li className="flex justify-center flex-col items-center">
                        <div className='flex'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"><path d="M20 6 9 17l-5-5"></path>
                            </svg>
                            <span className="text-gray-600 relative z-10">
                                Provides a centralized view of saved jobs, application history, interview schedules,
                            </span>
                        </div>
                        <span className="text-gray-600 relative z-10">
                            and status updates to streamline the job hunt.
                        </span>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Home