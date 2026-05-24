import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './index.css'
import App from './App.jsx'
import MovieDetail from './components/MovieDetail.jsx'

const router = createBrowserRouter([
   {
    path:"/",
    element: <App/>
  },
  {
    path:"/movies/:id",
    element: <MovieDetail/>
  }
])

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <RouterProvider router={router} />
    
  </StrictMode>,
)
