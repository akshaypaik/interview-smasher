import React, { useEffect, useRef, useState } from 'react';
import quickFilterCareerLinkOptions from "../../utils/constants/json/quickFilterCareerLinkOptions.json";
import { useDispatch } from 'react-redux';
import { clearQuickCareerLinkFilters, updateQuickCareerLinkFilters } from '../../utils/ReduxStore/companiesSlice';
import { FaAngleUp } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";

const QuickCareerLinksFilters = ({ info, resetQuickFilterRolesAndLocations, setResetQuickFilterRolesAndLocations }) => {

    const dispatch = useDispatch();
    const [roles, setRoles] = useState([]);
    const [locations, setLocations] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [modifiedQuickFilterCareerLinkOptions, setModifiedquickFilterCareerLinkOptions] = useState([]);
    const [jobEntryFilters, setJobEntryFilters] = useState({});
    const isResetApplied = useRef(false);

    useEffect(() => {
        if (resetQuickFilterRolesAndLocations) {
            setRoles([]);
            setLocations([]);
            setResetQuickFilterRolesAndLocations(false);
            isResetApplied.current = true;
            setRolesAndLocation();
        } else {
            isResetApplied.current = false;
        }
    }, [resetQuickFilterRolesAndLocations, info]);

    useEffect(() => {
        setRolesAndLocation();
    }, [info]);

    const setRolesAndLocation = () => {
        if (info && Array.isArray(info) && ((roles.length === 0 && locations.length === 0) || isResetApplied.current)) {
            const locationArray = [...new Set(info.map(jobEntry => jobEntry.jobLocation))];
            const locationCounts = info.reduce((acc, jobEntry) => {
                acc[jobEntry.jobLocation] = (acc[jobEntry.jobLocation] || 0) + 1;
                return acc;
            }, {});
            const roleArray = [...new Set(info.map(jobEntry => jobEntry.jobRole))];
            const roleCounts = info.reduce((acc, jobEntry) => {
                acc[jobEntry.jobRole] = (acc[jobEntry.jobRole] || 0) + 1;
                return acc;
            }, {});
            const companyArray = [...new Set(info.map(company => company.company))];
            const companyCounts = info.reduce((acc, jobEntry) => {
                acc[jobEntry.company] = (acc[jobEntry.company] || 0) + 1;
                return acc;
            }, {});
            const statusCounts = info.reduce((acc, jobEntry) => {
                acc[jobEntry.jobStatus] = (acc[jobEntry.jobStatus] || 0) + 1;
                return acc;
            }, {});
            const modifiedData = quickFilterCareerLinkOptions.map((item) => {
                if (statusCounts[item.displayName] !== undefined) {
                    const newItem = {
                        ...item,
                        count: statusCounts[item.displayName],
                        showItems: true
                    }
                    return newItem;
                } else {
                    return {
                        ...item,
                        count: 0,
                        showItems: true
                    }
                }
            })
            setModifiedquickFilterCareerLinkOptions(modifiedData);
            const locationArrayObject = [];
            for (let location of locationArray) {
                locationArrayObject.push({
                    id: Math.floor(100000 + Math.random() * 900000),
                    name: location,
                    displayName: location,
                    count: locationCounts[location] || 0,
                    showItems: false
                })
            }
            const roleArrayObject = [];
            for (let role of roleArray) {
                roleArrayObject.push({
                    id: Math.floor(100000 + Math.random() * 900000),
                    name: role,
                    displayName: role,
                    count: roleCounts[role] || 0,
                    showItems: false
                });
            }
            const companyArrayObject = [];
            for (let company of companyArray) {
                companyArrayObject.push({
                    id: Math.floor(100000 + Math.random() * 900000),
                    name: company,
                    displayName: company,
                    count: companyCounts[company] || 0,
                    showItems: false
                });
            }
            setLocations(locationArrayObject);
            setRoles(roleArrayObject);
            setCompanies(companyArrayObject);
            const entriesObj = {};
            entriesObj["jobLocation"] = locationArrayObject;
            entriesObj["jobRole"] = roleArrayObject;
            entriesObj["company"] = companyArrayObject;
            entriesObj["jobStatus"] = modifiedData;
            setJobEntryFilters(entriesObj);
        }
    }

    const handleQuickCareerLinkClick = (filterDetails, category) => {
        const quickCareerFilterObj = {
            category: category,
            filter: filterDetails.displayName
        }
        dispatch(updateQuickCareerLinkFilters(quickCareerFilterObj));
    }

    const handleClearFilters = () => {
        dispatch(clearQuickCareerLinkFilters());
        const locations = jobEntryFilters["jobLocation"];
        const roles = jobEntryFilters["jobRole"];
        const company = jobEntryFilters["company"];
        const status = jobEntryFilters["jobStatus"];
        for (let record of locations) {
            record.isChecked = false;
        }
        for (let record of roles) {
            record.isChecked = false;
        }
        for (let record of company) {
            record.isChecked = false;
        }
        for (let record of status) {
            record.isChecked = false;
        }
    }

    const handleChecboxChange = (isChecked, entry, category) => {
        for (let record of jobEntryFilters[category]) {
            if (record.id === entry.id) {
                record.isChecked = isChecked;
            }
        }
    }

    const handleAccordionChange = (category) => {
        if (category === "jobStatus") {
            return;
        }
        const updatedFilters = { ...jobEntryFilters };
        updatedFilters[category] = updatedFilters[category].map(record => ({
            ...record,
            showItems: !record.showItems
        }));
        setJobEntryFilters(updatedFilters);
    }

    return (
        <div className='filter-container w-72 bg-neutral-100 p-4 rounded-xl shadow-2xl border-2 
        dark:bg-gray-700 max-h-[70vh] overflow-y-scroll'>
            <div className='text-sm font-semibold text-[#878b94] w-full flex dark:text-white'>
                <span className='ml-auto'>
                    Total - {info?.length} items
                </span>
            </div>
            <div>
                <QuickCareerLinksFilterSection sectionName="STATUS" filterEntries={jobEntryFilters?.jobStatus}
                    category="jobStatus"
                    handleQuickCareerLinkClick={handleQuickCareerLinkClick}
                    handleClearFilters={handleClearFilters}
                    handleChecboxChange={handleChecboxChange}
                    handleAccordionChange={handleAccordionChange} />
            </div>
            <div>
                {locations.length > 0 && <QuickCareerLinksFilterSection sectionName="LOCATION"
                    filterEntries={jobEntryFilters?.jobLocation}
                    category="jobLocation"
                    handleQuickCareerLinkClick={handleQuickCareerLinkClick}
                    handleClearFilters={handleClearFilters}
                    handleChecboxChange={handleChecboxChange}
                    handleAccordionChange={handleAccordionChange} />}
            </div>
            <div>
                {roles.length > 0 && <QuickCareerLinksFilterSection sectionName="ROLES"
                    filterEntries={jobEntryFilters?.jobRole}
                    category="jobRole"
                    handleQuickCareerLinkClick={handleQuickCareerLinkClick}
                    handleClearFilters={handleClearFilters}
                    handleChecboxChange={handleChecboxChange}
                    handleAccordionChange={handleAccordionChange} />}
            </div>
            <div>
                {companies.length > 0 && <QuickCareerLinksFilterSection sectionName="COMPANIES"
                    filterEntries={jobEntryFilters?.company}
                    category="company"
                    handleQuickCareerLinkClick={handleQuickCareerLinkClick}
                    handleClearFilters={handleClearFilters}
                    handleChecboxChange={handleChecboxChange}
                    handleAccordionChange={handleAccordionChange} />}
            </div>
        </div>
    )
}

export default QuickCareerLinksFilters;

export function QuickCareerLinksFilterSection({ sectionName, filterEntries, category, handleQuickCareerLinkClick,
    handleClearFilters, handleChecboxChange, handleAccordionChange }) {

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (filterEntries?.length > 0) {
            setIsOpen(filterEntries[0].showItems);
        }
    }, [filterEntries]);

    return (
        <>
            <div className={`flex items-center justify-between 
            ${sectionName !== "STATUS" ? 'bg-gray-200 cursor-pointer my-4 dark:bg-gray-900' : ''} px-1`}
                onClick={() => handleAccordionChange(category)}>
                <h4 className='font-bold text-[14px]'>{sectionName}</h4>
                {sectionName === "STATUS" ? <span className='clear-filter-text' onClick={handleClearFilters}>
                    Clear Filters
                </span> : <span className='cursor-pointer mr-2'>
                    {isOpen ? <FaAngleDown /> : <FaAngleUp />}
                </span>}
            </div>
            {filterEntries?.length > 0 && filterEntries?.map((entry) => {
                {
                    return entry?.showItems && <span className={`flex gap-2 m-1 ${entry?.isChecked ? 'bg-amber-400 rounded-lg p-1 font-semibold' : ''}`} key={entry?.id}>
                        <input type='checkbox' id={entry?.id} onClick={(e) => {
                            e.stopPropagation();
                            handleQuickCareerLinkClick(entry, category);
                        }} className='cursor-pointer' checked={entry?.isChecked || false}
                            onChange={(e) => handleChecboxChange(e.target.checked, entry, category)} />
                        <label htmlFor={entry?.id} className='cursor-pointer text-[14px] flex gap-1'>
                            <span>{entry?.displayName}</span>
                            <span className='count-filter'>({entry?.count})</span>
                        </label>
                    </span>
                }

            })}
        </>
    )
}