import React, { useCallback, useEffect, useRef, useState } from 'react';
import './QuickCareerLinks.css';
import { AgGridReact } from 'ag-grid-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { GET_QUICK_CAREER_JOB_LINK, POST_QUICK_CAREER_JOB_LINK } from '../../utils/constants/apiConstants';
import axios from 'axios';
import { useSelector } from 'react-redux';
import quickCareerJobLinkStatus from './../../utils/constants/json/quickCareerJobLinkStatus.json';

const QuickCareerLinks = () => {

    // Row Data: The data to be displayed.
    const [rowData, setRowData] = useState([]);

    const openJobLink = (params) => {
        if (!params.data.jobLink) {
            return null;
        }
        const url = params.data.jobLink;
        window.open(url, "_blank");
    }

    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState([
        { headerName: "Company", field: "company", minWidth: 240 },
        { headerName: "Role", field: "jobRole", minWidth: 240 },
        { headerName: "Location", field: "jobLocation", minWidth: 200 },
        { headerName: "Job ID", field: "jobID", minWidth: 200 },
        {
            headerName: "Job Link", field: "jobLink", minWidth: 300,
            onCellClicked: openJobLink.bind(this),
            cellStyle: params => {
                if (params?.value) {
                    return { color: '#337ab7', textDecoration: 'underline', cursor: 'pointer', textUnderlineOffset: '4px' }
                }
            }
        },
        {
            headerName: "Status", field: "jobStatus", minWidth: 200,
            cellStyle: params => setStylesForStatus(params)
        }
    ]);

    const [defaultColDef, setDefaultColDef] = useState({
        flex: 1,
        minWidth: 100,
        filter: true
    });
    const [dialogOpen, setDialogOpen] = useState(false);

    const gridRef = useRef(null);
    const { register, handleSubmit, formState, reset } = useForm();
    const userInfo = useSelector((store) => store.app.userInfo);

    const onFilterTextBoxChanged = useCallback(() => {
        gridRef.current.api.setGridOption(
            "quickFilterText",
            document.getElementById("filter-text-box").value,
        );
    }, []);

    const setStylesForStatus = (params) => {
        const style = { textAlign: 'center' };
        if (params?.value === "Yet to Apply") {
            style.backgroundColor = "#f5af19";
        }
        if (params?.value === "Applied") {
            style.backgroundColor = "#38ef7d";
        }
        if (params?.value === "Save Only") {
            style.backgroundColor = "#00B4DB";
        }
        return style;
    }

    const handleSaveEvent = () => {
        setDialogOpen(false);
    }

    const onAddClick = () => {
        setDialogOpen(true);
    }

    const handleJobDetailsSubmit = async (formData) => {
        if (formData) {
            const modifiedFormData = {
                ...formData,
                user: {
                    email: userInfo?.email,
                    phoneNumber: userInfo?.phoneNumber
                }
            }
            try {
                const { data } = await axios.post(POST_QUICK_CAREER_JOB_LINK, modifiedFormData);
                reset();
                toast.success("Job details added.");
                setDialogOpen(false);
                getJobLinkDetails();
            } catch (error) {
                toast.error("Job details adding failed. Please try again later.");
            }
        }
    }

    const getJobLinkDetails = async () => {
        try {
            const userEmail = userInfo?.email;
            const { data } = await axios.get(`${GET_QUICK_CAREER_JOB_LINK}${userEmail}`);
            setRowData(data);
        } catch (error) {
            toast.error(error);
        }
    }

    useEffect(() => {
        getJobLinkDetails();
    }, []);

    return (
        <div className='lg:m-2 md:m-2 w-4/5'>
            <div className='quick-search-header'>
                <h1 className='font-bold text-2xl'>Quick Career Links</h1>
                <div className='flex gap-4'>
                </div>
            </div>
            <div>
                <div className='my-4 mx-6 flex justify-between'>
                    <input
                        type="text"
                        id="filter-text-box"
                        placeholder="Search Filter..."
                        className='bg-neutral-200 shadow-2xl py-2 px-4 rounded-xl dark:bg-gray-700 w-1/4'
                        onInput={onFilterTextBoxChanged}
                    />
                    <div>
                        <button className='bg-green-700 rounded-xl py-2 px-8 cursor-pointer hover:bg-white 
                        add-btn text-white' onClick={onAddClick}>
                            Add
                        </button>
                    </div>
                </div>
                <div style={{ height: '70vh', width: '100%', margin: '24px' }}>
                    <AgGridReact
                        ref={gridRef}
                        rowData={rowData}
                        columnDefs={colDefs}
                        defaultColDef={defaultColDef}
                    />
                </div>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen} disableEnforceFocus className="w-[800px]">
                    <DialogContent className="w-full">
                        <DialogHeader>
                            <DialogTitle>Add Link</DialogTitle>
                            <DialogDescription>
                                Enter details for your job details.
                            </DialogDescription>
                        </DialogHeader>
                        <form className="grid gap-4 py-4" onSubmit={handleSubmit(handleJobDetailsSubmit)}>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="company" className="text-right">
                                    Company
                                </Label>
                                <Input id="company" placeholder="Company" className="col-span-3" {...register("company", {
                                    required: "This field is required"
                                })} />
                                <Label htmlFor="jobRole" className="text-right">
                                    Role
                                </Label>
                                <Input id="jobRole" placeholder="Job Role" className="col-span-3" {...register("jobRole", {
                                    required: "This field is required"
                                })} />
                                <Label htmlFor="jobLocation" className="text-right">
                                    Location
                                </Label>
                                <Input id="jobLocation" placeholder="Job Location" className="col-span-3" {...register("jobLocation", {
                                    required: "This field is required"
                                })} />
                                <Label htmlFor="jobID" className="text-right">
                                    Job ID
                                </Label>
                                <Input id="jobID" placeholder="Job ID" className="col-span-3" {...register("jobID", {
                                    required: "This field is required"
                                })} />
                                <Label htmlFor="jobLink" className="text-right">
                                    Job Link
                                </Label>
                                <Input id="jobLink" placeholder="Link" className="col-span-3" {...register("jobLink", {
                                    required: "This field is required"
                                })} />
                                <Label htmlFor="jobStatus" className="text-right">
                                    Status
                                </Label>
                                <select id='jobStatus' className='w-[240px] hover:cursor-pointer border-2 rounded-xl px-2 py-2'
                                    {...register("jobStatus", {
                                        required: "This field is required"
                                    })}>
                                    {quickCareerJobLinkStatus.map((status) => {
                                        return <option>{status.displayName}</option>
                                    })}
                                </select>
                            </div>
                            <DialogFooter>
                                <Button type="submit" className="hover:cursor-pointer">Save Job</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default QuickCareerLinks;