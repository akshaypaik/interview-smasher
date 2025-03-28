import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Body from './components/Body/Body';
import MainContainer from './components/MainContainer/MainContainer';

function App() {

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Body />,
      children: [
        {
          path: "/",
          element: <MainContainer />
        }
      ]
    }
  ]);

  return (
    <div className='app-container'>
      <Header />
      <div className='app-body-container'>
        <RouterProvider router={routes} />
      </div>
    </div>
  )
}

export default App
