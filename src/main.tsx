import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App'
import Instructions from './pages/Instructions'
import Overview from './pages/Overview'
import Materials from './pages/Materials'
import Fanworks from './pages/Fanworks'
import Profiles from './pages/Profiles'
import Messages from './pages/Messages'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Instructions /> },
      { path: "/timeline", element: <Overview /> },
      { path: "/materials", element: <Materials /> },
      { path: "/must-eat", element: <Fanworks /> },
      { path: "/profiles", element: <Profiles /> },
      { path: "/messages", element: <Messages /> },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
