import React, { useEffect, useState } from 'react';
import './FavoriteCompanies.css';
import { GET_FAVORITE_COMPANIES_INTERVIEW } from '../../../utils/constants/apiConstants';
import CompanyCard from '../CompanyCard/CompanyCard';
import { useDispatch, useSelector } from 'react-redux';
import { updateSearchBarQuery } from '../../../utils/ReduxStore/appSlice';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const FavoriteCompanies = () => {

    const [filteredFavoriteCompanies, setFilteredFavoriteCompanies] = useState([]);
    const searchBarQuery = useSelector((store) => store.app.searchBarQuery);
    const dispatch = useDispatch();

    const fetchFavCompanies = async () => {
        const userEmail = "akshaypaik@gmail.com"
        const { data } = await axios.get(`${GET_FAVORITE_COMPANIES_INTERVIEW}${userEmail}`);
        setFilteredFavoriteCompanies(data);
        return data;
    }

    const { data: favoriteCompanies } = useQuery({
        queryKey: ["favoriteCompanies"],
        queryFn: fetchFavCompanies
    })

    useEffect(() => {
        return () => {
            dispatch(updateSearchBarQuery(""));
        }
    }, []);

    useEffect(() => {
        const filtered = favoriteCompanies?.filter((company) => company.name.includes(searchBarQuery) || company.displayName.includes(searchBarQuery));
        setFilteredFavoriteCompanies(filtered);
    }, [searchBarQuery]);

    return (
        <div className='favorite-companies-container'>
            <h1>Your Favorite Companies</h1>
            {filteredFavoriteCompanies?.length === 0 &&
                <div className='interview-no-result-text'> Please add favorite companies in Interview section...
                </div>}
            <div className='company-card-main-container'>
                {filteredFavoriteCompanies?.length > 0 && filteredFavoriteCompanies?.map((company) => 
                <CompanyCard key={company.companyId} info={company} />)}
            </div>
        </div>
    )
}

export default FavoriteCompanies