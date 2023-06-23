import React from "react";
import {Button, Form, Input} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import './Styling.css'
import axios from "axios";
import {DATABASE} from "../fetchingData/Constants";

//TODO: Create register form that will create a purchase for the management app & will configure the account for the restaurant
const RegisterForm = (props) => {
    const onFinish = (values) => {
        axios.post(DATABASE + "/auth/signup", values).then(() => {
            props.updateLoginMode(true);
        })
            .catch(() => alert('Wrong credentials'))
    };

    return (
        <Form
            name="register-form"
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
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
};

export default RegisterForm;
