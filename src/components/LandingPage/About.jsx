"use client";
import React from 'react';
import { TbDeviceDesktopDollar } from "react-icons/tb";
import { FaBook } from "react-icons/fa";
import { ImUserCheck } from "react-icons/im";
import { FaChalkboardUser } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import { GiStumpRegrowth } from "react-icons/gi";
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className=''>
      <h2 className="text-4xl font-semibold flex justify-center">
        About
      </h2>
      <h4 className='mt-4 text-gray-700 font-medium flex justify-center'>
        Empowering You to track your interviews
      </h4>
      <div className='flex justify-center mt-2'>
        <p>
          Welcome to INTERVIEW SMASHER  — your one-stop destination for interview tracking process.
        </p>
      </div>

      <h4 className='mt-4 text-gray-700 font-medium flex justify-center'>OUR MISSION</h4>
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
              <TbDeviceDesktopDollar className='h-12 w-12 text-red-400 animate-float' />
            </div>
            <h3 className='text-lg font-semibold my-4'>
              Empower job seekers with seamless tools to efficiently find, track, and secure their dream careers
            </h3>
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
              <FaBook className='h-12 w-12 text-red-400 animate-float' />
            </div>
            <h3 className='text-lg font-semibold my-4'>
              Connect talented individuals with the right opportunities by simplifying the job search and application process
            </h3>
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
              <ImUserCheck className='h-12 w-12 text-red-400 animate-float' />
            </div>
            <h3 className='text-lg font-semibold my-4'>
              Support continuous growth by providing valuable resources and insights to help users excel in every stage of their career journey
            </h3>
          </div>
        </motion.div>
      </div>

      <h4 className='mt-8 text-gray-700 font-medium flex justify-center'>WHY CHOOSE US?</h4>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-8 mb-6'>
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
          viewport={{ once: false }}>
          <div className='bg-white p-6 rounded-xl shadow border text-center transition-all 
                          duration-300 hover:shadow-lg hover:-translate-y-1 dark:bg-gray-800'>
            <div className='flex justify-center'>
              <FaChalkboardUser className='h-12 w-12 text-red-400 animate-float' />
            </div>
            <h3 className='text-lg font-semibold my-4'>
              User-Friendly Interface
            </h3>
            <p>Designed keeping you in mind, easy to access and navigate</p>
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
              <FaLock className='h-12 w-12 text-red-400 animate-float' />
            </div>
            <h3 className='text-lg font-semibold my-4'>
              Data Privacy & Security
            </h3>
            <p>Your information is encrypted and protected</p>
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
              <GiStumpRegrowth className='h-12 w-12 text-red-400 animate-float' />
            </div>
            <h3 className='text-lg font-semibold my-4'>
              Always Evolving
            </h3>
            <p>We’re constantly improving and adding new features to help you do more</p>
          </div>
        </motion.div>
      </div>

    </div>
  )
}

export default About