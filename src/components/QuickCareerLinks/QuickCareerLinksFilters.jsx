import React, { useEffect, useRef, useState } from 'react';
import quickFilterCareerLinkOptions from "../../utils/constants/json/quickFilterCareerLinkOptions.json";
import { useDispatch } from 'react-redux';
import { updateQuickCareerLinkFilters } from '../../utils/ReduxStore/companiesSlice';

const QuickCareerLinksFilters = ({ info, resetQuickFilterRolesAndLocations, setResetQuickFilterRolesAndLocations }) => {

    const dispatch = useDispatch();
    const [roles, setRoles] = useState([]);
    const [locations, setLocations] = useState([]);
    const isResetApplied = useRef(false);

    useEffect(() => {
        if(resetQuickFilterRolesAndLocations){
            setRoles([]);
            setLocations([]);
            setResetQuickFilterRolesAndLocations(false);
            isResetApplied.current = true;
            setRolesAndLocation();
        }else{
            isResetApplied.current = false;
        }
    }, [resetQuickFilterRolesAndLocations, info]);

    useEffect(() => {
       setRolesAndLocation();
    }, [info]);

    const setRolesAndLocation = () => {
        if (info && Array.isArray(info) && ((roles.length === 0 && locations.length === 0) || isResetApplied.current)) {
            const locationArray = [...new Set(info.map(jobEntry => jobEntry.jobLocation))];
            const roleArray = [...new Set(info.map(jobEntry => jobEntry.jobRole))];
            const locationArrayObject = [];
            for(let location of locationArray){
                locationArrayObject.push({
                    id: Math.floor(100000 + Math.random() * 900000),
                    name: location,
                    displayName: location
                })
            }
            const roleArrayObject = [];
            for(let role of roleArray){
                roleArrayObject.push({
                    id: Math.floor(100000 + Math.random() * 900000),
                    name: role,
                    displayName: role
                });
            }
            setLocations(locationArrayObject);
            setRoles(roleArrayObject);
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
        <div className='filter-container w-84 bg-neutral-100 p-4 rounded-xl shadow-2xl border-2 dark:bg-gray-700 max-h-[70vh] overflow-y-scroll'>
            <div>
                <h4 className='font-bold text-[14px]'>STATUS</h4>
                {quickFilterCareerLinkOptions.map((status) => {
                    return <span className='flex gap-2 m-1' key={status.id}>
                        <input type='checkbox' id={status.id} onClick={(e) => {
                            e.stopPropagation();
                            handleQuickCareerLinkClick(status, "jobStatus");
                        }} className='cursor-pointer' />
                        <label htmlFor={status.id} className='cursor-pointer text-[14px]'>{status.displayName}</label>
                    </span>
                })}
            </div>
            <div>
                <h4 className='font-bold text-[14px]'>LOCATION</h4>
                {locations.map((location) => {
                    return <span className='flex gap-2 m-1' key={location.id}>
                        <input type='checkbox' id={location.id} onClick={(e) => {
                            e.stopPropagation();
                            handleQuickCareerLinkClick(location, "jobLocation");
                        }} className='cursor-pointer' />
                        <label htmlFor={location.id} className='cursor-pointer text-[14px]'>{location.displayName}</label>
                    </span>
                })}
            </div>
            <div>
                <h4 className='font-bold text-[14px]'>ROLES</h4>
                {roles.map((role) => {
                    return <span className='flex gap-2 m-1' key={role.id}>
                        <input type='checkbox' id={role.id} onClick={(e) => {
                            e.stopPropagation();
                            handleQuickCareerLinkClick(role, "jobRole");
                        }} className='cursor-pointer' />
                        <label htmlFor={role.id} className='cursor-pointer text-[14px]'>{role.displayName}</label>
                    </span>
                })}
            </div>
        </div>
    )
}

export default QuickCareerLinksFilters;