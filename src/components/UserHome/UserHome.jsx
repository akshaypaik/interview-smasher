import React, { useEffect, useState } from 'react'
import JobStatusCards from './JobStatusCards'
import UserGraph from './UserGraph';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { GET_QUICK_CAREER_JOB_LINK } from '../../utils/constants/apiConstants';

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
            <JobStatusCards info={dashboardJobDetails} />
            <UserGraph info={dashboardJobDetails} />
        </div>
    )
}

export default UserHome;