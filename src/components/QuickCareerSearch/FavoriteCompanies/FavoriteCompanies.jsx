import React, { useEffect, useState } from 'react';
import './FavoriteCompanies.css';
import { GET_FAVORITE_COMPANIES_INTERVIEW } from '../../../utils/constants/apiConstants';
import CompanyCard from '../CompanyCard/CompanyCard';
import { useDispatch, useSelector } from 'react-redux';
import { updateSearchBarQuery } from '../../../utils/ReduxStore/appSlice';
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const FavoriteCompanies = () => {

    const [filteredFavoriteCompanies, setFilteredFavoriteCompanies] = useState([]);
    const searchBarQuery = useSelector((store) => store.app.searchBarQuery);
    const dispatch = useDispatch();
    const userInfo = useSelector((store) => store.app.userInfo);
    const queryClient = useQueryClient();

    const fetchFavCompanies = async () => {
        const userEmail = userInfo?.email;
        const { data } = await axios.get(`${GET_FAVORITE_COMPANIES_INTERVIEW}${userEmail}`);
        data.sort((a, b) => {
            return new Date(b?.favUpdatedOn) - new Date(a?.favUpdatedOn);
        });
        setFilteredFavoriteCompanies(data);
        return data;
    }

    const { data: favoriteCompanies } = useQuery({
        queryKey: ["favoriteCompanies", userInfo],
        queryFn: fetchFavCompanies
    })

    useEffect(() => {
        return () => {
            dispatch(updateSearchBarQuery(""));
            queryClient.invalidateQueries(["companies", "favoriteCompanies"]);
        }
    }, []);

    useEffect(() => {
        const filtered = favoriteCompanies?.filter((company) => company.name.includes(searchBarQuery) || company.displayName.includes(searchBarQuery));
        setFilteredFavoriteCompanies(filtered);
    }, [searchBarQuery]);

    return (
        <div className='favorite-companies-container'>
            <h1 className='font-bold text-2xl mb-4'>Your Favorite Companies</h1>
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