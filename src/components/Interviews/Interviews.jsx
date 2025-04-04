import React, { useEffect, useRef } from 'react';
import './Interviews.css';
import { useDispatch, useSelector } from 'react-redux';
import { GET_SEARCH_QUERY_RESULT_COMPANIES_FOR_INTERVIEW } from '../../utils/constants/apiConstants';
import CompanyCard from './CompanyCard/CompanyCard';
import { updateCompaniesSearchResultCache } from '../../utils/ReduxStore/companiesSlice';
import { useInfiniteQuery } from '@tanstack/react-query';
import LoadingSpinner from '../Shared/LoadingSpinner/LoadingSpinner';
import _ from 'lodash';

const Interviews = () => {

    const searchBarQuery = useSelector((store) => store.app.searchBarQuery);
    const dispatch = useDispatch();
    const bottomRef = useRef(true);

    const fetchSearchQueryResultsForCompanies = async ({ pageParam = 1 }) => {
        try {
            const result = await fetch(`${GET_SEARCH_QUERY_RESULT_COMPANIES_FOR_INTERVIEW}${searchBarQuery}&page=${pageParam}`);
            const resultJson = await result.json();
            dispatch(updateCompaniesSearchResultCache({ searchQuery: searchBarQuery, searchResult: resultJson }));
            return resultJson;
        } catch (error) {
            return [];
        }
    };

    const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
        queryKey: ['companies', searchBarQuery],
        queryFn: fetchSearchQueryResultsForCompanies,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length === 12 ? allPages.length + 1 : undefined;
        }
    });

    const handleScrollWindow = () => {
        bottomRef.current = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 20;
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

    return (
        <div className='interview-container'>
            <h1>Quick Career Search</h1>
            <div className='company-card-main-container'>
                {data?.pages?.map((pages, index) => {
                    return pages?.map((company) => <CompanyCard key={company.companyId} info={company} />)
                })}
            </div>
            {bottomRef.current && hasNextPage && <LoadingSpinner /> }
        </div>
    )
}

export default Interviews