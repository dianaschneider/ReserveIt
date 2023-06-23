import React, {useState} from "react";
import Logo from "../../resources/images/reserveit-logo.svg";
import {Row} from "antd";
import './Styling.css'
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const LandingPage = (props) => {
    const [loginMode, setLoginMode] = useState(true);

    const updateLoginMode = (mode) => {
        setLoginMode(mode);
    }

    return (
        <div>
            <Row>
                <img src={Logo} alt="reserveit-logo" className="logo"/>
            </Row>
            <Row className="login-form">
                {
                    loginMode ?
                        <LoginForm initialiseUserToken={props.initialiseUserToken} updateLoginMode={updateLoginMode}/>
                        :
                        <RegisterForm updateLoginMode={updateLoginMode}/>
                }
            </Row>
        </div>
    );
};

export default LandingPage;
