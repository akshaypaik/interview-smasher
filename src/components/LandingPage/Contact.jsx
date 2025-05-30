"use client";
import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { motion } from 'framer-motion';

const Contact = () => {
    return (
        <div className='mb-8'>
            <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0 }}
                viewport={{ once: false }}>
                <span className="text-4xl font-semibold flex justify-center">
                    Contact Us
                </span>
                <h4 className='mt-4 text-gray-700 font-medium flex justify-center'>
                    Please drop a message. We will get back soon.
                </h4>
            </motion.div>
            <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0 }}
                viewport={{ once: false }}>
                <form className='flex flex-col items-center'>
                    <div>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': {
                                    m: 1, width: {
                                        xs: '90vw',   // extra-small screens
                                        sm: '40ch',   // small screens
                                        md: '40ch',   // medium screens
                                        lg: '45ch',   // large screens
                                        xl: '50ch',   // extra-large screens
                                    },
                                    input: { color: 'black' },
                                    '.dark & input': {
                                        color: 'white',
                                    },
                                    '.dark & label': {
                                        color: 'white',
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'gray',
                                        },
                                        '.dark & .focus fieldset': {
                                            borderColor: 'white',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'lightgray',
                                        },
                                        
                                    },
                                }
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField className='dark:bg-gray-800 dark:text-white rounded-lg' id="outlined-basic" label="Name" variant="outlined" />
                        </Box>
                    </div>
                    <div>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': {
                                    m: 1, width: {
                                        xs: '90vw',   // extra-small screens
                                        sm: '40ch',   // small screens
                                        md: '40ch',   // medium screens
                                        lg: '45ch',   // large screens
                                        xl: '50ch',   // extra-large screens
                                    },
                                    input: { color: 'black' },
                                    '.dark & input': {
                                        color: 'white',
                                    },
                                    '.dark & label': {
                                        color: 'white',
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'gray',
                                        },
                                        '.dark & .focus fieldset': {
                                            borderColor: 'white',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'lightgray',
                                        }
                                    },
                                }
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField className='dark:bg-gray-800 dark:text-white rounded-lg' id="outlined-basic" label="Email" variant="outlined" />
                        </Box>
                    </div>
                    <div>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': {
                                    m: 1, width: {
                                        xs: '90vw',   // extra-small screens
                                        sm: '40ch',   // small screens
                                        md: '40ch',   // medium screens
                                        lg: '45ch',   // large screens
                                        xl: '50ch',   // extra-large screens
                                    },
                                    input: { color: 'black' },
                                    '.dark & input': {
                                        color: 'white',
                                    },
                                    '.dark & label': {
                                        color: 'white',
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'gray',
                                        },
                                        '.dark & .focus & fieldset': {
                                            borderColor: 'white',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'lightgray',
                                        }
                                    },
                                }
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                id="outlined-multiline-static"
                                label="Message"
                                multiline
                                rows={4}
                                className='dark:bg-gray-800 dark:text-white rounded-lg'
                            />
                        </Box>
                    </div>
                    <button className='px-16 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 cursor-pointer'>
                        Send
                    </button>
                </form>
            </motion.div>
        </div>
    )
}

export default Contact;