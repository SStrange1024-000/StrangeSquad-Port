import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { getItem, KEY_ACCESS_TOKEN } from '../Utilities/localStorage'

function ProtectedRoute() {
    const user = getItem(KEY_ACCESS_TOKEN);
    const location = useLocation();

    // If no token, redirect to login with return path
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return <Outlet />
}

export default ProtectedRoute