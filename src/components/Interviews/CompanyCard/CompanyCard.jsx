import React, { useEffect, useState } from 'react';
import './CompanyCard.css';
import { POST_FAVORITE_COMPANIES_INTERVIEW, REMOVE_FAVORITE_COMPANIES_INTERVIEW } from '../../../utils/constants/apiConstants';

const CompanyCard = ({ info, refetch }) => {

    const [favoriteCompanyStyle, setFavoriteCompanyStyle] = useState(false);

    const handleFavoriteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (info.isFavoriteCompany) {
            removeFavoriteCompany(info);
            setFavoriteCompanyStyle(false);
            if (window.refetchQuickCareerCompanies) {
                window.refetchQuickCareerCompanies(); // Call the refetch function
            }else{
                refetch();
            }
            return;
        }
        console.log("fav clicked");
        const favCompanyObj = {
            ...info,
            isFavoriteCompany: true,
            user: {
                username: "akshay",
                email: "akshaypaik@gmail.com"
            }
        }
        postFavoriteCompany(favCompanyObj);
        setFavoriteCompanyStyle(true);
        refetch();
    }

    const postFavoriteCompany = async (favCompanyObj) => {
        const result = await fetch(`${POST_FAVORITE_COMPANIES_INTERVIEW}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(favCompanyObj)
        })
        const resultJson = await result.json();
    }

    const removeFavoriteCompany = async (favCompanyObj) => {
        if (!favCompanyObj.user) {
            favCompanyObj.user = {
                username: "akshay",
                email: "akshaypaik@gmail.com"
            }
        }
        const result = await fetch(`${REMOVE_FAVORITE_COMPANIES_INTERVIEW}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(favCompanyObj)
        })
        const resultJson = await result.json();
        console.log(resultJson);
    }

    useEffect(() => {
        setFavoriteCompanyStyle(info.isFavoriteCompany);
    }, []);

    return (
        <a href={info.companyCareerPageURL} target='_blank'>
            <div className='company-card-container'>
                <span className='star-company' onClick={(e) => handleFavoriteClick(e)}>
                    <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                        <polygon points="12,2 15,8.5 22,9.5 17,14.5 18.5,21 12,17.5 5.5,21 7,14.5 2,9.5 9,8.5"
                            stroke="black" strokeWidth="1" fill={favoriteCompanyStyle ? 'gold' : 'white'} />
                    </svg>
                </span>
                <img src={info.companyIconURL} alt='company-icon' />
                {info?.displayName}
            </div>
        </a>
    )
}

export default CompanyCard;