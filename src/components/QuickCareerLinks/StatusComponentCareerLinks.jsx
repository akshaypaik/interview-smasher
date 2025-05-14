import axios from "axios";
import { useState } from "react";
import { PUT_QUICK_CAREER_JOB_LINK_STATUS } from "../../utils/constants/apiConstants";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import quickCareerJobLinkStatus from './../../utils/constants/json/quickCareerJobLinkStatus.json';

export default function StatusComponentCareerLinks({ info, getJobLinkDetails }) {

    const [statusVal, setStatusVal] = useState(info?.jobStatus);
    const [alertDialogOpen, setAlertDialogOpen] = useState(false);

    const setStylesForStatus = (params) => {
        const style = {
            textAlign: 'center', borderRadius: '8px', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontWeight: 600, height: '32px'
        };
        if (params === "Yet to Apply") {
            style.backgroundColor = "#f5af19";
        }
        if (params === "Applied") {
            style.backgroundColor = "#38ef7d";
        }
        if (params === "Save Only") {
            style.backgroundColor = "#00B4DB";
        }
        if (params === "Interview Done") {
            style.backgroundColor = "#CF601B";
        }
        if (params === "Selected") {
            style.backgroundColor = "#008000";
        }
        if (params === "Rejected") {
            style.backgroundColor = "#ED213A";
        }
        if (params === "Offer Received") {
            style.backgroundColor = "#a8ff78";
        }
        return style;
    }

    const handleStatusChange = (value) => {
        setStatusVal(value);
        setAlertDialogOpen(true);
    }

    const handleAlertCancel = () => {
        setStatusVal(info?.jobStatus);
        setAlertDialogOpen(false);
    }

    const handleStatusChangeYes = async () => {
        const updatedData = {
            ...info,
            jobStatus: statusVal
        }
        try {
            const { data } = await axios.put(PUT_QUICK_CAREER_JOB_LINK_STATUS, updatedData);
            getJobLinkDetails();
            setAlertDialogOpen(false);
        } catch (error) {
            toast.error(error);
            setAlertDialogOpen(false);
        }
    }

    return (
        <>
            <div style={{ ...setStylesForStatus(statusVal), width: '100%' }}>
                <select style={{ outline: 'none', cursor: 'pointer' }}
                    value={statusVal} onChange={(e) =>
                        handleStatusChange(e.target.value)}>
                    {quickCareerJobLinkStatus.map((status) => {
                        return <option key={status.id} className='cursor-pointer'>{status.displayName}</option>
                    })}
                </select>
            </div>
            <AlertDialog open={alertDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Do you want to change the status of {info.company}({info.jobID}) to "{statusVal}"?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            If yes, {info.company}({info.jobID}) will be marked as {statusVal}.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer" onClick={handleAlertCancel}>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="cursor-pointer" onClick={handleStatusChangeYes}>Yes</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}