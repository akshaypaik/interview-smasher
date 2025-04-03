import React, { useEffect, useState } from 'react';
import './Interviews.css';
import { useSelector } from 'react-redux';
import { GET_SEARCH_QUERY_RESULT_COMPANIES_FOR_INTERVIEW } from '../../utils/constants/apiConstants';
import CompanyCard from './CompanyCard/CompanyCard';

const Interviews = () => {

    const searchBarQuery = useSelector((store) => store.app.searchBarQuery);
    const [companies, setCompanies] = useState([]);

    const fetchSearchQueryResultsForCompanies = async () => {
        const result = await fetch(`${GET_SEARCH_QUERY_RESULT_COMPANIES_FOR_INTERVIEW}${searchBarQuery}`);
        const resultJson = await result.json();
        setCompanies(resultJson);
        console.log(resultJson);
    }

    useEffect(() => {
        if (searchBarQuery === "" || searchBarQuery === undefined || searchBarQuery === null) {
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



    return (
        <div className='interview-container'>
            <h1>Quick Career Search</h1>
            {companies.length === 0 &&
                <div className='interview-no-result-text'> Start typing in search bar to get the companies listed...
                </div>}
            <div className='company-card-main-container'>
                {companies.length > 0 && companies.map((company) => <CompanyCard key={company.companyId} info={company} />)}
            </div>
        </div>
    )
}

export default Interviews