import './login.css'
import logo from '../../assets/red.png'
import video from '../../assets/login-video.mp4'

export default function Login() {
    return (
        <div className="log-in-cont">
            <div className="log-in-video">
                <video src={video} autoPlay
                    muted
                    loop></video>
            </div>
            <div className="log-in-form-cont-bg">
                <div className="log-in-form-cont">
                    <div className="log-in-form-head">
                        <div className="form-logo">
                            <a href="/">   <img src={logo} alt="" /></a>
                        </div>
                        <div className="log-continue">
                            <b> Log in to continue</b>
                        </div>
                    </div>

                    <div className="log-in-from">
                        <form action="log-in-from-form">
                            <div className="log-in-email">
                                <label htmlFor="email-input" className='email-input-label' >Email <sup>*</sup>
                                </label>
                                <input type="text" id='email-input' placeholder='Enter Your Email' />
                            </div>
                            <div className="log-in-email log-in-email-pass">
                                <label htmlFor="email-pass" className='email-input-label'>Password</label>
                                <input type="password" placeholder='Enter Password' id="email-pass" />
                            </div>
                            <div >
                                <button className="cont-btn">Continue</button>
                            </div>
                        </form>
                    </div>
                    <div className="log-in-options">
                        Or login with
                    </div>
                </div>
            </div>
        </div>
    )
}