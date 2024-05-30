import React from "react";
import {Button, Form, Input} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";

const AddStaffForm = (props) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        props.saveStaff(values);
        form.resetFields();
    };

    return (
        <>
            <Form
                form={form}
                name="register-form"
                autoComplete="off"
                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    rules={[{required: true, message: 'Please input your Email!',},]}
                >
                    <Input prefix={<UserOutlined/>} placeholder="Email"/>
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
                <Form.Item
                    name="firstName"
                    rules={[{required: true, message: 'Please input your first name!',},]}
                >
                    <Input prefix={<UserOutlined/>} placeholder="First Name"/>
                </Form.Item>
                <Form.Item
                    name="lastName"
                    rules={[{required: true, message: 'Please input your last name!',},]}
                >
                    <Input prefix={<UserOutlined/>} placeholder="Last Name"/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="form-buttons-login">
                        Register waiter!
                    </Button>
                </Form.Item>
            </Form>
        </>);
};

export default AddStaffForm;