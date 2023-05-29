import React from "react";
import Logo from "../../resources/images/reserveit-logo.svg";
import {Row} from "antd";
import './Styling.css'
import LoginForm from "./LoginForm";

/*
* TODO: Add option for register
*       --- Create register form that will create a purchase for the management app & will configure the account for the restaurant
* */
const LandingPage = () => {
    return (
        <div>
            <Row>
                <img src={Logo} alt="reserveit-logo" className="logo"/>
            </Row>
            <Row className="login-form">
                <LoginForm/>
            </Row>
        </div>
    );
};

export default LandingPage;
