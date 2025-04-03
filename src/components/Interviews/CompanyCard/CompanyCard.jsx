import React from 'react';
import './CompanyCard.css';

const CompanyCard = ({ info }) => {
    return (
        <a href={info.companyCareerPageURL} target='_blank'>
            <div className='company-card-container'>
                <img src={info.companyIconURL} alt='company-icon' />
                {info?.displayName}
            </div>
        </a>
    )
}

export default CompanyCard;