import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';

import Main from './pages/Main/Main';

const router = createBrowserRouter([
    {
        path: "/log-in",
        element: <h1>Log-In Page</h1>
    },
    {
        path: "/dashboard",
        element: <Main />
    },

]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
