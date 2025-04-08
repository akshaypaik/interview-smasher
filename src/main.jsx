import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import appStore from './utils/ReduxStore/appStore.js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClientWithoutSlate = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0    // time to refetching the data and not use cache
    }
  }
});

createRoot(document.getElementById('root')).render(
  <Provider store={appStore}>
    {/* <StrictMode> */}
    <QueryClientProvider client={queryClientWithoutSlate}>
      <App />
    </QueryClientProvider>
    {/* </StrictMode> */}
  </Provider>
)
