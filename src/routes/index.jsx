import { createBrowserRouter } from 'react-router-dom';
import AdminLogin from '../Pages/Admin/AdminLogin';
import UserLogin from '../Pages/User/UserLogin';
import ErrorPage from '../Pages/ErrorPage/ErrorPage';
import Dashboard from '../Pages/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import Home from '../Pages/home/Home';
import CreateUser from '../Pages/CreateUser';

export const router = createBrowserRouter([
    {
        path: "/admin/dashboard",
        element: (
            <ProtectedRoute role="admin">
                <Dashboard />
            </ProtectedRoute>
        ),
    },
    {
        path:"/admin/createUser",
        element: (
            <ProtectedRoute role="admin">
                <CreateUser />
            </ProtectedRoute>
        )
    },
    {
        path: "/adminLogin",
        element: <AdminLogin />,
    },
    {
        path: "/Login",
        element: <UserLogin />,
    },
    {
        path: "/home",
        element: (
            <ProtectedRoute role="user">
                <Home />
            </ProtectedRoute>
        ),
    },
    {
        path: "*",
        element: <ErrorPage />, // Custom Error Page
    }
]);
