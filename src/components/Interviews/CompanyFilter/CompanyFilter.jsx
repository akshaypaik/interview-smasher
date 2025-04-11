import React from 'react';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useDispatch } from 'react-redux';
import { setCompanyFilter } from '../../../utils/ReduxStore/companiesSlice';

const CompanyFilter = () => {

    const dispatch = useDispatch();

    const handleFilterClick = (filterType) => {
        dispatch(setCompanyFilter(filterType));
    }

    return (
        <Select onValueChange={handleFilterClick}>
            <SelectTrigger className="w-[180px] cursor-pointer mr-24">
                <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup className="dark:bg-gray-600">
                    <SelectLabel>Companies</SelectLabel>
                    <SelectItem value="topRated" className="font-bold cursor-pointer">Top Rated</SelectItem>
                    <SelectItem value="productBased" className="font-bold cursor-pointer">Product Based</SelectItem>
                    <SelectItem value="serviceBased" className="font-bold cursor-pointer">Service Based</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default CompanyFilter