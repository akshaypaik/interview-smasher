import React, { useEffect } from 'react'

const UserTips = ({ info }) => {

    useEffect(() => {
        if (info && info.length) {
            
        }
    }, [info]);

    return (
        <div className='bg-white shadow border rounded-lg w-full'>
            <div className='font-semibold px-4 py-2 text-2xl'>Tips</div>
            <hr className='border-gray-50' />
            <div className='p-4 text-gray-500'>
                No tips yet.
            </div>
        </div>
    )
}

export default UserTips