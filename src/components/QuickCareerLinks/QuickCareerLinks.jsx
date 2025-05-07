import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
import { GET_QUICK_CAREER_JOB_LINK, GET_SEARCH_QUERY_RESULT_COMPANIES_FOR_INTERVIEW, POST_QUICK_CAREER_JOB_LINK, PUT_QUICK_CAREER_JOB_LINK_STATUS_APPLIED } from '../../utils/constants/apiConstants';
import axios from 'axios';
import { useSelector } from 'react-redux';
import quickCareerJobLinkStatus from './../../utils/constants/json/quickCareerJobLinkStatus.json';
import quickCareerJobLinkRoles from './../../utils/constants/json/quickCareerJobLinkRoles.json';
import quickCareerJobLinkLocations from './../../utils/constants/json/quickCareerJobLinkLocations.json';
import QuickCareerLinksDropDowns from './QuickCareerLinksDropDowns';
import { getDateFormatted } from '../../utils/helper';
import { themeQuartz } from "ag-grid-community";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import quickFilterCareerLinkOptions from "../../utils/constants/json/quickFilterCareerLinkOptions.json"
import SlidderToggle from '../Shared/SlidderToggle/SlidderToggle';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function IconComponent({ info }) {
    return <span className='flex gap-2'>
        {/* {info.companyIconURL ? <img src={info.companyIconURL} alt='company-icon' className='h-8' /> : info.displayName} */}

        {info.companyIconURL ?
            <Tooltip>
                <TooltipTrigger asChild>
                    <img src={info.companyIconURL} alt='company-icon' className='h-8' />
                </TooltipTrigger>
                <TooltipContent side="right" align="center">
                    {info.displayName}
                </TooltipContent>
            </Tooltip>
            :
            info.displayName
        }
    </span>
}

const QuickCareerLinks = () => {

    // Row Data: The data to be displayed.
    const [rowData, setRowData] = useState([]);
    const [filteredRowData, setFilteredRowData] = useState([]);

    const openJobLink = (params) => {
        setNavJobLinkCompany(params.data);
        if (!params.data.jobLink) {
            return null;
        }
        const url = params.data.jobLink;
        window.open(url, "_blank");
        if(params.data.jobStatus != "Applied"){
            setAlertDialogOpen(true);
        }
    }

    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState([
        {
            headerName: "Company", field: "company", minWidth: 240,
            cellRenderer: "iconComponent",
            cellRendererParams: (params) => ({
                info: {
                    companyIconURL: params.data.companyIconURL,
                    displayName: params.data.company,
                },
            })
        },
        { headerName: "Role", field: "jobRole", minWidth: 240 },
        { headerName: "Location", field: "jobLocation", minWidth: 200 },
        {
            headerName: "Job ID", field: "jobID", minWidth: 200,
            cellStyle: params => {
                if (params?.value) {
                    return { fontWeight: 600 }
                }
            }
        },
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
        },
        {
            headerName: "Created On", field: "createdOn", minWidth: 200,
        }
    ]);

    const myTheme = themeQuartz.withParams({
        fontFamily: 'Roboto Slab',
        headerFontFamily: "Rubik",
        cellFontFamily: "Roboto Slab",
    });
    const theme = useMemo(() => {
        return myTheme;
    }, []);
    const pagination = true;
    const paginationPageSize = 10;
    const paginationPageSizeSelector = [10, 25, 50, 100];
    const [defaultColDef, setDefaultColDef] = useState({
        flex: 1,
        minWidth: 100,
        filter: true
    });
    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [alertDialogOpen, setAlertDialogOpen] = useState(false);

    const [companyText, setCompanyText] = useState("");
    const [filteredCompany, setFilteredCompany] = useState([]);
    const [quickCareerJobLinkCompanies, setQuickCareerJobLinkCompanies] = useState([]);
    const [roleText, setRoleText] = useState("");
    const [filteredRoles, setFilteredRoles] = useState([]);
    const [locationText, setLocationText] = useState("");
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [enableQuickFilter, setEnableQuickFilter] = useState({});
    const [navJobLinkCompany, setNavJobLinkCompany] = useState("");

    const gridRef = useRef(null);
    const { register, handleSubmit, formState, reset } = useForm();
    const { errors } = formState;
    const userInfo = useSelector((store) => store.app.userInfo);

    const onFilterTextBoxChanged = useCallback(() => {
        gridRef.current.api.setGridOption(
            "quickFilterText",
            document.getElementById("filter-text-box").value,
        );
    }, []);

    const setStylesForStatus = (params) => {
        const style = { textAlign: 'center', borderRadius: '8px' };
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
        const date = Date.now();
        if (formData) {
            const modifiedFormData = {
                ...formData,
                company: companyText,
                jobRole: roleText,
                jobLocation: locationText,
                user: {
                    email: userInfo?.email,
                    phoneNumber: userInfo?.phoneNumber
                },
                createdOn: new Date(date).toISOString()
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
            setLoading(true);
            const userEmail = userInfo?.email;
            const { data } = await axios.get(`${GET_QUICK_CAREER_JOB_LINK}${userEmail}`);
            data.map((entry) => {
                return entry.createdOn = getDateFormatted(entry.createdOn);
            })
            setRowData(data);
            setFilteredRowData(data);
            setLoading(false);
        } catch (error) {
            toast.error(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getJobLinkDetails();
    }, []);

    useEffect(() => {
        let trueFound = false;
        Object.keys(enableQuickFilter).forEach(key => {
            if (enableQuickFilter[key] === true) {
                trueFound = true;
                const updatedData = rowData.filter((item) => item.jobStatus === quickFilterCareerLinkOptions[key].displayName);
                setFilteredRowData(updatedData);
            }
        })
        if (!trueFound) {
            setFilteredRowData(rowData);
        }
    }, [enableQuickFilter]);

    const getQuickCareerJobLinkCompanies = async (companyTextValue) => {
        try {
            const { data } = await axios.get(`${GET_SEARCH_QUERY_RESULT_COMPANIES_FOR_INTERVIEW}${companyTextValue}&email=${userInfo?.email}`);
            const modifiedData = data.map((item) => {
                return {
                    id: item._id,
                    name: item.name,
                    displayName: item.displayName
                }
            });
            modifiedData.push({
                id: 1,
                name: "others",
                displayName: "Others"
            });
            setQuickCareerJobLinkCompanies(modifiedData);
        } catch (error) {
            toast.error(error);
        }
    }

    const onCompanyTextChange = async (event) => {
        setFilteredLocations([]);
        setFilteredRoles([]);
        const companyTextValue = event.target.value;
        setCompanyText(companyTextValue);
        await getQuickCareerJobLinkCompanies(companyTextValue);
    }

    const onCompanySelect = (company) => {
        setCompanyText(company?.displayName);
        setFilteredCompany([]);
    }

    const onRoleTextChange = (event) => {
        setFilteredLocations([]);
        setFilteredCompany([]);
        const roleTextValue = event.target.value;
        setRoleText(roleTextValue);
        if (roleTextValue != "") {
            const filterRoles = quickCareerJobLinkRoles.filter((role) => role.displayName?.toLocaleLowerCase().includes(roleTextValue.toLocaleLowerCase()));
            setFilteredRoles(filterRoles);
        } else {
            setFilteredRoles([]);
        }
    }

    const onRoleSelect = (role) => {
        setRoleText(role?.displayName);
        setFilteredRoles([]);
    }

    const onLocationTextChange = (event) => {
        setFilteredRoles([]);
        setFilteredCompany([]);
        const locationTextValue = event.target.value;
        setLocationText(locationTextValue);
        if (locationTextValue != "") {
            const filterLocations = quickCareerJobLinkLocations.filter((location) => location.displayName?.toLocaleLowerCase().includes(locationTextValue.toLocaleLowerCase()));
            setFilteredLocations(filterLocations);
        } else {
            setFilteredLocations([]);
        }
    }

    const onLocationSelect = (location) => {
        setLocationText(location?.displayName);
        setFilteredLocations([]);
    }

    useEffect(() => {
        if (companyText != "") {
            const filterCompanies = quickCareerJobLinkCompanies.filter((company) => company.displayName?.toLocaleLowerCase().includes(companyText.toLocaleLowerCase()));
            setFilteredCompany(filterCompanies);
        } else {
            setFilteredCompany([]);
        }
    }, [quickCareerJobLinkCompanies]);

    const handleApplied = async() => {
        try{
            const { data } = await axios.put(PUT_QUICK_CAREER_JOB_LINK_STATUS_APPLIED, navJobLinkCompany);
            getJobLinkDetails();
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
        <div className='m-2 lg:m-8 md:m-4 w-4/5'>
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
                    <div className='flex gap-8'>
                        {quickFilterCareerLinkOptions?.map((item) => <SlidderToggle key={item.id} slidderInfo={item}
                            enableQuickFilter={enableQuickFilter} setEnableQuickFilter={setEnableQuickFilter} />)}
                        <button className='bg-green-700 rounded-xl py-2 px-16 font-bold cursor-pointer hover:bg-white 
                        add-btn text-white' onClick={onAddClick}>
                            Add
                        </button>
                    </div>
                </div>
                <div style={{ height: '70vh', width: '100%', margin: '24px' }}>
                    <AgGridReact
                        ref={gridRef}
                        rowData={filteredRowData}
                        columnDefs={colDefs}
                        defaultColDef={defaultColDef}
                        theme={theme}
                        components={{
                            iconComponent: IconComponent
                        }}
                        pagination={pagination}
                        paginationPageSize={paginationPageSize}
                        paginationPageSizeSelector={paginationPageSizeSelector}
                        loading={loading}
                    />
                </div>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen} disableEnforceFocus className="w-[800px]">
                    <DialogContent className="joblink-dialog w-full max-h-[600px] sm:max-h-[600px] md:max-h-[600px] lg:max-h-[800px] 
                    overflow-y-scroll">
                        <DialogHeader>
                            <DialogTitle>Add Link</DialogTitle>
                            <DialogDescription>
                                Enter details for your job details.
                            </DialogDescription>
                        </DialogHeader>
                        <form className="grid gap-4 py-4" onSubmit={handleSubmit(handleJobDetailsSubmit)}>
                            <div className="flex flex-col gap-4">
                                <div className='flex flex-col gap-4 relative'>
                                    <Label htmlFor="company" className="text-right">
                                        Company
                                    </Label>
                                    <Input id="company" placeholder="Company" className="col-span-3" {...register("company", {
                                        required: "This field is required"
                                    })} value={companyText} onChange={(e) => onCompanyTextChange(e)} />
                                    {filteredCompany.length > 0 &&
                                        <QuickCareerLinksDropDowns filteredRecords={filteredCompany} onDropdownSelect={onCompanySelect} />}
                                    {errors?.company?.message &&
                                        <div className='error-msg'>{errors?.company?.message}</div>}
                                </div>
                                <div className='flex flex-col gap-4 relative'>
                                    <Label htmlFor="jobRole" className="text-right">
                                        Role
                                    </Label>
                                    <Input type='text' id="jobRole"
                                        placeholder="Job Role" className="col-span-3" {...register("jobRole", {
                                            required: "This field is required"
                                        })} value={roleText} onChange={(e) => onRoleTextChange(e)} />
                                    {filteredRoles.length > 0 &&
                                        <QuickCareerLinksDropDowns filteredRecords={filteredRoles} onDropdownSelect={onRoleSelect} />}
                                    {errors?.jobRole?.message &&
                                        <div className='error-msg'>{errors?.jobRole?.message}</div>}
                                </div>
                                <div className='flex flex-col gap-4 relative'>
                                    <Label htmlFor="jobLocation" className="text-right">
                                        Location
                                    </Label>
                                    <Input id="jobLocation" placeholder="Job Location" className="col-span-3" {...register("jobLocation", {
                                        required: "This field is required"
                                    })} value={locationText} onChange={(e) => onLocationTextChange(e)} />
                                    {filteredLocations.length > 0 &&
                                        <QuickCareerLinksDropDowns filteredRecords={filteredLocations} onDropdownSelect={onLocationSelect} />}
                                    {errors?.jobLocation?.message &&
                                        <div className='error-msg'>{errors?.jobLocation?.message}</div>}
                                </div>
                                <Label htmlFor="jobID" className="text-right">
                                    Job ID
                                </Label>
                                <Input id="jobID" placeholder="Job ID" className="col-span-3" {...register("jobID", {
                                    required: "This field is required"
                                })} />
                                {errors?.jobID?.message &&
                                    <div className='error-msg'>{errors?.jobID?.message}</div>}
                                <Label htmlFor="jobLink" className="text-right">
                                    Job Link
                                </Label>
                                <Input id="jobLink" placeholder="Link" className="col-span-3" {...register("jobLink", {
                                    required: "This field is required",
                                    validate: (value) => {
                                        const isValidLink = /^https:\/\/.+/.test(value);
                                        return isValidLink || "Please provide a valid link starting with https://";
                                    }
                                })} />
                                {errors?.jobLink?.message &&
                                    <div className='error-msg'>{errors?.jobLink?.message}</div>}
                                <Label htmlFor="jobStatus" className="text-right">
                                    Status
                                </Label>
                                <select id='jobStatus' className='w-[240px] hover:cursor-pointer border-2 rounded-xl px-2 py-2'
                                    {...register("jobStatus", {
                                        required: "This field is required"
                                    })}>
                                    {quickCareerJobLinkStatus.map((status) => {
                                        return <option key={status.id}>{status.displayName}</option>
                                    })}
                                </select>
                            </div>
                            <DialogFooter>
                                <Button type="submit" className="hover:cursor-pointer">Save Job</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                <AlertDialog open={alertDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Did you apply to {navJobLinkCompany.jobRole} at {navJobLinkCompany.company}?</AlertDialogTitle>
                            <AlertDialogDescription>
                                If yes, please select 'Applied'. {navJobLinkCompany.company} will be marked as 'Applied'.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel className="cursor-pointer" onClick={handleAlertCancel}>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="cursor-pointer" onClick={handleApplied}>Applied</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>

                </AlertDialog>

            </div>
        </div>
    )
}

export default QuickCareerLinks;