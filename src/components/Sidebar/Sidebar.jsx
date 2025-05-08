import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { hideSideBar, setCurrentSidebarTab } from '../../utils/ReduxStore/appSlice';
// import { useSelector } from 'react-redux';

const Sidebar = () => {

    const activeTab = useSelector((store) => store.app.currentSidebarTab);
    const darkMode = useSelector((store) => store.app.darkMode);
    const dispatch = useDispatch();
    const userInfo = useSelector((store) => store.app.userInfo);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    const handleSidebarTabClick = (tabName) => {
        if (tabName === "quickCareerLinks") {
            dispatch(hideSideBar());
        }
        dispatch(setCurrentSidebarTab(tabName));
    }

    useEffect(() => {
        if (userInfo?.email) {
            setIsUserLoggedIn(true);
        } else {
            setIsUserLoggedIn(false);
        }
    }, [userInfo]);

    return (
        <div className='sidebar-container'>

            <ul className='sidebar-ul'>
                <Link to={"/"} className='router-link'>
                    <li className={`${activeTab === "home" ? 'selected-tab' : ''}`} onClick={() => handleSidebarTabClick("home")}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style={{ display: 'inherit', height: '100%' }}><path clipRule="evenodd" d="M22.146 11.146a.5.5 0 01-.353.854H20v7.5a1.5 1.5 0 01-1.5 1.5H14v-8h-4v8H5.5A1.5 1.5 0 014 19.5V12H2.207a.5.5 0 01-.353-.854L12 1l10.146 10.146Z" fillRule="evenodd"></path></svg>
                        <span>Home</span>
                    </li>
                </Link>
                <hr />
            </ul>

            {isUserLoggedIn && <ul className='sidebar-ul'>
                <h4 className='text-lg font-bold m-2'>
                    <span></span>You
                    <svg xmlns="http://www.w3.org/2000/svg" fill={darkMode ? 'white' : 'black'} height="16" viewBox="0 0 16 16" width="16" focusable="false" aria-hidden="true" style={{ display: 'inherit', height: '100%' }}><path d="M4.97 12.65 9.62 8 4.97 3.35l.71-.71L11.03 8l-5.35 5.35-.71-.7z"></path></svg>
                </h4>
                {/* <li className={`${activeTab === "history" ? 'selected-tab' : ''}`} onClick={() => handleSidebarTabClick("history")}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style={{ display: 'inherit', height: '100%' }}><path clipRule="evenodd" d="M14.203 4.83c-1.74-.534-3.614-.418-5.274.327-1.354.608-2.49 1.6-3.273 2.843H8.25c.414 0 .75.336.75.75s-.336.75-.75.75H3V4.25c0-.414.336-.75.75-.75s.75.336.75.75v2.775c.935-1.41 2.254-2.536 3.815-3.236 1.992-.894 4.241-1.033 6.328-.392 2.088.641 3.87 2.02 5.017 3.878 1.146 1.858 1.578 4.07 1.215 6.223-.364 2.153-1.498 4.1-3.19 5.48-1.693 1.379-3.83 2.095-6.012 2.016-2.182-.08-4.26-.949-5.849-2.447-1.588-1.499-2.578-3.523-2.784-5.697-.039-.412.264-.778.676-.817.412-.04.778.263.818.675.171 1.812.996 3.499 2.32 4.748 1.323 1.248 3.055 1.973 4.874 2.04 1.818.065 3.598-.532 5.01-1.681 1.41-1.15 2.355-2.773 2.657-4.567.303-1.794-.056-3.637-1.012-5.186-.955-1.548-2.44-2.697-4.18-3.231ZM12.75 7.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75v4.886l.314.224 3.5 2.5c.337.241.806.163 1.046-.174.241-.337.163-.806-.174-1.046l-3.186-2.276V7.5Z" fillRule="evenodd"></path></svg>
                    <span>History</span>
                </li>
                <li className={`${activeTab === "yourVideos" ? 'selected-tab' : ''}`} onClick={() => handleSidebarTabClick("yourVideos")}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style={{ display: 'inherit', height: '100%' }}><path clipRule="evenodd" d="M3.5 5.5h17v13h-17v-13ZM2 5.5C2 4.672 2.672 4 3.5 4h17c.828 0 1.5.672 1.5 1.5v13c0 .828-.672 1.5-1.5 1.5h-17c-.828 0-1.5-.672-1.5-1.5v-13Zm7.748 2.927c-.333-.19-.748.05-.748.435v6.276c0 .384.415.625.748.434L16 12 9.748 8.427Z" fillRule="evenodd"></path></svg>
                    <span>Your Topics</span>
                </li> */}
                {/* <li className={`${activeTab === "watchLater" ? 'selected-tab' : ''}`} onClick={() => handleSidebarTabClick("watchLater")}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style={{ display: 'inherit', height: '100%' }}><path clipRule="evenodd" d="M20.5 12c0 4.694-3.806 8.5-8.5 8.5S3.5 16.694 3.5 12 7.306 3.5 12 3.5s8.5 3.806 8.5 8.5Zm1.5 0c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Zm-9.25-5c0-.414-.336-.75-.75-.75s-.75.336-.75.75v5.375l.3.225 4 3c.331.248.802.181 1.05-.15.248-.331.181-.801-.15-1.05l-3.7-2.775V7Z" fillRule="evenodd"></path></svg>
                    <span>Watch Later</span>
                </li> */}
                <Link to={"/favorite-companies"}>
                    <li className={`${activeTab === "favoriteCompanies" ? 'selected-tab' : ''}`} onClick={() => handleSidebarTabClick("favoriteCompanies")}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style={{ display: 'inherit', height: '100%' }}><path clipRule="evenodd" d="M14.813 5.018 14.41 6.5 14 8h5.192c.826 0 1.609.376 2.125 1.022.711.888.794 2.125.209 3.101L21 13l.165.413c.519 1.296.324 2.769-.514 3.885l-.151.202v.5c0 1.657-1.343 3-3 3H5c-1.105 0-2-.895-2-2v-8c0-1.105.895-2 2-2h2v.282c0-.834.26-1.647.745-2.325L12 1l1.1.472c1.376.59 2.107 2.103 1.713 3.546ZM7 10.5H5c-.276 0-.5.224-.5.5v8c0 .276.224.5.5.5h2v-9Zm10.5 9h-9V9.282c0-.521.163-1.03.466-1.453l3.553-4.975c.682.298 1.043 1.051.847 1.77l-.813 2.981c-.123.451-.029.934.255 1.305.284.372.725.59 1.192.59h5.192c.37 0 .722.169.954.459.32.399.357.954.094 1.393l-.526.876c-.241.402-.28.894-.107 1.33l.165.412c.324.81.203 1.73-.32 2.428l-.152.202c-.195.26-.3.575-.3.9v.5c0 .828-.672 1.5-1.5 1.5Z" fillRule="evenodd"></path></svg>
                        <span>Favorite Companies</span>
                    </li>
                </Link>
                <Link to={"/quickcareerlinks"}>
                    <li className={`${activeTab === "quickCareerLinks" ? 'selected-tab' : ''}`} onClick={() => handleSidebarTabClick("quickCareerLinks")}>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg" style={{ height: '24px' }}><path fill="none" d="M0 0h24v24H0"></path><path d="M8 11h8v2H8zm12.1 1H22c0-2.76-2.24-5-5-5h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1zM3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM19 12h-2v3h-3v2h3v3h2v-3h3v-2h-3z"></path></svg>
                        <span>Quick Career Links</span>
                    </li>
                </Link>
                <hr />
            </ul>}

            <ul className='sidebar-ul'>
                <h4 className='text-lg font-bold m-2'>
                    Explore
                </h4>
                <Link to={"/quickcareersearch"} className='router-link'>
                    <li className={`${activeTab === "interviews" ? 'selected-tab' : ''}`} onClick={() => handleSidebarTabClick("interviews")}>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="24" width="24" enableBackground="new 0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9.6 16.8h4.8v1.8H9.6z" fill="none"></path><path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6a2 2 0 0 0-2-2H4c-1.11 0-2 .89-2 2v10a2 2 0 0 0 2 2H0v2h24v-2h-4ZM4 16V6h16v10.01L4 16Zm5.097-6.047c0-1.027.836-1.864 1.864-1.864 1.027 0 1.864.837 1.864 1.864a1.867 1.867 0 0 1-1.864 1.864 1.867 1.867 0 0 1-1.864-1.864Zm7.032 4.236-2.482-2.482a3.19 3.19 0 0 0 .527-1.754A3.216 3.216 0 0 0 10.96 6.74a3.217 3.217 0 0 0-3.214 3.213 3.218 3.218 0 0 0 3.214 3.214 3.19 3.19 0 0 0 1.724-.51l2.489 2.487.955-.955Z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
                        <span>Quick Career Search</span>
                    </li>
                </Link>
                <Link to={"/trending-news"} className='router-link'>
                    <li className={`${activeTab === "trendingNews" ? 'selected-tab' : ''}`} onClick={() => handleSidebarTabClick("trendingNews")}>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="m22 3-1.67 1.67L18.67 3 17 4.67 15.33 3l-1.66 1.67L12 3l-1.67 1.67L8.67 3 7 4.67 5.33 3 3.67 4.67 2 3v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V3zM11 19H4v-6h7v6zm9 0h-7v-2h7v2zm0-4h-7v-2h7v2zm0-4H4V8h16v3z"></path></svg>
                        <span>Trending News</span>
                    </li>
                </Link>
                <Link to={"/"} className='router-link'>
                    <li className={`${activeTab === "courses" ? 'selected-tab' : ''}`} onClick={() => handleSidebarTabClick("courses")}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style={{ display: 'inherit', height: '100%' }}><path clipRule="evenodd" d="M11.271 2.689a1.5 1.5 0 011.457 0l9 5A1.5 1.5 0 0122.5 9v7a.75.75 0 01-1.5 0v-5.284l-1.5.833V17a.75.75 0 01-.741.75c-1.9.023-3.076.4-3.941.896-.71.407-1.229.895-1.817 1.448-.159.149-.322.302-.496.46a.75.75 0 01-1.046-.034l-.076-.08c-.702-.73-1.303-1.355-2.164-1.832-.875-.485-2.074-.84-3.976-.858A.75.75 0 014.5 17v-5.45l-2.228-1.24a1.5 1.5 0 010-2.622l9-5ZM6 12.383v3.891c1.703.096 2.946.468 3.946 1.022.858.475 1.508 1.07 2.08 1.652.575-.54 1.221-1.13 2.046-1.603.988-.566 2.215-.963 3.928-1.068v-3.894l-5.272 2.928a1.5 1.5 0 01-1.457 0L6 12.383ZM12 4l9 5-9 5-9-5 9-5Z" fillRule="evenodd"></path></svg>
                        <span>Courses</span>
                    </li>
                </Link>
                <hr />
            </ul>

            {isUserLoggedIn && <ul className='sidebar-ul'>
                <h4 className='text-lg font-bold m-2'>
                    Interview
                </h4>
                <Link to={"/interview"} className='router-link'>
                    <li className={`${activeTab === "interview" ? 'selected-tab' : ''}`} onClick={() => handleSidebarTabClick("interview")}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style={{ display: 'inherit', height: '100%' }}><path clipRule="evenodd" d="m14 2-1.5.886-5.195 3.07C4.637 7.533 3 10.401 3 13.5c0 4.694 3.806 8.5 8.5 8.5s8.5-3.806 8.5-8.5V1l-1.5 1-3 2L14 5V2ZM8.068 7.248l4.432-2.62v3.175l2.332-1.555L18.5 3.803V13.5c0 3.866-3.134 7-7 7s-7-3.134-7-7c0-2.568 1.357-4.946 3.568-6.252ZM9 15c0-1.226.693-2.346 1.789-2.894L15 10v5c0 1.657-1.343 3-3 3s-3-1.343-3-3Z" fillRule="evenodd"></path></svg>
                        <span>Upcoming</span>
                    </li>
                </Link>
                <Link to={"/interview"} className='router-link'>
                    <li className={`${activeTab === "finishedInterviews" ? 'selected-tab' : ''}`} onClick={() => handleSidebarTabClick("finishedInterviews")}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style={{ display: 'inherit', height: '100%' }}><path clipRule="evenodd" d="m14 2-1.5.886-5.195 3.07C4.637 7.533 3 10.401 3 13.5c0 4.694 3.806 8.5 8.5 8.5s8.5-3.806 8.5-8.5V1l-1.5 1-3 2L14 5V2ZM8.068 7.248l4.432-2.62v3.175l2.332-1.555L18.5 3.803V13.5c0 3.866-3.134 7-7 7s-7-3.134-7-7c0-2.568 1.357-4.946 3.568-6.252ZM9 15c0-1.226.693-2.346 1.789-2.894L15 10v5c0 1.657-1.343 3-3 3s-3-1.343-3-3Z" fillRule="evenodd"></path></svg>
                        <span>Finished</span>
                    </li>
                </Link>
                <hr />
            </ul>}

        </div>
    )
}

export default Sidebar;