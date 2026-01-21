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
    const [userData, setUserData] = useState(null)
    const [isUserLoading, setIsUserLoading] = useState(true)

    const verifyAdminLogin = async () => {
        try {
            const res = await fetch(`${BackEndRoute}/api/login/verify/admin`, {
                method: "GET",
                credentials: 'include'
            })

            const dataRes = await res.json()

            const isLoggedIn = dataRes.success === true
            setIsAdminLoggedIn(isLoggedIn)
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

    const verifyUserLogin = async () => {
        try {
            const res = await fetch(`${BackEndRoute}/api/login/verify/user`, {
                method: "GET",
                credentials: "include"
            })

            const dataRes = await res.json()
            if (dataRes.success === false) {
                setIsUserLoggedIn(false);
                setUserData(null)
                return;
            }

            const isLoggedIn = dataRes.success === true
            setIsUserLoggedIn(isLoggedIn)
            setUserData(dataRes.user)
            return isLoggedIn

        }
        catch (err) {
            console.log(err)
            setIsUserLoggedIn(false)
            setUserData(null)
            return false
        }
        finally {
            setIsUserLoading(false)
        }
    }

    useEffect(() => {
        verifyAdminLogin()
        verifyUserLogin()
    }, [location.pathname])

    const checkCompleteUserProfile = (user) => {
        if (user) {
            // Check basic details
            if (!user.email || !user.firstName || !user.lastName) return false;
            if (!user.phoneNumber || !user.homeTown || !user.dateOfBirth) return false;

            // Check physical attributes
            if (!user.height || !user.weight || !user.wingspan || !user.playerPosition) return false;
        }
        else {
            return false;
        }

        return true;
    }

    const logOutUser = async () => {
        try {
            const res = await fetch(`${BackEndRoute}/api/logout/user`, {
                method: "DELETE",
                credentials: 'include'
            })

            const dataRes = await res.json()

            if (dataRes.success === false) {
                alert(dataRes.message)
                return;
            }

            alert(dataRes.message)
            setIsUserLoggedIn(false)
            setUserData(null)
            navigate('/')
            return;
        }
        catch (err) {
            console.log(err)
            alert("Error", err.message)
        }
    }

    const logoutAdmin = async () => {
        try {
            const res = await fetch(`${BackEndRoute}/api/logout/admin`, {
                method: 'DELETE',
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
                logoutAdmin,
                isUserLoggedIn,
                setIsUserLoggedIn,
                userData,
                setUserData,
                checkCompleteUserProfile,
                logOutUser
            }
        }
        >
            {children}
        </LoginContext.Provider>
    )
}

export const useLogin = () => useContext(LoginContext)