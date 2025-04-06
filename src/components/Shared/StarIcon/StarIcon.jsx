import React from 'react';
import './StarIcon.css';

const StarIcon = ({ fill, stroke }) => {
    return (
        <span className='star-company'>
            <svg viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
                <polygon points="12,2 15,8.5 22,9.5 17,14.5 18.5,21 12,17.5 5.5,21 7,14.5 2,9.5 9,8.5"
                    stroke={stroke} strokeWidth="1" fill={fill} />
            </svg>
        </span>
    )
}

export default StarIcon