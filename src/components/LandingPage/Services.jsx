"use client";
import React from 'react';
import { FaHandHoldingDollar } from "react-icons/fa6";
import { FaSackDollar } from "react-icons/fa6";
import { FaRegCreditCard } from "react-icons/fa";
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
                <h2 className="text-4xl font-semibold flex justify-center">Key Features</h2>
                <h4 className='mt-4 text-gray-700 font-medium flex justify-center'>Interview tracking made easy</h4>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-8'>
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.0 }}
                        viewport={{ once: false }}>
                        <div className='bg-white p-6 rounded-xl shadow border border-gray-100 text-center transition-all 
                    duration-300 hover:shadow-lg hover:-translate-y-1'>
                            <div className='flex justify-center'>
                                <FaHandHoldingDollar className='h-12 w-12 text-red-400 animate-float' />
                            </div>
                            <h3 className='text-xl font-bold my-4'>
                                Quick Career Search
                            </h3>
                            <p>
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
                        <div className='bg-white p-6 rounded-xl shadow border border-gray-100 text-center transition-all 
                duration-300 hover:shadow-lg hover:-translate-y-1'>
                            <div className='flex justify-center'>
                                <FaSackDollar className='h-12 w-12 text-red-400 animate-float' />
                            </div>
                            <h3 className='text-xl font-bold my-4'>
                                Favorite Companies
                            </h3>
                            <p>
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
                        <div className='bg-white p-6 rounded-xl shadow border border-gray-100 text-center transition-all 
                duration-300 hover:shadow-lg hover:-translate-y-1'>
                            <div className='flex justify-center'>
                                <FaRegCreditCard className='h-12 w-12 text-red-400 animate-float' />
                            </div>
                            <h3 className='text-xl font-bold my-4'>
                                Track Job Hunt
                            </h3>
                            <p>
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
                        <div className='bg-white p-6 rounded-xl shadow border border-gray-100 text-center transition-all 
                duration-300 hover:shadow-lg hover:-translate-y-1'>
                            <div className='flex justify-center'>
                                <FaChartLine className='h-12 w-12 text-red-400 animate-float' />
                            </div>
                            <h3 className='text-xl font-bold my-4'>
                                Learning Resources
                            </h3>
                            <p>
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
                        <div className='bg-white p-6 rounded-xl shadow border border-gray-100 text-center transition-all 
                duration-300 hover:shadow-lg hover:-translate-y-1'>
                            <div className='flex justify-center'>
                                <FaChartColumn className='h-12 w-12 text-red-400 animate-float' />
                            </div>
                            <h3 className='text-xl font-bold my-4'>
                                Interview Calendar
                            </h3>
                            <p>
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
                        <div className='bg-white p-6 rounded-xl shadow border border-gray-100 text-center transition-all 
                duration-300 hover:shadow-lg hover:-translate-y-1'>
                            <div className='flex justify-center'>
                                <FaNewspaper className='h-12 w-12 text-red-400 animate-float' />
                            </div>
                            <h3 className='text-xl font-bold my-4'>
                                Trending Tech News
                            </h3>
                            <p>
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