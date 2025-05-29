import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const JobStatusCards = ({ info }) => {

    const [appliedCount, setAppliedCount] = useState(0);
    const [selectedCount, setSelectedCount] = useState(0);
    const [rejectedCount, setRejectedCount] = useState(0);
    const [offerReceivedCount, setOfferReceivedCount] = useState(0);
    const [applicationRejectedCount, setApplicationRejectedCount] = useState(0);

    const getJobDetails = async () => {
        if (info) {
            try {
                setAppliedCount(info.filter((item) => item.jobStatus === "Applied").length);
                setSelectedCount(info.filter((item) => item.jobStatus === "Selected").length);
                setRejectedCount(info.filter((item) => item.jobStatus === "Rejected").length);
                setOfferReceivedCount(info.filter((item) => item.jobStatus === "Offer Received").length);
                setApplicationRejectedCount(info.filter((item) => item.jobStatus === "Application Rejected").length);
            } catch (error) {
                toast.error(error);
            }
        }
    }

    useEffect(() => {
        getJobDetails();
    }, [info]);

    return (
        <div className='mb-18 px-12 grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5'>
            <div className='flex gap-4 justify-center items-center bg-white border-gray-800 shadow px-16 py-6 
            rounded-lg hover:shadow-2xl'>
                <span>
                    <svg fill='oklch(72.3% 0.219 149.579)' height="42" width="42" version="1.1" id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 512 512" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier"> <g> <g>
                            <path d="M431.279,0H80.721c-5.633,0-10.199,4.566-10.199,10.199v491.602c0,5.633,4.566,10.199,10.199,10.199h266.562 c2.705,0,5.299-1.075,7.212-2.987l83.997-83.998c1.912-1.912,2.987-4.506,2.987-7.212V10.199C441.479,4.566,436.912,0,431.279,0z M357.463,477.197l-0.044-49.258l49.257,0.045L357.463,477.197z M421.081,407.599l-73.862-0.067c-0.003,0-0.006,0-0.009,0 c-2.705,0-5.299,1.075-7.212,2.987c-1.915,1.915-2.99,4.513-2.987,7.222l0.066,73.861H90.92V20.398h330.161V407.599z"></path> </g> </g> <g> <g> <path d="M194.237,85.796c-3.983-3.983-10.441-3.983-14.424,0.001l-30.015,30.015l-7.453-7.454c-3.983-3.983-10.441-3.983-14.424,0 c-3.983,3.983-3.984,10.441,0,14.424l14.664,14.665c1.912,1.912,4.507,2.987,7.212,2.987s5.299-1.075,7.212-2.987l37.227-37.227 C198.219,96.238,198.219,89.779,194.237,85.796z"></path>
                            </g> </g> <g> <g> <path d="M376.867,106.124h-3.576c-5.633,0-10.199,4.566-10.199,10.199s4.566,10.199,10.199,10.199h3.576 c5.633,0,10.199-4.566,10.199-10.199S382.5,106.124,376.867,106.124z"></path> </g> </g> <g> <g> <path d="M340.653,106.124H226.455c-5.633,0-10.199,4.566-10.199,10.199s4.566,10.199,10.199,10.199h114.198 c5.633,0,10.199-4.566,10.199-10.199S346.286,106.124,340.653,106.124z"></path> </g> </g> <g> <g> <path d="M194.237,184.532c-3.983-3.983-10.441-3.983-14.424,0.001l-30.015,30.015l-7.453-7.454 c-3.983-3.983-10.441-3.983-14.424,0c-3.983,3.983-3.984,10.441,0,14.424l14.664,14.665c1.912,1.912,4.507,2.987,7.212,2.987 s5.299-1.075,7.212-2.987l37.227-37.227C198.219,194.974,198.219,188.516,194.237,184.532z"></path> </g> </g> <g> <g> <path d="M376.868,204.859H226.455c-5.633,0-10.199,4.566-10.199,10.199c0,5.633,4.566,10.199,10.199,10.199h150.413 c5.633,0,10.199-4.566,10.199-10.199C387.067,209.425,382.501,204.859,376.868,204.859z"></path> </g> </g> <g> <g>
                                <path d="M194.237,282.954c-3.983-3.983-10.441-3.983-14.424,0.001l-30.015,30.015l-7.453-7.454 c-3.983-3.984-10.441-3.983-14.424,0c-3.983,3.983-3.984,10.441,0,14.424l14.664,14.665c1.912,1.912,4.507,2.987,7.212,2.987 s5.299-1.075,7.212-2.987l37.227-37.227C198.219,293.396,198.219,286.938,194.237,282.954z"></path> </g> </g> <g> <g> <path d="M376.867,303.281H226.455c-5.633,0-10.199,4.566-10.199,10.199c0,5.633,4.566,10.199,10.199,10.199h150.413 c5.632,0,10.198-4.566,10.198-10.199C387.066,307.848,382.5,303.281,376.867,303.281z"></path>
                                </g> </g> </g>
                    </svg>
                </span>
                <div className='flex flex-col'>
                    <span className='text-4xl font-semibold'>{appliedCount}</span>
                    <span className='text-sm font-semibold text-gray-600 whitespace-nowrap'>Total Applies</span>
                </div>
            </div>

            <div className='flex gap-4 justify-center items-center bg-white border-gray-800 shadow px-16 py-8 
            rounded-lg hover:shadow-2xl'>
                <span>
                    <svg fill="#016630" height="42" width="42" version="1.1" id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 512 512" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier"> <g> <g>
                            <path d="M437.019,74.98C388.667,26.628,324.381,0,256,0S123.333,26.628,74.982,74.98C26.628,123.333,0,187.62,0,256 s26.628,132.667,74.982,181.02C123.333,485.372,187.619,512,256,512s132.667-26.628,181.019-74.98 C485.372,388.667,512,324.38,512,256S485.372,123.333,437.019,74.98z M256,491.602c-129.911,0-235.602-105.69-235.602-235.602 S126.089,20.398,256,20.398S491.602,126.089,491.602,256S385.911,491.602,256,491.602z"></path> </g> </g> <g> <g> <path d="M401.592,146.105c-13.918-13.918-36.565-13.918-50.483,0L200.924,296.289l-49.213-49.211 c-13.918-13.918-36.565-13.918-50.483,0c-13.918,13.918-13.918,36.565,0,50.484l74.455,74.454 c6.743,6.742,15.707,10.454,25.241,10.454s18.498-3.713,25.242-10.455l175.426-175.426 C415.509,182.67,415.509,160.022,401.592,146.105z M387.168,182.164L211.743,357.59c-2.89,2.889-6.732,4.482-10.818,4.482 s-7.928-1.592-10.817-4.482l-74.454-74.454c-5.966-5.966-5.966-15.671-0.001-21.636c2.982-2.982,6.9-4.473,10.818-4.473 c3.917,0,7.836,1.492,10.817,4.474l56.424,56.424c3.985,3.983,10.441,3.983,14.425,0l157.395-157.397 c5.966-5.965,15.672-5.965,21.637,0C393.133,166.493,393.133,176.198,387.168,182.164z"></path> </g> </g> <g> <g> <path d="M462.131,298.133c-5.464-1.392-11.011,1.907-12.4,7.366C427.176,394.055,347.512,455.904,256,455.904 c-5.632,0-10.199,4.566-10.199,10.199c0,5.633,4.567,10.199,10.199,10.199c100.847,0,188.64-68.166,213.498-165.769 C470.888,305.076,467.591,299.523,462.131,298.133z"></path> </g> </g> <g> <g> <path d="M466.104,245.802c-5.632,0-10.199,4.566-10.199,10.199c0,2.916-0.063,5.855-0.188,8.739 c-0.244,5.627,4.121,10.387,9.749,10.63c0.15,0.006,0.299,0.009,0.448,0.009c5.43,0,9.945-4.282,10.182-9.759 c0.138-3.175,0.207-6.411,0.207-9.619C476.303,250.368,471.736,245.802,466.104,245.802z"></path> </g> </g> </g>
                    </svg>
                </span>
                <div className='flex flex-col'>
                    <span className='text-4xl font-semibold'>{selectedCount}</span>
                    <span className='text-sm font-semibold text-gray-600 whitespace-nowrap'>Total Selects</span>
                </div>
            </div>

            <div className='flex gap-4 justify-center items-center bg-white border-gray-800 shadow px-16 py-8 
            rounded-lg hover:shadow-2xl'>
                <span>
                    <svg fill='#9f0712' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="42" height="42" viewBox="0 0 50 50">
                        <path d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 37.690466 12.309534 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z M 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 13.390466 46 4 36.609534 4 25 C 4 13.390466 13.390466 4 25 4 z M 32.990234 15.986328 A 1.0001 1.0001 0 0 0 32.292969 16.292969 L 25 23.585938 L 17.707031 16.292969 A 1.0001 1.0001 0 0 0 16.990234 15.990234 A 1.0001 1.0001 0 0 0 16.292969 17.707031 L 23.585938 25 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 25 26.414062 L 32.292969 33.707031 A 1.0001 1.0001 0 1 0 33.707031 32.292969 L 26.414062 25 L 33.707031 17.707031 A 1.0001 1.0001 0 0 0 32.990234 15.986328 z"></path>
                    </svg>
                </span>
                <div className='flex flex-col'>
                    <span className='text-4xl font-semibold'>{rejectedCount}</span>
                    <span className='text-sm font-semibold text-gray-600 whitespace-nowrap'>Total Interview</span>
                    <span className='text-sm font-semibold text-gray-600 whitespace-nowrap'>Rejects</span>
                </div>
            </div>

            <div className='flex gap-4 justify-center items-center bg-white border-gray-800 shadow px-16 py-8 
            rounded-lg hover:shadow-2xl'>
                <span>
                    <svg fill="oklch(55.3% 0.195 38.402)" height="42" width="42" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 511.999 511.999" xmlSpace="preserve">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round"
                            strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g>
                                <path d="M511.999,102.871c0-7.743-3.015-15.022-8.49-20.496l-11.386-11.388c-5.475-5.475-12.755-8.49-20.498-8.49 c-7.743,0-15.022,3.015-20.498,8.49l-53.653,53.653V67.463c0-5.632-4.567-10.199-10.199-10.199H10.199 C4.566,57.263,0,61.831,0,67.463v377.074c0,5.632,4.566,10.199,10.199,10.199h377.075c5.632,0,10.199-4.567,10.199-10.199 l-0.004-215.126l106.04-106.041C508.984,117.895,511.999,110.614,511.999,102.871z M377.075,434.337H20.398V77.663h356.676v67.376 L190.347,331.766c-1.12,1.12-1.963,2.486-2.464,3.987l-18.98,56.939c-1.222,3.665-0.268,7.706,2.464,10.437 c1.944,1.944,4.551,2.987,7.214,2.987c1.079,0,2.167-0.171,3.224-0.523l56.939-18.979c1.502-0.501,2.867-1.344,3.987-2.464 l134.344-134.344V434.337z M230.008,368.024l-35.304,11.767l11.768-35.304l216.563-216.563l23.536,23.536L230.008,368.024z M489.085,108.945l-28.09,28.091l-11.768-11.768L437.46,113.5l28.091-28.091c1.623-1.623,3.779-2.516,6.074-2.516 c2.295,0,4.451,0.893,6.074,2.515l11.387,11.388c0,0.001,0,0.001,0.001,0.001c1.622,1.623,2.515,3.779,2.515,6.073 C491.602,105.166,490.708,107.323,489.085,108.945z"></path> </g> </g> <g> <g> <path d="M318.125,121.009h-9.724c-5.632,0-10.199,4.567-10.199,10.199c0,5.632,4.566,10.199,10.199,10.199h9.724 c5.632,0,10.199-4.567,10.199-10.199C328.325,125.577,323.757,121.009,318.125,121.009z"></path> </g> </g> <g> <g> <path d="M264.103,121.009H78.267c-5.633,0-10.199,4.567-10.199,10.199c0,5.632,4.566,10.199,10.199,10.199h185.837 c5.632,0,10.199-4.567,10.199-10.199C274.302,125.577,269.735,121.009,264.103,121.009z"></path> </g> </g> <g> <g> <path d="M254.379,180.434H78.267c-5.633,0-10.199,4.567-10.199,10.199c0,5.632,4.566,10.199,10.199,10.199h176.113 c5.632,0,10.199-4.567,10.199-10.199C264.579,185.001,260.011,180.434,254.379,180.434z"></path> </g> </g> <g> <g> <path d="M190.633,239.859H78.267c-5.633,0-10.199,4.567-10.199,10.199c0,5.632,4.566,10.199,10.199,10.199h112.367 c5.633,0,10.199-4.567,10.199-10.199C200.833,244.426,196.266,239.859,190.633,239.859z"></path> </g> </g> <g> <g> <path d="M142.014,298.202H78.267c-5.633,0-10.199,4.567-10.199,10.199c0,5.632,4.566,10.199,10.199,10.199h63.746 c5.633,0,10.199-4.567,10.199-10.199C152.212,302.769,147.647,298.202,142.014,298.202z"></path> </g> </g> </g>
                    </svg>
                </span>
                <div className='flex flex-col'>
                    <span className='text-4xl font-semibold'>{offerReceivedCount}</span>
                    <span className='text-sm font-semibold text-gray-600 whitespace-nowrap'>Total Offer</span>
                    <span className='text-sm font-semibold text-gray-600 whitespace-nowrap'>Received</span>
                </div>
            </div>

            <div className='flex gap-4 justify-center items-center bg-white border-gray-800 shadow px-16 py-8 
            rounded-lg hover:shadow-2xl'>
                <span>
                    <svg fill='#82181a' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="42" height="42" viewBox="0 0 128 128">
                        <path d="M64,1C29.26,1,1,29.26,1,64s28.26,63,63,63s63-28.26,63-63S98.74,1,64,1z M7,64C7,32.57,32.57,7,64,7 c14.64,0,28,5.55,38.11,14.65l-80.45,80.45C12.55,92,7,78.64,7,64z M64,121c-14.64,0-28-5.55-38.11-14.65l80.45-80.45 C115.45,36,121,49.36,121,64C121,95.43,95.43,121,64,121z"></path>
                    </svg>
                </span>
                <div className='flex flex-col'>
                    <span className='text-4xl font-semibold'>{applicationRejectedCount}</span>
                    <span className='text-sm font-semibold text-gray-600 whitespace-nowrap'>Total Application</span>
                    <span className='text-sm font-semibold text-gray-600 whitespace-nowrap'>Rejected</span>
                </div>
            </div>

        </div>
    )
}

export default JobStatusCards