import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, redirectTo,  ...rest }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('https://good-guys.netlify.app/.netlify/functions/Auth', {
                    method: 'GET',
                    credentials: 'include', 
                    headers: {
                        'Content-Type': 'application/json', 
                    },
                });
                

                if (response.ok) {
                    setIsAuthenticated(true);
                } 
            } catch (error) {
                console.error('Error checking auth', error);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        isAuthenticated ? <Component {...rest} /> : <Navigate to={redirectTo} replace />
    );
};

export default ProtectedRoute;
