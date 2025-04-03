import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Body from './components/Body/Body';
import MainContainer from './components/MainContainer/MainContainer';
import { useSelector } from 'react-redux';
import { lazy, Suspense } from 'react';

function App() {

  const darkMode = useSelector((store) => store.app.darkMode);

  const Interviews = lazy(() => import('./components/Interviews/Interviews.jsx'));
  const Login = lazy(() => import('./components/Login/Login.jsx'));
  const FavoriteCompanies = lazy(() => import('./components/Interviews/FavoriteCompanies/FavoriteCompanies.jsx'));
  const TopicPage = lazy(() => import('./components/TopicPage/TopicPage.jsx'));
  const CoursePage = lazy(() => import('./components/CoursePage/CoursePage.jsx'));

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Body />,
      children: [
        {
          path: "/",
          element: <MainContainer />
        },
        {
          path: "/course/:courseId",
          element: <Suspense><CoursePage /></Suspense>
        },
        {
          path: "/topic/:courseName/:topicName",
          element: <Suspense><TopicPage /></Suspense>
        },
        {
          path: "interviews",
          element: <Suspense><Interviews /></Suspense>
        },
        {
          path: "login",
          element: <Suspense><Login /></Suspense>
        },
        {
          path: "favorite-companies",
          element: <Suspense><FavoriteCompanies /></Suspense>
        }
      ]
    }
  ]);

  return (
    <div className={`app-container ${!darkMode ? 'light-mode' : ''}`}>
      <div className='app-body-container'>
        <RouterProvider router={routes} />
      </div>
    </div>
  )
}

export default App
