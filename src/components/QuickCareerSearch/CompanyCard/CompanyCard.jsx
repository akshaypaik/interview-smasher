import React, { useEffect, useState } from 'react';
import './CompanyCard.css';
import { POST_APPLIED_COMPANY, POST_FAVORITE_COMPANIES_INTERVIEW, REMOVE_APPLIED_COMPANIES_INTERVIEW, REMOVE_FAVORITE_COMPANIES_INTERVIEW } from '../../../utils/constants/apiConstants';
import UserRating from '../UserRating/UserRating';
import StarIcon from '../../Shared/StarIcon/StarIcon';
import likeIcon from "../../../assets/images/icons/like-icon.svg";
import likeIconFavorite from "../../../assets/images/icons/like-icon-favorite.svg";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import axios from 'axios';
import { FaCircleXmark } from 'react-icons/fa6';

const CompanyCard = ({ info, refetch, setShowAppliedDialog }) => {

    const [favoriteCompanyStyle, setFavoriteCompanyStyle] = useState(false);
    const { userRatings } = info;
    const userInfo = useSelector((store) => store.app.userInfo);
    const queryClient = useQueryClient();
    const [appliedCompany, setAppliedCompany] = useState(false);
    const [showRemoveApplied, setShowRemoveApplied] = useState(false);


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

    const handleApplied = () => {
        const appliedCompany = {
            ...info,
            isApplied: true,
            user: {
                email: userInfo?.email
            }
        }
        delete appliedCompany._id;
        postAppliedMutate(appliedCompany);
    }

    const postAppliedCompany = (appliedCompany) => {
        try {
            const { data } = axios.post(POST_APPLIED_COMPANY, appliedCompany);
            setAppliedCompany(true);
        } catch (error) {
            toast.error(error);
        }
    }

    const { mutate: removeFavoriteMutate } = useMutation({
        mutationFn: removeFavoriteCompany,
        onSuccess: () => {
            toast.error("Favorite removed!");
            setAppliedCompany(false);
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
        setAppliedCompany(info.isApplied);
    }, [info.isFavoriteCompany, info.isApplied]);

    const { mutate: postAppliedMutate } = useMutation({
        mutationFn: postAppliedCompany,
        onSuccess: () => {
            toast.success(`${info?.displayName || "Company"} marked as applied!`);
            setAppliedCompany(true);
            queryClient.invalidateQueries({
                queryKey: ["companies"]
            });
        },
        onError: () => {
            toast.error("Failed updating applied status!");
        }
    });

    const handleRemoveApplied = (e) => {
        e.preventDefault();
        removeAppliedMutate(info);
        setAppliedCompany(false);
    }

    const removeAppliedCompany = async (appliedCompanyObj) => {
        const updatedAppliedCompanyObj = {
            ...appliedCompanyObj,
            user: appliedCompanyObj.user || {
                email: userInfo?.email
            }
        };
        const result = await fetch(`${REMOVE_APPLIED_COMPANIES_INTERVIEW}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedAppliedCompanyObj)
        })
        const resultJson = await result.json();
    }

    const { mutate: removeAppliedMutate } = useMutation({
        mutationFn: removeAppliedCompany,
        onSuccess: () => {
            toast.error("Applied label removed!");
            queryClient.invalidateQueries({
                queryKey: ["companies"]
            });
        },
        onError: () => {
            toast.error("Applied label removal failed!");
        }
    });

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <a href={info.companyCareerPageURL} target='_blank'>
                    <div className={`company-card-container 
                    p-16  flex flex-col justify-center items-center w-[240px] lg:w-[320px] md:w-[320px]
                    rounded-xl flex-wrap relative  shadow-xl border-1 hover:bg-gray-600 
                    dark:hover:shadow-gray-700 dark:hover:bg-gray-700 hover:shadow-gray-500 
                    ${appliedCompany ? 'bg-green-100 dark:bg-green-900' : 'dark:bg-gray-700 bg-neutral-100'} `}>
                        {appliedCompany && <span className='applied-company'
                            onMouseEnter={() => setShowRemoveApplied(true)}
                            onMouseLeave={() => setShowRemoveApplied(false)}>
                            {!showRemoveApplied ?
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" data-supported-dps="16x16"
                                    fill="currentColor" className="mercado-match" width="16" height="16" focusable="false">
                                    <path d="M8 1a7 7 0 107 7 7 7 0 00-7-7zm-.6 11L4.25 8.85 5.6 7.51 7.1 9l2.63-4H12z"></path>
                                </svg> :
                                <FaCircleXmark className='text-red-500' />}
                            {showRemoveApplied ?
                                <span className='text-red-500' onClick={(e) => handleRemoveApplied(e)}>
                                    Remove Applied
                                </span> :
                                <span>
                                    Applied
                                </span>}
                        </span>}
                        <span className='star-company' onClick={(e) => handleFavoriteClick(e)}>
                            <img src={favoriteCompanyStyle ? likeIconFavorite : likeIcon} alt='favorite' />
                        </span>
                        <img src={info.companyIconURL} alt='company-icon' loading='lazy' className='h-6 lg:h-[60px] md:h-[60px]' />
                        <span className='company-name whitespace-nowrap'> {info?.displayName}</span>
                        <span className='user-star-company'>
                            <UserRating userRatingInfo={userRatings} />
                        </span>
                    </div>
                </a>
            </AlertDialogTrigger>
            {!info?.isApplied && <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Did you apply to any role at {info?.displayName}?</AlertDialogTitle>
                    <AlertDialogDescription>
                        If yes, please select 'Applied'. {info?.displayName} will be marked as 'Applied'.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                    <AlertDialogAction className="cursor-pointer" onClick={handleApplied}>Applied</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>}
        </AlertDialog>

    )
}

export default CompanyCard;