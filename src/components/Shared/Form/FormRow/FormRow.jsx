import React from 'react';
import './FormRow.css';

const FormRow = ({ label, error, children }) => {
    return (
        <div className='form-row-container'>
            {label && <label htmlFor={children.props.id}>{label}</label>}
            {children}
            {error && <span className='error-container'>{error}</span>}
        </div>
    )
}

export default FormRow