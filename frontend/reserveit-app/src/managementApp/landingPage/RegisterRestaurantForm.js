import React from "react";
import {Button, Form, Input} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import './Styling.css'
import axios from "axios";
import {DATABASE} from "../fetchingData/Constants";

const RegisterRestaurantForm = (props) => {
    const onFinish = (values) => {
        axios.post(DATABASE + "/restaurants", values).then((res) => {
            axios.post(DATABASE + `/menus?restaurantId=${res.data.id}`, {})
                .then(() => {
                    props.updateRestaurantId(res.data.id);
                    props.updateRegisterRestaurantMode(false);
                })
        })
            .catch(() => alert('Cannot save restaurant, please try again later!'))
    };

    return (
        <Form
            name="register-restaurant-form"
            className="form"
            initialValues={{remember: true,}}
            onFinish={onFinish}
        >
            <Form.Item
                name="name"
                rules={[{required: true, message: 'Please input your restaurant name!',},]}
            >
                <Input prefix={<UserOutlined/>} placeholder="Name"/>
            </Form.Item>
            <Form.Item
                name="address"
                rules={[{required: true, message: 'Please input your restaurant address!',},]}
            >
                <Input prefix={<UserOutlined/>} placeholder="Address"/>
            </Form.Item>
            <Form.Item
                name="logo"
                rules={[{required: true, message: 'Please input your restaurant logo!',},]}
            >
                <Input prefix={<UserOutlined/>} placeholder="Logo"/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="form-buttons-login">
                    Register restaurant
                </Button>
            </Form.Item>
        </Form>
    );
};

export default RegisterRestaurantForm;
