import { Navigate } from 'react-router-dom'
import { useLogin } from '../context/LoginContext.jsx'

export default function UserProtectedRoute({ children }) {
    const { isUserLoggedIn, isUserLoading, isAdminLoggedIn } = useLogin()

    if (isAdminLoggedIn) {
        return children;
    }

    if (isUserLoading) {
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

    if (!isUserLoggedIn) {
        return <Navigate to="/login" />
    }

    return children;
}