import React, { useEffect, useState } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

const UserGraph = ({ info }) => {

    const [chartData, setChartData] = useState([]);
    const [showByWeeks, setShowByWeeks] = useState(true);

    useEffect(() => {
        if (info && info?.length > 0) {
            const totalActivityCount = info.length;
            if (showByWeeks) {
                calculateWeekData(totalActivityCount);
            }
        }
    }, [info]);

    const calculateWeekData = (totalActivityCount) => {
        const now = new Date();
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        const weekData = [];
        const data = info.map((item) => {
            if (new Date(item.createdOn) > oneWeekAgo && new Date(item.createdOn) < now) {
                weekData.push(item);
            }
        });
        console.log("weekData: ", weekData);

        const { appliedCount, selectedCount, rejectedCount, offerReceivedCount, applicationRejectedCount,
            interviewDoneCount, interviewScheduledCount, yetToApplyCount, saveOnlyCount
        } = calculateSpecificJobStatusCount(weekData);

        const totalWeekActivityCount = weekData.length;
        const successRate = selectedCount + offerReceivedCount + interviewDoneCount + interviewScheduledCount;
        const failureRate = rejectedCount + applicationRejectedCount;
        const noActionRate = yetToApplyCount + saveOnlyCount + appliedCount;

        const total = successRate + failureRate;
        const successPercentage = totalActivityCount > 0 ? (successRate / totalWeekActivityCount) * 100 : 0;
        const failurePercentage = totalActivityCount > 0 ? (failureRate / totalWeekActivityCount) * 100 : 0;
        const noActionPercentage = totalActivityCount > 0 ? (noActionRate / totalWeekActivityCount) * 100 : 0;
        const weekChartData = [];
        const updatedData = {
            name: `${formatDate(oneWeekAgo)} to ${formatDate(now)}`,
            successPercentage: parseFloat(successPercentage.toFixed(2)),
            failurePercentage: parseFloat(failurePercentage.toFixed(2)),
            noActionPercentage: parseFloat(noActionPercentage.toFixed(2)),
            totalPercentage: 100
        }
        weekChartData.push(updatedData);
        setChartData(weekChartData);
    }

    const calculateSpecificJobStatusCount = (data) => {
        const appliedCount = data.filter((item) => item.jobStatus === "Applied").length;
        const selectedCount = data.filter((item) => item.jobStatus === "Selected").length;
        const rejectedCount = data.filter((item) => item.jobStatus === "Rejected").length;
        const offerReceivedCount = data.filter((item) => item.jobStatus === "Offer Received").length;
        const applicationRejectedCount = data.filter((item) => item.jobStatus === "Application Rejected").length;
        const interviewDoneCount = data.filter((item) => item.jobStatus === "Interview Done").length;
        const interviewScheduledCount = data.filter((item) => item.jobStatus === "Interview Scheduled").length;
        const yetToApplyCount = data.filter((item) => item.jobStatus === "Yet to Apply").length;
        const saveOnlyCount = data.filter((item) => item.jobStatus === "Save Only").length;

        return {
            appliedCount, selectedCount, rejectedCount, offerReceivedCount, applicationRejectedCount, interviewDoneCount,
            interviewScheduledCount, yetToApplyCount, saveOnlyCount
        }
    }

    return (
        <div className='lg:w-[1000px] lg:h-[300px] md:w-[800px] md:h-[300px] sm:w-[300px] sm:h-[300px] bg-white p-4 
        rounded-lg shadow border'>
            <div className='font-semibold mb-4'>Success vs Failure vs No Actions</div>
            {chartData.length > 0 && <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={chartData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis><Label
                        value="Percentage"
                        angle={-90}
                        position="insideLeft"
                        style={{ textAnchor: 'middle' }}
                    /></YAxis>
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="successPercentage" name="Success" barSize={20} fill='oklch(52.7% 0.154 150.069)' />
                    <Bar dataKey="failurePercentage" name="Failure" barSize={20} fill='oklch(57.7% 0.245 27.325)' />
                    <Bar dataKey="noActionPercentage" name="No Actions" barSize={20} fill='oklch(55.1% 0.027 264.364)' />
                </BarChart>
            </ResponsiveContainer>}
        </div>
    )
}

export default UserGraph;

const formatDate = (date) =>
    new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
    }).format(date);