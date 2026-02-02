import { Navigate } from "react-router-dom";

import { useLogin } from '../context/LoginContext.jsx'

export default function LoginProtectedRoute({ children }) {
    const { isUserLoggedIn, isUserLoading, userData, checkCompleteUserProfile } = useLogin()

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

    if (isUserLoggedIn) {
        const profileComplete = checkCompleteUserProfile(userData)

        return profileComplete
            ? <Navigate to="/my-account" replace />
            : <Navigate to="/my-account/edit" replace />;
    }

    return children;
}