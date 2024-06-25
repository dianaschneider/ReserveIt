import React, {useState} from "react";
import {Button, Form, Input, Select} from 'antd';
import {UploadOutlined} from "@ant-design/icons";
import Upload from "antd/es/upload/Upload";

const AddFoodForm = (props) => {
    const [form] = Form.useForm();
    const [filePhoto, setFilePhoto] = useState([])
    const onFinish = (values) => {
        const item = {
            name: values.name,
            price: values.price,
            currency: values.currency,
            quantity: values.quantity,
            description: values.description,
            category: values.category
        }
        const formData = new FormData();
        formData.append('item', JSON.stringify(item));
        if (filePhoto.length > 0) {
            formData.append('image', filePhoto[0]);
        }
        props.saveItem(formData);
        form.resetFields();
        setFilePhoto([]);
    };

    const categoryOptions = [
        {value: 'SOFT_DRINK', label: 'Soft Drink'},
        {value: 'WINE', label: 'Wine'},
        {value: 'ALC_COCKTAIL', label: 'Alcoholic Cocktail'},
        {value: 'NONALC_COCKTAIL', label: 'Nonalcoholic Cocktail'},
        {value: 'BOTTLES', label: 'Bottles'},
        {value: 'APPETIZER', label: 'Appetizer'},
        {value: 'MAIN_DISH', label: 'Main Dish'},
        {value: 'DESSERT', label: 'Dessert'},
    ];
    const currencyOptions = [
        {value: 'RON', label: 'RON'},
        {value: 'EUR', label: 'EUR'},
    ];
    const beforeUploadImage = (file) => {
        setFilePhoto([file])
        return true;
    }
    const onRemoveUploadImage = (_) => {
        setFilePhoto([]);
    }

    return <>
        <Form
            form={form}
            onFinish={onFinish}
            autoComplete="off">
            <Form.Item
                label="Name"
                name="name"
                rules={[{required: true, message: 'Please input your item name!',},]}>
                <Input/>
            </Form.Item>
            <Form.Item
                label="Category"
                name="category"
                rules={[{required: true, message: 'Please input your item category!',},]}>
                <Select
                    options={categoryOptions}
                />
            </Form.Item>
            <Form.Item
                label="Quantity"
                name="quantity"
                rules={[{required: true, message: 'Please input your item quantity!',},]}>
                <Input/>
            </Form.Item>
            <Form.Item
                label="Price"
                name="price"
                rules={[{required: true, message: 'Please input your item price!',},]}>
                <Input/>
            </Form.Item>
            <Form.Item
                label="Currency"
                name="currency"
                rules={[{required: true, message: 'Please input your item currency!',},]}>
                <Select
                    options={currencyOptions}
                />
            </Form.Item>
            <Form.Item
                label="Description"
                name="description"
                rules={[{required: false, message: 'Please input your item description!',},]}>
                <Input/>
            </Form.Item>
            <Form.Item
                label="Image"
                name="image">
                <Upload
                    fileList={filePhoto}
                    beforeUpload={beforeUploadImage}
                    onRemove={onRemoveUploadImage}
                    maxCount={1}
                >
                    <Button icon={<UploadOutlined/>}>Upload a photo of the item</Button>
                </Upload>
            </Form.Item>
            <Form.Item
                wrapperCol={{offset: 8, span: 16,}}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    </>
}

export default AddFoodForm;