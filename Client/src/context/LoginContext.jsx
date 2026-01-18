import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const LoginContext = createContext()

const BackEndRoute = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const LoginProvider = ({ children }) => {
    const navigate = useNavigate()
    const location = useLocation()

    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const verifyAdminLogin = async () => {
        try {
            const res = await fetch(`${BackEndRoute}/api/login/verify/admin`, {
                method: "GET",
                credentials: 'include'
            })

            const dataRes = await res.json()

            const isLoggedIn = dataRes.success === true
            setIsAdminLoggedIn(isLoggedIn)
            console.log(isAdminLoggedIn)
            return isLoggedIn

        }
        catch (err) {
            console.log(err)
            setIsAdminLoggedIn(false)
            return false
        }
        finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        verifyAdminLogin()
    }, [location.pathname])

    const logoutAdmin = async () => {
        try {
            const res = await fetch(`${BackEndRoute}/api/logout/admin`, {
                method: 'POST',
                credentials: "include"
            })

            const dataRes = await res.json()

            if (dataRes.success === true) {
                setIsAdminLoggedIn(false)
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <LoginContext.Provider value={
            {
                isLoading,
                isAdminLoggedIn,
                setIsAdminLoggedIn,
                verifyAdminLogin,
                logoutAdmin
            }
        }
        >
            {children}
        </LoginContext.Provider>
    )
}

export const useLogin = () => useContext(LoginContext)