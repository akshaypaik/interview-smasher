import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Body from './components/Body/Body';
import MainContainer from './components/MainContainer/MainContainer';
import { useSelector } from 'react-redux';
import { lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {

  const darkMode = useSelector((store) => store.app.darkMode);
  const queryClientQuickCareerCompanies = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 300 * 1000    // time to refetching the data and not use cache
      }
    }
  });
  const queryClientFavCompanies = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 1000    // time to refetching the data and not use cache
      }
    }
  });

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
          element:
            <Suspense>
              <QueryClientProvider client={queryClientQuickCareerCompanies}>
                <ReactQueryDevtools initialIsOpen={false} />
                <Interviews />
              </QueryClientProvider>
            </Suspense>
        },
        {
          path: "login",
          element: <Suspense><Login /></Suspense>
        },
        {
          path: "favorite-companies",
          element:
            <Suspense>
              <QueryClientProvider client={queryClientFavCompanies}>
                <FavoriteCompanies />
              </QueryClientProvider>
            </Suspense>
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
