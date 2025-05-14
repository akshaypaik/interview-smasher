import React from 'react';
import './Logo.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openSideBar, setCurrentSidebarTab } from '../../../utils/ReduxStore/appSlice';

const Logo = () => {

  const dispatch = useDispatch();

  const handleLogoClick = () => {
    dispatch(setCurrentSidebarTab("home"));
    dispatch(openSideBar());
  }

  return (
    <Link to={"/"}>
      <div className='logo-container hidden lg:block md:block cursor-pointer' onClick={handleLogoClick}>
        INTERVIEW SMASHER
      </div>
    </Link>
  )
}

export default Logo