import React, { useEffect, useState } from 'react';
import './UserRating.css';
import { FaArrowCircleRight } from "react-icons/fa";

const UserRating = ({ userRatingInfo }) => {

    const { rating } = userRatingInfo;
    const [stars, setStars] = useState("");
    const [ratingDecimal, setRatingDecimal] = useState(0.0);
    const [showArrow, setShowArrow] = useState(false);

    useEffect(() => {
        generateStars(rating);
    }, []);

    const generateStars = (rating) => {
        const starArr = [];
        const ratingNum = rating?.split(".")[0];
        const ratingDecimal = rating?.split(".")[1];
        setRatingDecimal(ratingDecimal);
        for (let i = 0; i < ratingNum; i++) {
            starArr.push("⭐");
        }
        setStars(starArr);
    }

    const handleMouseHover = () => {
        setShowArrow(true);
    }

    const handleMouseLeave = () => {
        setShowArrow(false);
    }

    const handleRatingClick = (e) => {
        e.preventDefault();
        if (!userRatingInfo?.ratingLink) {
            return;
        }
        window.open(userRatingInfo?.ratingLink, "_blank");
    }

    return (
        <div className='user-rating-container flex items-center' onMouseEnter={handleMouseHover}
            onMouseLeave={handleMouseLeave} onClick={(e) => handleRatingClick(e)}>
            {showArrow && <span className='pr-2 animate-bounce-left-right'>
                <FaArrowCircleRight className='text-[#FFC107]' />
            </span>}
            {userRatingInfo.rating}/{userRatingInfo.totalRating}
            <span className='user-rating-count-star'>{stars}</span>
            <span className='half-star-company'>
                {ratingDecimal >= 0.1 && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="48" height="48">
                    <defs>
                        <linearGradient id="halfGrad">
                            <stop offset="50%" stopColor="#FFC107" />
                            <stop offset="50%" stopColor="#E0E0E0" />
                        </linearGradient>
                    </defs>
                    <path fill="url(#halfGrad)" d="M287.9 17.8L354 150l136.9 19.9c26.2 3.8 36.7 36 17.7 54.6l-99 96.5 
                        23.3 135.6c4.5 26.1-23 46-46.4 33.7L288 439.6l-122.5 64.7c-23.4 12.3-50.9-7.6-46.4-33.7L142.4 
                        335 43.4 238.5c-19-18.6-8.5-50.8 17.7-54.6L198 150 264.1 17.8c11.7-23.6 45.6-23.9 57.3 0z"/>
                </svg>}

            </span>
            <span className='user-rating-count-company'>
                ({userRatingInfo.displayUserCount})
            </span>
        </div>
    )
}

export default UserRating