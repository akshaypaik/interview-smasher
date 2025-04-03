import React, { useEffect, useState } from 'react';
import './FavoriteCompanies.css';
import { GET_FAVORITE_COMPANIES_INTERVIEW } from '../../../utils/constants/apiConstants';
import CompanyCard from '../CompanyCard/CompanyCard';

const FavoriteCompanies = () => {

    const [favoriteCompanies, setFavoriteCompanies] = useState([]);

    const fetchFavCompanies = async () => {
        const userEmail = "akshaypaik@gmail.com"
        const result = await fetch(`${GET_FAVORITE_COMPANIES_INTERVIEW}${userEmail}`);
        const resultJson = await result.json();
        setFavoriteCompanies(resultJson);
    }

    useEffect(() => {
        fetchFavCompanies();
    }, []);

    return (
        <div className='favorite-companies-container'>
            <h1>Your Favorite Companies</h1>
            {favoriteCompanies.length === 0 &&
                <div className='interview-no-result-text'> Please add favorite companies in Interview section...
                </div>}
            <div className='company-card-main-container'>
                {favoriteCompanies.length > 0 && favoriteCompanies.map((company) => <CompanyCard key={company.companyId} info={company} />)}
            </div>
        </div>
    )
}

export default FavoriteCompanies