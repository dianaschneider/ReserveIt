import React, {useState} from "react";
import {Button, Checkbox, Form, Input, Row} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {useNavigate} from "react-router-dom";
import './Styling.css'
import axios from "axios";
import {DATABASE} from "../fetchingData/Constants";
import Logo from "../../resources/images/reserveit-logo.svg";

const LoginForm = (props) => {
    const [admin, setAdmin] = useState(false);
    let navigate = useNavigate();

    const onFinish = (values) => {
        // eslint-disable-next-line
        const url = DATABASE + (admin ? "/admins/admin" : "/waiters/waiter");
        axios.get(url + "?username=" + values.username + "&password=" + values.password).then(res => {
            props.initialiseUser(res.data.id, admin)
            //TODO: ADD ADMIN TO PATH TO KNOW OR HOLD THE USER DATA
            let path = '/restaurant/' + res.data.restaurant;
            navigate(path);
        })
            .catch(() => alert('Wrong credentials or user does not exist'))
    };

    const onChangeUserType = (e) => {
        setAdmin(e.target.checked);
    }

    const changeToRegister = () => {
        navigate('/register')
    }

    return (
        <div>
            <Row>
                <img src={Logo} alt="reserveit-logo" className="logo"/>
            </Row>
            <Row className="login-form">
                <Form
                    name="normal_login"
                    className="form"
                    initialValues={{remember: true,}}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{required: true, message: 'Please input your Username!',},]}
                    >
                        <Input prefix={<UserOutlined/>} placeholder="Username"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{required: true, message: 'Please input your Password!',},]}
                    >
                        <Input
                            prefix={<LockOutlined/>}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Checkbox onChange={onChangeUserType} checked={admin}>Admin</Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="form-buttons-login">
                            Log in
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button type="link" className="form-buttons-register"
                                onClick={() => changeToRegister()}>
                            Register Now
                        </Button>
                    </Form.Item>
                </Form>
            </Row>
        </div>
    );
};

export default LoginForm;
