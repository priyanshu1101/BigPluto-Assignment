import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import rootReducer from '../Reducers';

const ProtectedRoute = () => {
    const currentUser  = useSelector((state: ReturnType<typeof rootReducer>) => state.userReducer);

    return (
        <>
        {currentUser !== null ? (
                <Outlet />
            ) : (
                <Navigate to="/login" />
            )}
        </>
    );
};

export default ProtectedRoute;
