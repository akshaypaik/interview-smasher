import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Body from './components/Body/Body';
import MainContainer from './components/MainContainer/MainContainer';
import { useSelector } from 'react-redux';
import { lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

function App() {

  const darkMode = useSelector((store) => store.app.darkMode);
  const queryClientQuickCareerCompanies = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 300 * 1000    // time to refetching the data and not use cache
      }
    }
  });
  const queryClientWithSlate = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 500 * 1000    // time to refetching the data and not use cache
      }
    }
  });
  const queryClientWithoutSlate = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0    // time to refetching the data and not use cache
      }
    }
  });

  //ag grid react
  ModuleRegistry.registerModules([AllCommunityModule]);

  const QuickCareerSearch = lazy(() => import('./components/QuickCareerSearch/QuickCareerSearch.jsx'));
  const Login = lazy(() => import('./components/Login/Login.jsx'));
  const FavoriteCompanies = lazy(() => import('./components/QuickCareerSearch/FavoriteCompanies/FavoriteCompanies.jsx'));
  const TopicPage = lazy(() => import('./components/TopicPage/TopicPage.jsx'));
  const CoursePage = lazy(() => import('./components/CoursePage/CoursePage.jsx'));
  const UserProfile = lazy(() => import("./components/UserProfile/UserProfile.jsx"));
  const TrendingNews = lazy(() => import("./components/TrendingNews/TrendingNews.jsx"));
  const UpcomingInterviews = lazy(() => import("./components/Interviews/UpcomingInterviews.jsx"));
  const QuickCareerLinks = lazy(() => import("./components/QuickCareerLinks/QuickCareerLinks.jsx"));
  const DSAPreparation = lazy(() => import("./components/DSAPreparation/DSAPreparation.jsx"));
  const UserHome = lazy(() => import("./components/UserHome/UserHome.jsx"));

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
          path: "quickcareersearch",
          element:
            <Suspense>
              <QueryClientProvider client={queryClientWithSlate}>
                <ReactQueryDevtools initialIsOpen={false} />
                <QuickCareerSearch />
              </QueryClientProvider>
            </Suspense>
        },
        {
          path: "login",
          element: <Suspense>
            <Login />
          </Suspense>
        },
        {
          path: "favorite-companies",
          element:
            <Suspense>
              <QueryClientProvider client={queryClientWithSlate}>
                <FavoriteCompanies />
              </QueryClientProvider>
            </Suspense>
        },
        {
          path: "user-profile",
          element: <Suspense> <UserProfile /> </Suspense>
        },
        {
          path: "trending-news",
          element: <Suspense>
            <QueryClientProvider client={queryClientWithSlate}>
              <ReactQueryDevtools initialIsOpen={false} />
              <TrendingNews />
            </QueryClientProvider>
          </Suspense>
        },
        {
          path: 'interview',
          element: <Suspense> <UpcomingInterviews /> </Suspense>
        },
        {
          path: 'quickcareerlinks',
          element: <Suspense> <QuickCareerLinks /> </Suspense>
        },
        {
          path: 'dsa-preparation',
          element: <Suspense> <DSAPreparation /> </Suspense>
        },
        {
          path: 'user-home',
          element: <Suspense> <UserHome /> </Suspense>
        }
      ]
    }
  ]);

  return (
    <div className={`app-container font-[Roboto_Slab] ${darkMode ? 'dark' : 'light-mode'}`}>
      <div className='app-body-container'>
        <RouterProvider router={routes} />
      </div>
    </div>
  )
}

export default App
