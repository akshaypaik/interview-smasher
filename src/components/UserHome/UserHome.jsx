import React, { useEffect, useState } from 'react'
import JobStatusCards from './JobStatusCards'
import UserGraph from './UserGraph';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { GET_QUICK_CAREER_JOB_LINK } from '../../utils/constants/apiConstants';
import UserTips from './UserTips';
import './UserHome.css';

const UserHome = () => {

    const userInfo = useSelector((store) => store.app.userInfo);
    const [dashboardJobDetails, setDashboardJobDetails] = useState([]);

    const getJobDetails = async () => {
        if (userInfo?.email) {
            try {
                const userEmail = userInfo?.email;
                const { data } = await axios.get(`${GET_QUICK_CAREER_JOB_LINK}${userEmail}`);
                setDashboardJobDetails(data);
            } catch (error) {
                toast.error(error);
            }
        }
    }

    useEffect(() => {
        getJobDetails();
    }, []);

    return (
        <div>
            <div className='font-semibold text-2xl my-8 dark:text-gray-400'>Your Personalised Dashboard</div>
            <JobStatusCards info={dashboardJobDetails} />
            <div className='dashboard-graph-tip-container mx-8'>
                <UserGraph info={dashboardJobDetails} />
                <UserTips info={dashboardJobDetails} />
            </div>
        </div>
    )
}

export default UserHome;