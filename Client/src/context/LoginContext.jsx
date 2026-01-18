import { createContext, useContext, useState, useEffect, Children } from "react";
import { useNavigate } from "react-router-dom";

const LoginContext = createContext()

const BackEndRoute = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const LoginProvider = ({ children }) => {
    const navigate = useNavigate()

    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

    const verifyAdminLogin = async () => {
        try {
            const res = await fetch(`${BackEndRoute}/api/login/verify/admin`, {
                method: "GET",
                credentials: 'include'
            })

            const dataRes = await res.json()

            if (dataRes.success === true) {
                setIsAdminLoggedIn(true)
                return
            }
            else {
                setIsAdminLoggedIn(false)
                return
            }
        }
        catch (err) {
            console.log(err)
            setIsAdminLoggedIn(false)
        }
    }


    useEffect(() => {
        verifyAdminLogin()
    }, [])

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
        <LoginContext.Provider value={{ isAdminLoggedIn, verifyAdminLogin, logoutAdmin }}>
            {children}
        </LoginContext.Provider>
    )
}

export const useLogin = () => useContext(LoginContext)