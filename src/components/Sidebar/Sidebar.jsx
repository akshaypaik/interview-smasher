import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { hideSideBar, setCurrentSidebarTab } from '../../utils/ReduxStore/appSlice';
import { FaBriefcase } from 'react-icons/fa6';
// import { useSelector } from 'react-redux';

const Sidebar = () => {

    const activeTab = useSelector((store) => store.app.currentSidebarTab);
    const darkMode = useSelector((store) => store.app.darkMode);
    const dispatch = useDispatch();
    const userInfo = useSelector((store) => store.app.userInfo);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    const handleSidebarTabClick = (tabName) => {
        if (tabName === "quickcareerlinks") {
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
                <Link to={"/user-home"} className='router-link'>
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
                <Link to={"/favorite-companies"}>
                    <li className={`${activeTab === "favorite-companies" ? 'selected-tab' : ''}`} onClick={() => handleSidebarTabClick("favorite-companies")}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style={{ display: 'inherit', height: '100%' }}><path clipRule="evenodd" d="M14.813 5.018 14.41 6.5 14 8h5.192c.826 0 1.609.376 2.125 1.022.711.888.794 2.125.209 3.101L21 13l.165.413c.519 1.296.324 2.769-.514 3.885l-.151.202v.5c0 1.657-1.343 3-3 3H5c-1.105 0-2-.895-2-2v-8c0-1.105.895-2 2-2h2v.282c0-.834.26-1.647.745-2.325L12 1l1.1.472c1.376.59 2.107 2.103 1.713 3.546ZM7 10.5H5c-.276 0-.5.224-.5.5v8c0 .276.224.5.5.5h2v-9Zm10.5 9h-9V9.282c0-.521.163-1.03.466-1.453l3.553-4.975c.682.298 1.043 1.051.847 1.77l-.813 2.981c-.123.451-.029.934.255 1.305.284.372.725.59 1.192.59h5.192c.37 0 .722.169.954.459.32.399.357.954.094 1.393l-.526.876c-.241.402-.28.894-.107 1.33l.165.412c.324.81.203 1.73-.32 2.428l-.152.202c-.195.26-.3.575-.3.9v.5c0 .828-.672 1.5-1.5 1.5Z" fillRule="evenodd"></path></svg>
                        <span>Favorite Companies</span>
                    </li>
                </Link>
                <Link to={"/quickcareerlinks"}>
                    <li className={`${activeTab === "quickcareerlinks" ? 'selected-tab' : ''}`} onClick={() => handleSidebarTabClick("quickcareerlinks")}>
                        <FaBriefcase size={18} />
                        <span>My Jobs</span>
                        <span className='text-xs font-semibold text-white bg-amber-600 px-2 py-0.5 rounded-full animate-bounce'>
                            New
                        </span>
                    </li>
                </Link>
                <hr />
            </ul>}

            <ul className='sidebar-ul'>
                <h4 className='text-lg font-bold m-2'>
                    Explore
                </h4>
                <Link to={"/quickcareersearch"} className='router-link'>
                    <li className={`${activeTab === "quickcareersearch" ? 'selected-tab' : ''}`} onClick={() => handleSidebarTabClick("quickcareersearch")}>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="24" width="24" enableBackground="new 0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9.6 16.8h4.8v1.8H9.6z" fill="none"></path><path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6a2 2 0 0 0-2-2H4c-1.11 0-2 .89-2 2v10a2 2 0 0 0 2 2H0v2h24v-2h-4ZM4 16V6h16v10.01L4 16Zm5.097-6.047c0-1.027.836-1.864 1.864-1.864 1.027 0 1.864.837 1.864 1.864a1.867 1.867 0 0 1-1.864 1.864 1.867 1.867 0 0 1-1.864-1.864Zm7.032 4.236-2.482-2.482a3.19 3.19 0 0 0 .527-1.754A3.216 3.216 0 0 0 10.96 6.74a3.217 3.217 0 0 0-3.214 3.213 3.218 3.218 0 0 0 3.214 3.214 3.19 3.19 0 0 0 1.724-.51l2.489 2.487.955-.955Z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
                        <span>Quick Career Search</span>
                    </li>
                </Link>
                <Link to={"/trending-news"} className='router-link'>
                    <li className={`${activeTab === "trending-news" ? 'selected-tab' : ''}`} onClick={() => handleSidebarTabClick("trending-news")}>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="m22 3-1.67 1.67L18.67 3 17 4.67 15.33 3l-1.66 1.67L12 3l-1.67 1.67L8.67 3 7 4.67 5.33 3 3.67 4.67 2 3v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V3zM11 19H4v-6h7v6zm9 0h-7v-2h7v2zm0-4h-7v-2h7v2zm0-4H4V8h16v3z"></path></svg>
                        <span>Trending News</span>
                    </li>
                </Link>
                <Link to={"/courses"} className='router-link'>
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
                        <span className='text-xs font-semibold text-white bg-amber-600 px-2 py-0.5 rounded-full animate-bounce'>
                            New
                        </span>
                    </li>
                </Link>
                {/* <Link to={"/interview"} className='router-link'>
                    <li className={`${activeTab === "finishedInterviews" ? 'selected-tab' : ''}`} onClick={() => handleSidebarTabClick("finishedInterviews")}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style={{ display: 'inherit', height: '100%' }}><path clipRule="evenodd" d="m14 2-1.5.886-5.195 3.07C4.637 7.533 3 10.401 3 13.5c0 4.694 3.806 8.5 8.5 8.5s8.5-3.806 8.5-8.5V1l-1.5 1-3 2L14 5V2ZM8.068 7.248l4.432-2.62v3.175l2.332-1.555L18.5 3.803V13.5c0 3.866-3.134 7-7 7s-7-3.134-7-7c0-2.568 1.357-4.946 3.568-6.252ZM9 15c0-1.226.693-2.346 1.789-2.894L15 10v5c0 1.657-1.343 3-3 3s-3-1.343-3-3Z" fillRule="evenodd"></path></svg>
                        <span>Finished</span>
                    </li>
                </Link> */}
                <hr />
            </ul>}

            {isUserLoggedIn && <ul className='sidebar-ul'>
                <h4 className='text-lg font-bold m-2'>
                    Preparations
                </h4>
                <Link to={"/dsa-preparation"} className='router-link'>
                    <li className={`${activeTab === "dsa-preparation" ? 'selected-tab' : ''}`} onClick={() => handleSidebarTabClick("dsa-preparation")}>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" role="img" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M8.226,19.857H1.353l1.79-4.225h4.812L13.308,3.21H7.564l-4.226,9.82h2.587c.18.3.511.51.887.51a1.04,1.04,0,0,0,1.038-1.037c0-.572-.467-1.023-1.038-1.023-.421,0-.767.24-.932.602H4.647l3.503-7.94h3.76L7.383,14.684l-4.766.03L0,20.79h8.842L10,18.263h3.835l1.278,2.526H24L15.985,3.211Zm2.27-2.586,1.384-3.023,1.503,3.023zm5.218,2.691-.872-1.759h2.737c.18.33.526.556.917.556a1.04,1.04,0,0,0,1.038-1.037,1.04,1.04,0,0,0-1.038-1.038c-.42,0-.782.256-.947.617H14.42l-2.09-4.06,1.534-3.369,1.729,3.519h.812c.165.346.526.601.932.601a1.04,1.04,0,0,0,1.038-1.037,1.04,1.04,0,0,0-1.038-1.038c-.436,0-.812.271-.962.662h-.3l-1.79-3.64,1.699-3.728,6.677,14.751Z"></path></svg>
                        <span>DSA</span>
                        <span className='text-xs font-semibold text-white bg-amber-600 px-2 py-0.5 rounded-full animate-bounce'>
                            New
                        </span>
                    </li>
                </Link>
                {/* <Link to={"/interview"} className='router-link'>
                    <li className={`${activeTab === "finishedInterviews" ? 'selected-tab' : ''}`} onClick={() => handleSidebarTabClick("finishedInterviews")}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style={{ display: 'inherit', height: '100%' }}><path clipRule="evenodd" d="m14 2-1.5.886-5.195 3.07C4.637 7.533 3 10.401 3 13.5c0 4.694 3.806 8.5 8.5 8.5s8.5-3.806 8.5-8.5V1l-1.5 1-3 2L14 5V2ZM8.068 7.248l4.432-2.62v3.175l2.332-1.555L18.5 3.803V13.5c0 3.866-3.134 7-7 7s-7-3.134-7-7c0-2.568 1.357-4.946 3.568-6.252ZM9 15c0-1.226.693-2.346 1.789-2.894L15 10v5c0 1.657-1.343 3-3 3s-3-1.343-3-3Z" fillRule="evenodd"></path></svg>
                        <span>Finished</span>
                    </li>
                </Link> */}
                <hr />
            </ul>}

        </div>
    )
}

export default Sidebar;