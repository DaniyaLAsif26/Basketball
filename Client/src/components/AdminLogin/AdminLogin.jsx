import './admin-login.css'
import red from '../../assets/red.png'
import { useState } from 'react'

export default function AdminLogin() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const adminLogin = async (e) => {
        e.preventDefault()

        try {
            console.log(username, password)
        }
        catch (err) {
            setError(err)
        }
    }


    return (
        <div className="admin-login-cont">
            <form onSubmit={adminLogin} className="form">
                <div className="admin-logo">
                    <img src={red} alt="" />
                </div>
                <p>
                    Welcome, Admin<span>sign in to continue</span>
                </p>

                <input type="email" placeholder="Email" name="email" value={username} onChange={(e) => setUsername(e.target.value)} />

                <input type="password" placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <button className="oauthButton" type='submit'>
                    Continue
                    <svg className="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 17 5-5-5-5"></path><path d="m13 17 5-5-5-5"></path></svg>
                </button>
                {error &&
                    <div className="admin-error">
                        {error}
                    </div>
                }
            </form>
        </div>
    )
}