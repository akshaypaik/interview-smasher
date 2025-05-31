import './LoadingSpinnerSolid.css';
import { useSelector } from 'react-redux';

const LoadingSpinnerSolid = ({ width }) => {

    const darkMode = useSelector((store) => store.app.darkMode);

    return (
        <div className='loading-spinner-solid-container'>
            <div className={`loader ${darkMode ? 
                'dark' : 
                'light'}`} style={{ width: width }}></div>
            {/* <h2>Loading...</h2> */}
        </div>
    )
}

export default LoadingSpinnerSolid; 