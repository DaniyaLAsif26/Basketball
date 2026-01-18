import { Navigate } from 'react-router-dom'
import { useLogin } from '../context/LoginContext.jsx'
import { useState } from 'react'

export default function AdminProtectedRoute({ children }) {
    const { isAdminLoggedIn, isLoading } = useLogin()

    if (isLoading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                fontSize: '1.5rem'
            }}>
                Loading...
            </div>
        )
    }

    if (!isAdminLoggedIn) {
        return <Navigate to="/admin/login" />
    }

    return children;
}