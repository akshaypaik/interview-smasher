import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const UserTips = ({ info }) => {

    const userDashboardGraphData = useSelector((store) => store.dashboard.userDashboardGraphData);
    const [isFailureHigh, setIsFailureHigh] = useState(false);
    const [noActionHigh, setNoActionHigh] = useState(false);

    useEffect(() => {
        if (Object.entries(userDashboardGraphData).length > 0) {
            if (userDashboardGraphData.failurePercentage > userDashboardGraphData.successPercentage) {
                setIsFailureHigh(true);
            } else {
                setIsFailureHigh(false);
            }
            if (userDashboardGraphData.noActionPercentage > userDashboardGraphData.failurePercentage &&
                userDashboardGraphData.noActionPercentage > userDashboardGraphData.successPercentage) {
                setNoActionHigh(true);
            } else {
                setNoActionHigh(false);
            }
        }
    }, [userDashboardGraphData]);

    return (
        <div className='bg-white shadow border rounded-lg w-full dark:bg-gray-800'>
            <div className='font-semibold px-4 py-2 text-2xl'>Tips</div>
            <hr className='border-gray-50' />
            <ul className='p-8 text-gray-500 list-decimal'>
                {/* No tips yet. */}
                {isFailureHigh && <li>
                    Your application success rate appears to be low.
                    Consider applying with a referral and tailoring your resume to match each job description.
                </li>}
                {noActionHigh && <li>
                    Several of your applications are in 'Applied', 'Yet to Apply', or 'Saved Only' status.
                    Follow up for feedback where possible and prioritize submitting the saved applications.
                </li>}
                {!isFailureHigh && !noActionHigh && <span>
                    No tips yet.
                </span>}
            </ul>
        </div>
    )
}

export default UserTips