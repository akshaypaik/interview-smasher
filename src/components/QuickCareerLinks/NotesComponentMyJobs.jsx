import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Tiptap from './TipTap';
import { UPDATE_QUICK_CAREER_JOB_LINK } from '../../utils/constants/apiConstants';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaTimesCircle } from 'react-icons/fa';
import { getFullDateFormatted } from '../../utils/helper';

const NotesComponentMyJobs = ({ info, getJobLinkDetails }) => {

    const [content, setContent] = useState();
    const [isReset, setIsReset] = useState(false);
    const [patchContent, setPatchContent] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [showSaveAlert, setShowSaveAlert] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onNotesContentUpdate = (content) => {
        setContent(content);
    }

    const setReset = () => {
        setIsReset(true);
        setPatchContent("");
        setTimeout(() => {
            setIsReset(false);
        }, 0);
    }

    useEffect(() => {
        setPatchContent(info?.notes);
    }, [info]);

    const onSave = async () => {
        setIsLoading(true);
        const updatedData = {
            ...info,
            notes: content,
            notesSavedOn: new Date().toISOString()
        };
        try {
            const { data } = await axios.put(UPDATE_QUICK_CAREER_JOB_LINK, updatedData);
            getJobLinkDetails(true);
            setIsLoading(false);
        } catch (error) {
            toast.error(error);
            setIsLoading(false);
        }
    }

    const handleClose = () => setOpenDialog(false);

    const handleAlertCancel = () => {
        setShowSaveAlert(false);
    }

    return (
        <div className='flex flex-col relative'>
            <div className='border-1 border-blue-600 px-6 py-1 cursor-pointer rounded-lg'>
                {/* <Tiptap onContentChange={(content) => { onNotesContentUpdate(content) }} isReset={isReset} /> */}
                <button className='text-blue-800 cursor-pointer font-semibold'
                    onClick={() => setOpenDialog(true)}>Add Notes</button>

                {/* Dialog to edit notes  */}
                <Dialog open={openDialog}
                    slotProps={{
                        paper: {
                            style: {
                                width: '960px',      // Set your desired width
                                height: '600px',     // Set your desired height
                                maxWidth: '100%',
                                maxHeight: '100%',
                            },
                        },
                    }} onClose={handleClose} >
                    <DialogTitle>
                        <div className='flex justify-between items-center'>
                            <span className="text-lg font-semibold">
                                Notes
                            </span>
                            <span>Last saved on: {getFullDateFormatted(info?.notesSavedOn)}</span>
                            <FaTimesCircle size={36} className='hover:text-red-600 cursor-pointer'
                                onClick={() => setOpenDialog(false)} />
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <Tiptap onContentChange={(content) => { onNotesContentUpdate(content) }} isReset={isReset}
                            patchContent={patchContent} />
                        <div className='w-full flex justify-center'>
                            <button type='submit' className='mt-4 mr-4 px-8 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 cursor-pointer'
                                onClick={() => setShowSaveAlert(true)}>
                                Save
                            </button>
                            <button type='button' className='mt-4 mr-4 px-8 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 
                        cursor-pointer' onClick={setReset}>
                                Clear
                            </button>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* Save confirmation dialog */}
                <Dialog open={showSaveAlert}>
                    <DialogTitle>
                        <span className="text-lg font-semibold">
                            Do you want to proceed with the changes ?
                        </span>
                    </DialogTitle>
                    <DialogActions>
                        <Button className="cursor-pointer" onClick={handleAlertCancel}>
                            <span className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md 
                            text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 
                            aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground 
                            dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3 cursor-pointer text-black">
                                Cancel
                            </span>
                        </Button>
                        <Button className="cursor-pointer" onClick={onSave} disabled={isLoading}>
                            <span className="bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 
                        px-4 py-2 rounded-md text-sm">
                                Yes
                            </span>
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            {info?.notes && <span className='absolute left-4 max-h-2 text-xs font-semibold'>Notes Available</span>}
        </div>
    )
}

export default NotesComponentMyJobs;


