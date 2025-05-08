import React, { useEffect, useRef, useState } from 'react';
import quickFilterCareerLinkOptions from "../../utils/constants/json/quickFilterCareerLinkOptions.json";
import { useDispatch } from 'react-redux';
import { updateQuickCareerLinkFilters } from '../../utils/ReduxStore/companiesSlice';

const QuickCareerLinksFilters = ({ info, resetQuickFilterRolesAndLocations, setResetQuickFilterRolesAndLocations }) => {

    const dispatch = useDispatch();
    const [roles, setRoles] = useState([]);
    const [locations, setLocations] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [modifiedQuickFilterCareerLinkOptions, setModifiedquickFilterCareerLinkOptions] = useState([]);
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
                        count: statusCounts[item.displayName]
                    }
                    return newItem;
                }else{
                    return {
                        ...item,
                        count: 0
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
                    count: locationCounts[location] || 0
                })
            }
            const roleArrayObject = [];
            for (let role of roleArray) {
                roleArrayObject.push({
                    id: Math.floor(100000 + Math.random() * 900000),
                    name: role,
                    displayName: role,
                    count: roleCounts[role] || 0
                });
            }
            const companyArrayObject = [];
            for (let company of companyArray) {
                companyArrayObject.push({
                    id: Math.floor(100000 + Math.random() * 900000),
                    name: company,
                    displayName: company,
                    count: companyCounts[company] || 0
                });
            }
            setLocations(locationArrayObject);
            setRoles(roleArrayObject);
            setCompanies(companyArrayObject);
        }
    }

    const handleQuickCareerLinkClick = (filterDetails, category) => {
        const quickCareerFilterObj = {
            category: category,
            filter: filterDetails.displayName
        }
        dispatch(updateQuickCareerLinkFilters(quickCareerFilterObj));
    }

    return (
        <div className='filter-container w-72 bg-neutral-100 p-4 rounded-xl shadow-2xl border-2 
        dark:bg-gray-700 max-h-[70vh] overflow-y-scroll'>
            <div>
                <QuickCareerLinksFilterSection sectionName="STATUS" filterEntries={modifiedQuickFilterCareerLinkOptions}
                    category="jobStatus"
                    handleQuickCareerLinkClick={handleQuickCareerLinkClick} />
            </div>
            <div>
                {locations.length > 0 && <QuickCareerLinksFilterSection sectionName="LOCATION" filterEntries={locations} category="jobLocation"
                    handleQuickCareerLinkClick={handleQuickCareerLinkClick} />}
            </div>
            <div>
                {roles.length > 0 && <QuickCareerLinksFilterSection sectionName="ROLES" filterEntries={roles} category="jobRole"
                    handleQuickCareerLinkClick={handleQuickCareerLinkClick} />}
            </div>
            <div>
                {companies.length > 0 && <QuickCareerLinksFilterSection sectionName="COMPANIES" filterEntries={companies} category="company"
                    handleQuickCareerLinkClick={handleQuickCareerLinkClick} />}
            </div>
        </div>
    )
}

export default QuickCareerLinksFilters;

export function QuickCareerLinksFilterSection({ sectionName, filterEntries, category, handleQuickCareerLinkClick }) {
    return (
        <>
            <h4 className='font-bold text-[14px]'>{sectionName}</h4>
            {filterEntries.length > 0 && filterEntries.map((entry) => {
                return <span className='flex gap-2 m-1' key={entry?.id}>
                    <input type='checkbox' id={entry?.id} onClick={(e) => {
                        e.stopPropagation();
                        handleQuickCareerLinkClick(entry, category);
                    }} className='cursor-pointer' />
                    <label htmlFor={entry?.id} className='cursor-pointer text-[14px] flex gap-1'>
                        <span>{entry?.displayName}</span>
                        <span className='count-filter'>({entry?.count})</span>
                    </label>
                </span>
            })}
        </>
    )
}