import React, { useEffect, useRef, useState } from 'react';
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
import axios from 'axios';
import { GET_SEARCH_QUERY_RESULT_COMPANIES_FOR_INTERVIEW, POST_QUICK_CAREER_JOB_LINK } from '../../utils/constants/apiConstants';
import QuickCareerLinksDropDowns from './QuickCareerLinksDropDowns';
import quickCareerJobLinkStatus from './../../utils/constants/json/quickCareerJobLinkStatus.json';
import quickCareerJobLinkRoles from './../../utils/constants/json/quickCareerJobLinkRoles.json';
import quickCareerJobLinkLocations from './../../utils/constants/json/quickCareerJobLinkLocations.json';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const QuickCareerLinksAddDialog = ({ dialogOpen, setDialogOpen, getJobLinkDetails, company }) => {

    const { register, handleSubmit, formState, reset } = useForm();

    const [roleText, setRoleText] = useState("");
    const [filteredRoles, setFilteredRoles] = useState([]);
    const [locationText, setLocationText] = useState("");
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [quickCareerJobLinkCompanies, setQuickCareerJobLinkCompanies] = useState([]);
    const [companyText, setCompanyText] = useState("");
    const [filteredCompany, setFilteredCompany] = useState([]);
    const { errors } = formState;
    const userInfo = useSelector((store) => store.app.userInfo);
     const jobRoleRef = useRef(null);

    useEffect(() => {
        if (company && dialogOpen) {
            setCompanyText(company);
            jobRoleRef?.current?.focus();
        }
    }, [company]);

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
                getJobLinkDetails(true);
                setFilteredCompany([]);
                setFilteredLocations([]);
                setFilteredRoles([]);
            } catch (error) {
                toast.error("Job details adding failed. Please try again later.");
            }
        }
    }

    return (
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
                            <Input type='text' id="jobRole" ref={jobRoleRef}
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
                        <Label htmlFor="candidateID" className="text-right">
                            Candidate ID
                        </Label>
                        <Input id="candidateID" placeholder="Candidate ID" className="col-span-3" {...register("candidateID")} />
                        {errors?.jobID?.message &&
                            <div className='error-msg'>{errors?.candidateID?.message}</div>}
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
    )
}

export default QuickCareerLinksAddDialog