import React from "react";
import {Button, Form, Input} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {useNavigate} from "react-router-dom";
import './Styling.css'
import axios from "axios";
import {DATABASE} from "../fetchingData/Constants";

const LoginForm = (props) => {
    let navigate = useNavigate();

    const onFinish = (values) => {
        axios.post(DATABASE + "/auth/signin", values).then(res => {
            props.initialiseUserToken(res.data.token)
            let path = '/restaurant';
            navigate(path);
        })
            .catch(() => alert('Wrong credentials or user does not exist'))
    };

    return (
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
                <Button type="primary" htmlType="submit" className="form-buttons-login">
                    Log in
                </Button>
            </Form.Item>
            <Form.Item>
                <Button type="link" className="form-buttons-register" onClick={() => props.updateLoginMode(false)}>
                    Register Now
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;
