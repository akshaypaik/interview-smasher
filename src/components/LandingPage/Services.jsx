"use client";
import React from 'react';
import { FaHandHoldingDollar } from "react-icons/fa6";
import { FaSackDollar } from "react-icons/fa6";
import { FaCalendarAlt, FaRegCreditCard } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import { FaChartColumn } from "react-icons/fa6";
import { FaNewspaper } from "react-icons/fa6";
import { motion } from 'framer-motion';

const Services = () => {
    return (
        <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0 }}
            viewport={{ once: false }}>
            <div className='mt-2'>
                <span className="text-4xl font-semibold flex justify-center">Key Features</span>
                <h4 className='mt-4 text-gray-700 font-medium flex justify-center'>Interview tracking made easy</h4>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-8'>
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.0 }}
                        viewport={{ once: false }}>
                        <div className='bg-white p-6 rounded-xl shadow border text-center transition-all 
                    duration-300 hover:shadow-lg hover:-translate-y-1 dark:bg-gray-800'>
                            <div className='flex justify-center'>
                                <svg stroke="currentColor" className='fill-red-400 animate-float' strokeWidth="0" viewBox="0 0 24 24" height="48" width="48" enableBackground="new 0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9.6 16.8h4.8v1.8H9.6z" fill="none"></path><path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6a2 2 0 0 0-2-2H4c-1.11 0-2 .89-2 2v10a2 2 0 0 0 2 2H0v2h24v-2h-4ZM4 16V6h16v10.01L4 16Zm5.097-6.047c0-1.027.836-1.864 1.864-1.864 1.027 0 1.864.837 1.864 1.864a1.867 1.867 0 0 1-1.864 1.864 1.867 1.867 0 0 1-1.864-1.864Zm7.032 4.236-2.482-2.482a3.19 3.19 0 0 0 .527-1.754A3.216 3.216 0 0 0 10.96 6.74a3.217 3.217 0 0 0-3.214 3.213 3.218 3.218 0 0 0 3.214 3.214 3.19 3.19 0 0 0 1.724-.51l2.489 2.487.955-.955Z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
                            </div>
                            <h3 className='text-xl font-bold my-4 dark:text-gray-200'>
                                Quick Career Search
                            </h3>
                            <p className='dark:text-gray-400'>
                                Quick Career Search is a fast and user-friendly feature that allows job seekers to find
                                relevant opportunities with minimal input.
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.0 }}
                        viewport={{ once: false }}>
                        <div className='bg-white p-6 rounded-xl shadow border text-center transition-all 
                duration-300 hover:shadow-lg hover:-translate-y-1 dark:bg-gray-800'>
                            <div className='flex justify-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" className='fill-red-400 animate-float' height="48" viewBox="0 0 24 24" width="48" focusable="false" aria-hidden="true" style={{ display: 'inherit', height: '100%' }}><path clipRule="evenodd" d="M14.813 5.018 14.41 6.5 14 8h5.192c.826 0 1.609.376 2.125 1.022.711.888.794 2.125.209 3.101L21 13l.165.413c.519 1.296.324 2.769-.514 3.885l-.151.202v.5c0 1.657-1.343 3-3 3H5c-1.105 0-2-.895-2-2v-8c0-1.105.895-2 2-2h2v.282c0-.834.26-1.647.745-2.325L12 1l1.1.472c1.376.59 2.107 2.103 1.713 3.546ZM7 10.5H5c-.276 0-.5.224-.5.5v8c0 .276.224.5.5.5h2v-9Zm10.5 9h-9V9.282c0-.521.163-1.03.466-1.453l3.553-4.975c.682.298 1.043 1.051.847 1.77l-.813 2.981c-.123.451-.029.934.255 1.305.284.372.725.59 1.192.59h5.192c.37 0 .722.169.954.459.32.399.357.954.094 1.393l-.526.876c-.241.402-.28.894-.107 1.33l.165.412c.324.81.203 1.73-.32 2.428l-.152.202c-.195.26-.3.575-.3.9v.5c0 .828-.672 1.5-1.5 1.5Z" fillRule="evenodd"></path></svg>
                            </div>
                            <h3 className='text-xl font-bold my-4 dark:text-gray-200'>
                                Favorite Companies
                            </h3>
                            <p className='dark:text-gray-400'>
                                Favorite Companies is a personalized feature that lets users bookmark companies they admire or are interested in working for.
                                It helps track job openings.
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.0 }}
                        viewport={{ once: false }}>
                        <div className='bg-white p-6 rounded-xl shadow border text-center transition-all 
                duration-300 hover:shadow-lg hover:-translate-y-1 dark:bg-gray-800'>
                            <div className='flex justify-center'>
                                <svg
                                    className='fill-red-400 animate-float'
                                    height="48"
                                    width="48"
                                    viewBox="0 0 367.004 367.004"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                >
                                    <g>
                                        <path d="M160.937,197.203c24.125,0,80.846-29.033,80.846-98.603c0-9.705-0.236-19.081-1.037-27.94 c-1.313-17.427-4.883-32.872-13.768-44.71C215.578,9.838,195.629,0,160.937,0c-34.68,0-54.628,9.833-66.029,25.937 C86.012,37.778,82.44,53.231,81.127,70.669c-0.799,8.856-1.035,18.229-1.035,27.932C80.092,168.17,136.812,197.203,160.937,197.203 z M187.328,36.123c-2.355,5.951-3.535,8.926-5.891,14.877c-15.209-4.297-25.791-4.297-41,0c-2.355-5.951-3.533-8.926-5.891-14.877 C153.566,30.365,168.308,30.365,187.328,36.123z M92.119,83.517c0.932,2.037,4.889,9.869,11.014,10.604 c7.041,0.844,18.729-24.936,57.805-24.998c39.076,0.063,50.764,25.842,57.805,24.998c6.125-0.735,10.082-8.567,11.014-10.604 c0.189,4.992,0.259,10.046,0.259,15.084c0,34.006-15.015,55.076-27.612,66.763c-15.871,14.726-33.492,20.071-41.465,20.071 c-7.973,0-25.594-5.345-41.465-20.071c-12.598-11.687-27.612-32.757-27.612-66.763C91.86,93.562,91.93,88.509,92.119,83.517z" />
                                        <path d="M232.705,211.768c2.605-2.606,5.371-4.994,8.26-7.181c-11.223-6.117-22.109-11.933-29.153-15.697l-0.331-0.177 c-1.982-1.059-4.403-0.847-6.169,0.541c-9.085,7.132-19.035,11.938-29.574,14.283c-1.861,0.414-3.391,1.738-4.066,3.521 l-10.734,28.291l-10.734-28.291c-0.675-1.783-2.204-3.106-4.066-3.521c-10.539-2.346-20.489-7.152-29.573-14.283 c-1.769-1.388-4.188-1.601-6.17-0.541c-17.138,9.158-58.25,31.302-69.829,39.106c-19.621,13.219-28.199,61.053-29.72,70.508 c-0.15,0.938-0.064,1.898,0.253,2.793c0.703,1.982,18.709,48.548,149.84,48.548c5.933,0,11.627-0.098,17.105-0.28 c0.481-6.064,3.029-11.993,7.657-16.622l31.512-31.511C203.113,271.581,208.833,235.64,232.705,211.768z" />
                                        <path d="M336.396,219.546c-12.79-12.79-29.821-19.834-47.957-19.834c-18.135,0-35.166,7.044-47.955,19.834 c-21.512,21.511-26.052,54.982-11.04,81.396l1.317,2.319l-37.284,37.284c-6.042,6.043-6.041,15.876,0.002,21.92 c2.927,2.927,6.819,4.539,10.958,4.539c4.142,0,8.033-1.612,10.96-4.54l37.285-37.283l2.317,1.315 c10.126,5.748,21.698,8.787,33.464,8.787c18.127,0,35.149-7.04,47.933-19.824c12.791-12.79,19.835-29.822,19.835-47.957 C356.231,249.367,349.187,232.336,336.396,219.546z M319.779,298.842c-8.357,8.358-19.488,12.962-31.339,12.962 c-11.851,0-22.982-4.603-31.341-12.962c-17.281-17.281-17.281-45.399,0-62.68c8.359-8.359,19.49-12.962,31.341-12.962 c11.851,0,22.981,4.604,31.339,12.963c8.359,8.358,12.963,19.488,12.963,31.339S328.138,290.483,319.779,298.842z" />
                                    </g>
                                </svg>
                            </div>
                            <h3 className='text-xl font-bold my-4 dark:text-gray-200'>
                                Track Job Hunt
                            </h3>
                            <p className='dark:text-gray-400'>
                                Track Job Hunt is a feature designed to help users stay organized throughout their job search journey.
                                It allows them to log applications, monitor interview stages, and note follow-ups.
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.0 }}
                        viewport={{ once: false }}>
                        <div className='bg-white p-6 rounded-xl shadow border text-center transition-all 
                duration-300 hover:shadow-lg hover:-translate-y-1 dark:bg-gray-800'>
                            <div className='flex justify-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" className='fill-red-400 animate-float' height="48" viewBox="0 0 24 24" width="48" focusable="false" aria-hidden="true" style={{ display: 'inherit', height: '100%' }}><path clipRule="evenodd" d="M11.271 2.689a1.5 1.5 0 011.457 0l9 5A1.5 1.5 0 0122.5 9v7a.75.75 0 01-1.5 0v-5.284l-1.5.833V17a.75.75 0 01-.741.75c-1.9.023-3.076.4-3.941.896-.71.407-1.229.895-1.817 1.448-.159.149-.322.302-.496.46a.75.75 0 01-1.046-.034l-.076-.08c-.702-.73-1.303-1.355-2.164-1.832-.875-.485-2.074-.84-3.976-.858A.75.75 0 014.5 17v-5.45l-2.228-1.24a1.5 1.5 0 010-2.622l9-5ZM6 12.383v3.891c1.703.096 2.946.468 3.946 1.022.858.475 1.508 1.07 2.08 1.652.575-.54 1.221-1.13 2.046-1.603.988-.566 2.215-.963 3.928-1.068v-3.894l-5.272 2.928a1.5 1.5 0 01-1.457 0L6 12.383ZM12 4l9 5-9 5-9-5 9-5Z" fillRule="evenodd"></path></svg>
                            </div>
                            <h3 className='text-xl font-bold my-4 dark:text-gray-200'>
                                Learning Resources
                            </h3>
                            <p className='dark:text-gray-400'>
                                Learning Resources provide users with curated content to enhance their skills and improve job readiness.
                                The goal is to support continuous growth and increase the chances of landing the desired job.
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.0 }}
                        viewport={{ once: false }}>
                        <div className='bg-white p-6 rounded-xl shadow border text-center transition-all 
                duration-300 hover:shadow-lg hover:-translate-y-1 dark:bg-gray-800'>
                            <div className='flex justify-center'>
                                <FaCalendarAlt className='h-12 w-12 text-red-400 animate-float' />
                            </div>
                            <h3 className='text-xl font-bold my-4 dark:text-gray-200'>
                                Interview Calendar
                            </h3>
                            <p className='dark:text-gray-400'>
                                Interview Calendar is a scheduling tool that helps users manage and keep track of upcoming interviews.
                                This feature ensures users never miss an interview and stay well-prepared.
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.0 }}
                        viewport={{ once: false }}>
                        <div className='bg-white p-6 rounded-xl shadow border text-center transition-all 
                duration-300 hover:shadow-lg hover:-translate-y-1 dark:bg-gray-800'>
                            <div className='flex justify-center'>
                                <FaNewspaper className='h-12 w-12 text-red-400 animate-float' />
                            </div>
                            <h3 className='text-xl font-bold my-4 dark:text-gray-200'>
                                Trending Tech News
                            </h3>
                            <p className='dark:text-gray-400'>
                                Stay informed with the latest and most relevant financial news from trusted sources.
                                Get real-time updates on market trends, economic events, stock movements, and
                                global financial developments—all in one place.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}

export default Services;