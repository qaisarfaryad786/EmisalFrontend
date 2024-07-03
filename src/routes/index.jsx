import { createBrowserRouter } from 'react-router-dom';
import AdminLogin from '../Pages/Admin/AdminLogin';
import UserLogin  from '../Pages/User/UserLogin';
import ErrorPage from '../Pages/ErrorPage/ErrorPage';
import Dashboard from '../Pages/Dashboard'; 
import ProtectedRoute from './ProtectedRoute';

export const router = createBrowserRouter([
    {
      path: "/",
      element: 
      (
        <ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>
    ),
    },
    {
        path:"adminLogin",
        element: <AdminLogin />
    },
    {
        path:"Login",
        element:<UserLogin />
    },
    {
        path:"*",
        element:  <ErrorPage /> // Custom Error Page
    }

  ]);