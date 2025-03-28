import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Body from './components/Body/Body';
import MainContainer from './components/MainContainer/MainContainer';
import { useSelector } from 'react-redux';
import CoursePage from './components/CoursePage/CoursePage';

function App() {

  const darkMode = useSelector((store) => store.app.darkMode);
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
          element: <CoursePage />
        }
      ]
    }
  ]);

  return (
    <div className={`app-container ${!darkMode ? 'light-mode' : ''}`}>
      <Header />
      <div className='app-body-container'>
        <RouterProvider router={routes} />
      </div>
    </div>
  )
}

export default App
