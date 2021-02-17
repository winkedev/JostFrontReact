import React, { useState } from 'react';
import './style.css';

import Logo from '../../assets/jost-logo1.png';
import { ReactComponent as UserSVG } from '../../assets/user.svg';
import { ReactComponent as LockSVG } from '../../assets/lock.svg';

import ReactLoading from 'react-loading';
import { useHistory } from 'react-router-dom';

import CustomInput from '../../components/CustomInput';

const Login = () => {

    const nav = useHistory();

    const [isLoading, setIsLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");

    const doLogin = async () => {

        setIsLoading(true);
        console.log(`CurrentUser: ${currentUser}, CurrentPass: ${currentPassword}`)
        await new Promise(r => setTimeout(r, 2000));
        nav.push('/Dashboard');
        setIsLoading(false)
    }

    return (
        <div className="login-container">
            <div className="login-nav"></div>
            <div className="login-wrap">
                <div className="card card-login">
                    <div className="card-header login-header">
                        <img src={Logo} width={65} height={65} />
                    </div>
                    <div class="card-body" style={{ width: "60%" }}>
                        <CustomInput value={currentUser} onChangeEvent={(e) => setCurrentUser(e.target.value)} type="text" placeholder="Usuário..." icon={<UserSVG width="16px" height="16px" fill="#FFFFFF" opacity="0.5" />} />
                        <CustomInput value={currentPassword} onChangeEvent={(e) => setCurrentPassword(e.target.value)} type="password" placeholder="Password..." icon={<LockSVG width="16px" height="16px" fill="#FFFFFF" opacity="0.5" />} />

                        <button disabled={isLoading} onClick={doLogin} className="btn btn-login">
                            {isLoading ? <ReactLoading type="spin" width="16px" height="16px" color="#000" opacity="0.5" /> : "Login"}
                        </button>
                    </div>
                </div>
            </div>
            <div className="login-footer">
                <span>SPI INTEGRADORA</span>
                <span>©2021, Designed by <span style={{ color: "blue" }}>SPI Integradora </span></span>
            </div>
        </div>
    )
}

export default Login;