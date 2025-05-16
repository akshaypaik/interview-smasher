import { useState } from "react";
import { FaPencil } from "react-icons/fa6";
import { FaFloppyDisk } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
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
import { UPDATE_QUICK_CAREER_JOB_LINK } from "../../utils/constants/apiConstants";
import toast from "react-hot-toast";

const EditAndSaveComponentCareerLinks = ({ isEditRow, setIsEditRow, info, getJobLinkDetails, gridRef, rowIndex }) => {
    const [alertDialogOpen, setAlertDialogOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(isEditRow);

    const handleEditClick = () => {
        if (gridRef && gridRef.current && typeof rowIndex === 'number') {
            setIsEdit(prev => !prev);
            gridRef.current.api.startEditingCell({
                rowIndex: rowIndex,
                colKey: 'jobRole'
            });
        }
    };

    const handleSave = () => {
        setAlertDialogOpen(true);
    }

    const handleSaveConfirmed = async () => {
        setIsEdit(true);
        setAlertDialogOpen(false);
        stopEditing();
        try {
            const { data } = await axios.put(UPDATE_QUICK_CAREER_JOB_LINK, info);
            getJobLinkDetails(true);
            setAlertDialogOpen(false);
        } catch (error) {
            toast.error(error);
            setAlertDialogOpen(false);
        }
    }

    const stopEditing = () => {
        setIsEdit(true);
        gridRef.current.api.stopEditing();
    }

    const handleAlertCancel = () => {
        setAlertDialogOpen(false);
    }

    return (
        <>
            <div className='cursor-pointer'>
                {isEdit ? <FaPencil title="Edit" className="hover:text-blue-800" onClick={handleEditClick} /> :
                    <div className="flex gap-2">
                        <ImCross title="Cancel" className="hover:text-red-800" onClick={stopEditing} />
                        <FaFloppyDisk title="Save" className="hover:text-green-800" onClick={handleSave} />
                    </div>}
            </div>
            <AlertDialog open={alertDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you sure? Do you want to edit {info?.company} ?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Please select yes to proceed.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer" onClick={handleAlertCancel}>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="cursor-pointer" onClick={handleSaveConfirmed}>Yes</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default EditAndSaveComponentCareerLinks