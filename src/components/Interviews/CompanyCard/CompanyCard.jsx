import React, { useEffect, useState } from 'react';
import './CompanyCard.css';
import { POST_FAVORITE_COMPANIES_INTERVIEW, REMOVE_FAVORITE_COMPANIES_INTERVIEW } from '../../../utils/constants/apiConstants';
import UserRating from '../UserRating/UserRating';
import StarIcon from '../../Shared/StarIcon/StarIcon';

const CompanyCard = ({ info, refetch }) => {

    const [favoriteCompanyStyle, setFavoriteCompanyStyle] = useState(false);
    const { userRatings } = info;

    const handleFavoriteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (info.isFavoriteCompany) {
            removeFavoriteCompany(info);
            setFavoriteCompanyStyle(false);
            if (window.refetchQuickCareerCompanies) {
                window.refetchQuickCareerCompanies(); // Call the refetch function
            } else {
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
                <span onClick={(e) => handleFavoriteClick(e)}>
                    <StarIcon fill={favoriteCompanyStyle ? 'gold' : 'white'} stroke="black" />
                </span>
                <img src={info.companyIconURL} alt='company-icon' />
                {info?.displayName}
                <span className='user-star-company'>
                    <UserRating userRatingInfo={userRatings} />
                </span>
            </div>
        </a>
    )
}

export default CompanyCard;