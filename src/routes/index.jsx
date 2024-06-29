import { createBrowserRouter } from 'react-router-dom';
import AdminLogin from '../Pages/Admin/AdminLogin';
import UserLogin  from '../Pages/User/UserLogin';
import ErrorPage from '../Pages/ErrorPage/ErrorPage';
import Dashboard from '../Pages/Dashboard';


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
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