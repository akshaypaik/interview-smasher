import React, { useEffect, useRef, useState } from 'react';
import './Interviews.css';
import { useDispatch, useSelector } from 'react-redux';
import { GET_SEARCH_QUERY_RESULT_COMPANIES_FOR_INTERVIEW, GET_SEARCH_QUERY_RESULT_COMPANIES_FOR_INTERVIEW_QUICK_FILTER } from '../../utils/constants/apiConstants';
import CompanyCard from './CompanyCard/CompanyCard';
import { setRefetchQuickCareerCompaniesFunction, updateCompaniesSearchResultCache } from '../../utils/ReduxStore/companiesSlice';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import LoadingSpinner from '../Shared/LoadingSpinner/LoadingSpinner';
import _ from 'lodash';
import { updateSearchBarQuery } from '../../utils/ReduxStore/appSlice';
import SlidderToggle from '../Shared/SlidderToggle/SlidderToggle';
import quickFilterOptions from "../../utils/constants/json/quickFilterOptions.json";

const Interviews = () => {

    const searchBarQuery = useSelector((store) => store.app.searchBarQuery);
    const userInfo = useSelector((store) => store.app.userInfo);
    const dispatch = useDispatch();
    const bottomRef = useRef(true);
    const [emailNotValid, setEmailNotValid] = useState(true);
    const [enableQuickFilter, setEnableQuickFilter] = useState({});
    const [companyFilter, setCompanyFilter] = useState("");

    useEffect(() => {
        console.log("slidder changed: ", enableQuickFilter);
        let trueFound = false;
        Object.keys(enableQuickFilter).forEach(key => {
            if (enableQuickFilter[key] === true) {
                trueFound = true;
                setCompanyFilter(quickFilterOptions[key].name);
            }
        })
        if (!trueFound) {
            setCompanyFilter("");
        }
    }, [enableQuickFilter]);

    const fetchSearchQueryResultsForCompanies = async ({ pageParam = 1 }) => {

        if (companyFilter != "") {
            const result = await
                fetch(`${GET_SEARCH_QUERY_RESULT_COMPANIES_FOR_INTERVIEW_QUICK_FILTER}${searchBarQuery}
                &email=${userInfo?.email}&page=${pageParam}&quickFilter=${companyFilter}`);
            const resultJson = await result.json();
            dispatch(updateCompaniesSearchResultCache({ searchQuery: searchBarQuery, searchResult: resultJson }));
            return resultJson;
        }

        try {
            if (!userInfo?.email) {
                setEmailNotValid(true);
                return;
            }
            const result = await fetch(`${GET_SEARCH_QUERY_RESULT_COMPANIES_FOR_INTERVIEW}${searchBarQuery}&email=${userInfo?.email}&page=${pageParam}`);
            const resultJson = await result.json();
            dispatch(updateCompaniesSearchResultCache({ searchQuery: searchBarQuery, searchResult: resultJson }));
            return resultJson;
        } catch (error) {
            throw error;
        }
    };

    const { data, error, hasNextPage, fetchNextPage, isLoading, refetch } = useInfiniteQuery({
        queryKey: ['companies', searchBarQuery, userInfo, companyFilter],
        queryFn: fetchSearchQueryResultsForCompanies,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage?.length === 12 ? allPages?.length + 1 : undefined;
        }
    });

    const handleScrollWindow = () => {
        bottomRef.current = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;
        if (bottomRef.current && hasNextPage) {
            fetchNextPage();
        }
    }

    // Debounce the scroll handler to limit API calls
    const debouncedHandleScroll = _.debounce(handleScrollWindow, 300);

    useEffect(() => {
        window.addEventListener('scroll', debouncedHandleScroll);
        return () => {
            window.removeEventListener('scroll', debouncedHandleScroll);
            debouncedHandleScroll.cancel(); // Cancel any pending debounced calls
        }
    }, [hasNextPage]);

    useEffect(() => {
        dispatch(setRefetchQuickCareerCompaniesFunction(refetch));
        return () => {
            dispatch(updateSearchBarQuery(""));
        }
    }, []);

    useEffect(() => {
        if (error && error?.message) {
            if (error?.message.includes("Email is not valid")) {
                setEmailNotValid(true);
            }
        } else {
            // setEmailNotValid(false);
        }
    }, [error]);

    useEffect(() => {
        if (userInfo?.email) {
            setEmailNotValid(false);
        }
    }, [userInfo]);

    return (
        <div className='interview-container lg:m-8 md:m-8'>
            <div className='quick-search-header'>
                <h1 className='font-bold text-2xl'>Quick Career Search</h1>
                <div className='flex gap-4'>
                    {quickFilterOptions?.map((item) => <SlidderToggle key={item.id} slidderInfo={item}
                        enableQuickFilter={enableQuickFilter} setEnableQuickFilter={setEnableQuickFilter} />)}
                </div>
            </div>
            {emailNotValid && <div>
                <h3 className='no-result-found-container'><span>Please login to search companies here...</span></h3>
            </div>}
            {isLoading && <LoadingSpinner />}
            {data?.pages[0]?.length === 0 && !isLoading && <h2 className='no-result-found-container'>No results found. <span> Try searching a different company.</span></h2>}
            <div className='company-card-main-container'>
                {data?.pages?.map((pages, index) => {
                    return pages?.map((company) =>
                        <CompanyCard
                            key={company.companyId}
                            info={company}
                            refetch={refetch} />)
                })}
            </div>
            {bottomRef.current && hasNextPage && <LoadingSpinner />}
        </div>
    )
}

export default Interviews