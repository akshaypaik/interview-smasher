import React, { useEffect, useState } from 'react';
import './CompanyCard.css';
import { POST_FAVORITE_COMPANIES_INTERVIEW, REMOVE_FAVORITE_COMPANIES_INTERVIEW } from '../../../utils/constants/apiConstants';
import UserRating from '../UserRating/UserRating';
import StarIcon from '../../Shared/StarIcon/StarIcon';
import likeIcon from "../../../assets/images/icons/like-icon.svg";
import likeIconFavorite from "../../../assets/images/icons/like-icon-favorite.svg";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const CompanyCard = ({ info, refetch }) => {

    const [favoriteCompanyStyle, setFavoriteCompanyStyle] = useState(false);
    const { userRatings } = info;
    const userInfo = useSelector((store) => store.app.userInfo);
    const queryClient = useQueryClient();

    const handleFavoriteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (info.isFavoriteCompany) {
            // removeFavoriteCompany(info);
            removeFavoriteMutate(info);
            setFavoriteCompanyStyle(false);
            if (window.refetchQuickCareerCompanies) {
                window.refetchQuickCareerCompanies(); // Call the refetch function
            } else {
                // refetch();
                queryClient.invalidateQueries({
                    queryKey: ["favoriteCompanies"]
                });
            }
            return;
        }
        const favCompanyObj = {
            ...info,
            isFavoriteCompany: true,
            user: {
                email: userInfo?.email
            }
        }
        delete favCompanyObj._id;
        // postFavoriteCompany(favCompanyObj);
        postFavoriteMutate(favCompanyObj);
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
        const updatedFavCompanyObj = {
            ...favCompanyObj,
            user: favCompanyObj.user || {
                email: userInfo?.email
            }
        };
        const result = await fetch(`${REMOVE_FAVORITE_COMPANIES_INTERVIEW}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedFavCompanyObj)
        })
        const resultJson = await result.json();
    }

    const { mutate: removeFavoriteMutate } = useMutation({
        mutationFn: removeFavoriteCompany,
        onSuccess: () => {
            toast.success("Favorite removed!");
            queryClient.invalidateQueries({
                queryKey: ["favoriteCompanies"]
            });
        },
        onError: () => {
            toast.error("Removing favorite failed!");
        }
    });

    const { mutate: postFavoriteMutate } = useMutation({
        mutationFn: postFavoriteCompany,
        onSuccess: () => {
            toast.success("Favorite added!");
        },
        onError: () => {
            toast.error("Adding favorite failed!");
        }
    });

    useEffect(() => {
        setFavoriteCompanyStyle(info.isFavoriteCompany);
    }, []);

    return (
        <a href={info.companyCareerPageURL} target='_blank'>
            <div className='company-card-container 
                p-16 dark:bg-gray-700 flex flex-col justify-center items-center w-[240px] lg:w-[320px] md:w-[320px]
                rounded-xl flex-wrap relative bg-neutral-100 shadow-xl border-1 hover:bg-gray-400 dark:hover:shadow-gray-700 hover:shadow-gray-500'>
                <span className='star-company' onClick={(e) => handleFavoriteClick(e)}>
                    <img src={favoriteCompanyStyle ? likeIconFavorite : likeIcon} alt='favorite' />
                </span>
                <img src={info.companyIconURL} alt='company-icon' className='h-6 lg:h-[60px] md:h-[60px]' />
                <span className='company-name'> {info?.displayName}</span>
                <span className='user-star-company'>
                    <UserRating userRatingInfo={userRatings} />
                </span>
            </div>
        </a>
    )
}

export default CompanyCard;