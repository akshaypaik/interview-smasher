import axios from "axios";
import { useState } from "react";
import { PUT_QUICK_CAREER_JOB_LINK_STATUS } from "../../utils/constants/apiConstants";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import quickCareerJobLinkStatus from './../../utils/constants/json/quickCareerJobLinkStatus.json';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function StatusComponentCareerLinks({ info, getJobLinkDetails }) {

    const [statusVal, setStatusVal] = useState(info?.jobStatus);
    const [alertDialogOpen, setAlertDialogOpen] = useState(false);
    const [interviewDateTime, setInterviewDateTime] = useState(null);

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
        if (params === "Application Rejected") {
            style.backgroundColor = "#A43931";
        }
        if (params === "Interview Scheduled") {
            style.backgroundColor = "#CF601B";
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
        if(interviewDateTime){
            updatedData["createdOn"] = new Date(interviewDateTime).toISOString()
        }
        try {
            const { data } = await axios.put(PUT_QUICK_CAREER_JOB_LINK_STATUS, updatedData);
            getJobLinkDetails(true);
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
            <Dialog open={alertDialogOpen}>
                <DialogTitle>
                    <span className="text-lg font-semibold">
                        Do you want to change the status of {info.company}({info.jobID}) to "{statusVal}"?
                    </span>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText >
                        {statusVal === "Interview Scheduled" && <span className="my-2 flex">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker className="pointer-events-auto" label="Date and time of interview"
                                    disablePortal={false}
                                    value={interviewDateTime}
                                    onChange={setInterviewDateTime} />
                            </LocalizationProvider>
                        </span>}
                        <span className="text-muted-foreground text-sm"> If yes, {info.company}({info.jobID}) will be marked as {statusVal}.</span>
                    </DialogContentText>
                    <DialogActions>
                        <Button className="cursor-pointer" onClick={handleAlertCancel}>
                            <span className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md 
                            text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 
                            aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground 
                            dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3 cursor-pointer text-black">
                                Cancel
                            </span>
                        </Button>
                        <Button className="cursor-pointer" onClick={handleStatusChangeYes}>
                            <span className="bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 px-4 py-2 rounded-md text-sm">
                                Yes
                            </span>
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    )
}