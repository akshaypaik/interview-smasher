import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
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
import axios from "axios";
import { DELETE_QUICK_CAREER_JOB_LINK } from "../../utils/constants/apiConstants";
import toast from "react-hot-toast";

export default function DeleteComponentCareerLinks({ info, getJobLinkDetails }) {

    const [alertDialogOpen, setAlertDialogOpen] = useState(false);

    const handleDeleteJobLink = () => {
        setAlertDialogOpen(true);
    }

    const handleDeleteConfirmed = async() => {
        try{
            const { data } = await axios.post(DELETE_QUICK_CAREER_JOB_LINK, info);
            getJobLinkDetails(true);
            setAlertDialogOpen(false);
        }catch(error){
            toast.error(error);
            setAlertDialogOpen(false);
        }
    }

    const handleAlertCancel = () => {
        setAlertDialogOpen(false);
    }

    return (
        <>
            <div className='cursor-pointer hover:text-red-600' onClick={handleDeleteJobLink}>
                <FaTrashAlt />
            </div>
            <AlertDialog open={alertDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you sure? Do you want to delete {info?.company} with Job ID: {info?.jobID} ?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Please select yes to proceed.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer" onClick={handleAlertCancel}>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="cursor-pointer" onClick={handleDeleteConfirmed}>Yes</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}