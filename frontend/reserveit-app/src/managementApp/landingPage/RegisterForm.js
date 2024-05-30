import React, {useState} from "react";
import './Styling.css'
import RegisterRestaurantForm from "./RegisterRestaurantForm";
import RegisterAdminForm from "./RegisterAdminForm";
import {Row} from "antd";
import Logo from "../../resources/images/reserveit-logo.svg";
import {useNavigate} from "react-router-dom";

const RegisterForm = (props) => {
    const [restaurantId, setRestaurantId] = useState(0);
    const [registerRestaurant, setRegisterRestaurant] = useState(true);
    let navigate = useNavigate();

    const updateRestaurantId = (id) => {
        setRestaurantId(id);
    };

    const updateRegsiterRestaurantMode = (mode) => {
        setRegisterRestaurant(mode);
    };

    const changeToLogin = () => {
        navigate('/')
    }

    return (
        <div>
            <Row>
                <img src={Logo} alt="reserveit-logo" className="logo"/>
            </Row>
            <Row className="login-form">
                {registerRestaurant ?
                    <RegisterRestaurantForm
                        updateRestaurantId={updateRestaurantId}
                        updateRegisterRestaurantMode={updateRegsiterRestaurantMode}
                    />
                    :
                    <RegisterAdminForm
                        restaurantId={restaurantId}
                        changeToLogin={changeToLogin}
                    />}
            </Row>
        </div>
    );
};

export default RegisterForm;
