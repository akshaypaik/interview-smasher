import React, { useEffect } from 'react'

const UserTips = ({ info }) => {

    useEffect(() => {
        if (info && info.length) {
            
        }
    }, [info]);

    return (
        <div className='bg-white shadow border rounded-lg w-2/6'>
            <div className='font-semibold px-4 py-2 text-2xl'>Tips</div>
            <hr className='border-gray-50' />
        </div>
    )
}

export default UserTips