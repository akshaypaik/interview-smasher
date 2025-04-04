import React, { useEffect, useState } from 'react';
import './Interviews.css';
import { useDispatch, useSelector } from 'react-redux';
import { GET_SEARCH_QUERY_RESULT_COMPANIES_FOR_INTERVIEW } from '../../utils/constants/apiConstants';
import CompanyCard from './CompanyCard/CompanyCard';
import LoadingSpinner from '../Shared/LoadingSpinner/LoadingSpinner';
import { updateCompaniesSearchResultCache } from '../../utils/ReduxStore/companiesSlice';

const Interviews = () => {

    const searchBarQuery = useSelector((store) => store.app.searchBarQuery);
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const searchResultCache = useSelector((store) => store.companies.companiesSearchResultCache);
    const searchUIText = "Start typing in search bar to ";

    const fetchSearchQueryResultsForCompanies = async () => {
        setLoading(true);

        // Read from redux cache
        if (searchResultCache[searchBarQuery]) {
            setCompanies(searchResultCache[searchBarQuery]);
            setLoading(false);
            return;
        }

        const result = await fetch(`${GET_SEARCH_QUERY_RESULT_COMPANIES_FOR_INTERVIEW}${searchBarQuery}`);
        const resultJson = await result.json();
        setCompanies(resultJson);
        setLoading(false);
        dispatch(updateCompaniesSearchResultCache({ searchQuery: searchBarQuery, searchResult: resultJson }));
    }

    const typewriterEffect = () => {
        const typewriter = new Typewriter(document.querySelector('.autoWrite'), {
            loop: true,
        });
        typewriter
            .typeString(' get the companies listed...')
            .pauseFor(2000)
            .deleteAll()
            .typeString(' apply for jobs...')
            .pauseFor(2000)
            .deleteAll()
            .typeString(' add them as your dream company...')
            .pauseFor(2000)
            .deleteAll()
            .typeString(' keep track of your dream company by adding them as favorite...')
            .pauseFor(2000)
            .deleteAll()
            .start();
    }

    useEffect(() => {
        if (searchBarQuery.trim() === "" || searchBarQuery === undefined || searchBarQuery === null) {
            setCompanies([]);
            return;
        }
        const timer = setTimeout(() => {
            fetchSearchQueryResultsForCompanies();
        }, 300);

        return () => {
            clearTimeout(timer);
        }
    }, [searchBarQuery]);

    useEffect(() => {
        typewriterEffect();
    }, [companies]);

    return (
        <div className='interview-container'>
            <h1>Quick Career Search</h1>
            {companies.length === 0 && !loading &&
                <div className='interview-no-result-text'>
                    <span>{searchUIText}</span>
                    <div className='autoWrite'>
                    </div>
                </div>}
            {loading && <LoadingSpinner />}
            {!loading && <div className='company-card-main-container'>
                {companies.length > 0 && companies.map((company) => <CompanyCard key={company.companyId} info={company} />)}
            </div>}
        </div>
    )
}

export default Interviews