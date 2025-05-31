import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Tiptap from './TipTap';
import { UPDATE_QUICK_CAREER_JOB_LINK } from '../../utils/constants/apiConstants';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaTimesCircle } from 'react-icons/fa';

const NotesComponentMyJobs = ({ info, getJobLinkDetails }) => {

    const [content, setContent] = useState();
    const [isReset, setIsReset] = useState(false);
    const [patchContent, setPatchContent] = useState("");
    const [openDialog, setOpenDialog] = useState(false);

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
        const updatedData = {
            ...info,
            notes: content
        };
        try {
            const { data } = await axios.put(UPDATE_QUICK_CAREER_JOB_LINK, updatedData);
            getJobLinkDetails(true);
        } catch (error) {
            toast.error(error);
        }
    }

    return (
        <div className='border-1 border-blue-600 px-6 py-1 cursor-pointer rounded-lg'>
            {/* <Tiptap onContentChange={(content) => { onNotesContentUpdate(content) }} isReset={isReset} /> */}
            <button className='text-blue-800 cursor-pointer font-semibold'
                onClick={() => setOpenDialog(true)}>Add Notes</button>

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
                }}>
                <DialogTitle>
                    <div className='flex justify-between items-center'>
                        <span className="text-lg font-semibold">
                            Notes
                        </span>
                        <FaTimesCircle size={36} className='hover:text-red-600 cursor-pointer' 
                        onClick={() => setOpenDialog(false)} />
                    </div>
                </DialogTitle>
                <DialogContent>
                    <Tiptap onContentChange={(content) => { onNotesContentUpdate(content) }} isReset={isReset}
                        patchContent={patchContent} />
                    <div className='w-full flex justify-center'>
                        <button type='submit' className='mt-4 mr-4 px-8 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 cursor-pointer'
                            onClick={onSave}>
                            Save
                        </button>
                        <button type='button' className='mt-4 mr-4 px-8 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 
                        cursor-pointer' onClick={setReset}>
                            Clear
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default NotesComponentMyJobs;


