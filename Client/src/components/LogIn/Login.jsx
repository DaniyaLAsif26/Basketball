import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import {
    Shield,
    Zap,
    Check
} from 'lucide-react';
import './login.css';

import logo from '../../assets/white.png'
import { useLogin } from '../../context/LoginContext';

const BackEndRoute = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function Login() {

    const { setIsUserLoggedIn, setUserData , checkCompleteUserProfile } = useLogin()

    const [isLogin, setIsLogin] = useState()

    const navigate = useNavigate()

    const features = [
        "Access to all tournaments",
        "Real-time rankings",
        "News",
        "Tournament registration"
    ];

    const handleGoogleLogin = async (response) => {
        try {
            const res = await fetch(`${BackEndRoute}/api/auth/google`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-type": 'application/json',
                },
                body: JSON.stringify({
                    token: response.credential
                }),
            })

            const dataRes = await res.json()

            if (dataRes.success === false) {
                alert("Error Logging In");
                navigate('/')
                return
            }

            setIsUserLoggedIn(true)
            setUserData(dataRes.user)
            if(checkCompleteUserProfile(dataRes.user)){
               return navigate('/')
            }
            else{
                return navigate('/my-account/edit')
            }
            
        }
        catch (err) {
            console.error(err);
        }
    };

    // ✅ Initialize Google once
    useEffect(() => {
        /* global google */
        if (window.google) {
            google.accounts.id.initialize({
                client_id: import.meta.env.VITE_O_AUTH_CLIENT_ID,
                callback: handleGoogleLogin,
            });

            google.accounts.id.renderButton(
                document.getElementById("googleSignInButton"),
                { theme: "outline", size: "large" }
            );
        }
    }, []);

    // ✅ Trigger Google account chooser
    const handleGoogleAuth = () => {
        /* global google */
        google.accounts.id.prompt(); // 👈 THIS opens account selection
    };


    return (
        <div className="auth-page">

            {/* Left Side - Branding */}
            <div className="auth-branding">
                <div className="branding-overlay"></div>
                <div className="branding-content">
                    <div className="brand-logo">
                        <a href="/"><img src={logo} alt="" /></a>
                    </div>

                    <h1 className="branding-title">
                        Welcome to Telangana Basketball Association
                    </h1>

                    <p className="branding-description">
                        Join thousands of players competing in the most prestigious basketball tournaments statewide.
                    </p>

                    <div className="features-list">
                        {features.map((feature, index) => (
                            <div key={index} className="feature-item">
                                <div className="feature-check">
                                    <Check className="check-icon" />
                                </div>
                                <span>{feature}</span>
                            </div>
                        ))}
                    </div>

                    <div className="stats-row">
                        <div className="stat-card">
                            <div className="stat-number-login">500+</div>
                            <div className="login-stat-label">Players</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-number-login">10+</div>
                            <div className="login-stat-label">Tournaments</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-number-login">33</div>
                            <div className="login-stat-label">Districts</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Auth Form */}
            <div className="auth-form-side">
                <div className="auth-form-container">

                    {/* Toggle Pills */}
                    <div className="auth-toggle">
                        <button
                            className={`toggle-pill ${isLogin ? 'active' : ''}`}
                            onClick={() => setIsLogin(true)}
                        >
                            Login
                        </button>
                        <button
                            className={`toggle-pill ${!isLogin ? 'active' : ''}`}
                            onClick={() => setIsLogin(false)}
                        >
                            Sign Up
                        </button>
                        <div className={`toggle-slider ${!isLogin ? 'signup' : ''}`}></div>
                    </div>

                    {/* Form Content */}
                    <div className="form-content">
                        <div className="form-header">
                            <h2 className="form-title">
                                {isLogin ? 'Welcome Back!' : 'Create Account'}
                            </h2>
                            <p className="form-subtitle">
                                {isLogin
                                    ? 'Sign in to access your account and continue your basketball journey'
                                    : 'Join our basketball community and start competing in tournaments & rankings'
                                }
                            </p>
                        </div>

                        {/* Google Sign In Button */}

                        {/* Google Sign In Button */}
                        <div style={{ display: 'none' }} id="googleSignInButton"></div>
                        <button className="google-btn" onClick={() => {
                            const googleBtn = document.getElementById("googleSignInButton")?.querySelector('div[role="button"]');
                            if (googleBtn) googleBtn.click();
                        }}>
                            <svg className="google-icon" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            <span>Continue with Google</span>
                        </button>

                        {/* Divider */}
                        <div className="divider">
                            <span className="divider-line"></span>
                            <span className="divider-text">Secure Authentication</span>
                            <span className="divider-line"></span>
                        </div>

                        {/* Security Info */}
                        <div className="security-info">
                            <div className="security-badge">
                                <Shield className="security-icon" />
                                <div className="security-text">
                                    <h4 className="security-title">Secure & Private</h4>
                                    <p className="security-description">
                                        We use Google's secure authentication. Your credentials are never stored on our servers.
                                    </p>
                                </div>
                            </div>

                            <div className="security-badge">
                                <Zap className="security-icon" />
                                <div className="security-text">
                                    <h4 className="security-title">Quick & Easy</h4>
                                    <p className="security-description">
                                        One-click sign in with your existing Google account. No passwords to remember.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Terms */}
                        <p className="terms-text">
                            By continuing, you agree to our{' '}
                            <a href="/terms" className="terms-link">Terms of Service</a>
                            {' '}and{' '}
                            <a href="/privacy" className="terms-link">Privacy Policy</a>
                        </p>
                    </div>

                </div>

                {/* Footer */}
                <div className="auth-footer">
                    <p className="footer-text">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                        <a
                            className="footer-link"
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? 'Sign Up' : 'Login'}
                        </a>
                    </p>
                </div>
            </div>

        </div>
    );
}