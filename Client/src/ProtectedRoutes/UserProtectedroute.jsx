import { Navigate } from 'react-router-dom'
import { useLogin } from '../context/LoginContext.jsx'

export default function UserProtectedRoute({children}) {
    const { isUserLoggedIn, isUserLoading } = useLogin()

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

    if (!isUserLoggedIn && isUserLoggedIn) {
        return <Navigate to="/login" />
    }

    return children;
}