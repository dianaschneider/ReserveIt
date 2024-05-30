import React from "react";
import {Button, Form, Input, Select} from 'antd';

const AddFoodForm = (props) => {
    // TODO: uncomment when upload of image works
    const [form] = Form.useForm();
    // const [fileList, setFileList] = useState([]);
    //
    // const handleChange = ({fileList: newFileList}) => {
    //     setFileList(newFileList)
    // };
    const onFinish = (values) => {
        const item = {
            name: values.name,
            price: values.price,
            currency: values.currency,
            quantity: values.quantity,
            image: 'IMAGE',
            description: values.description,
            category: values.category
        }
        props.saveItem(item);
        form.resetFields();
        // setFileList([]);
    };

    // const uploadButton = (
    //     <div>
    //         <PlusOutlined/>
    //         <div style={{marginTop: 8,}}>
    //             Upload
    //         </div>
    //     </div>
    // );
    const categoryOptions = [
        { value: 'SOFT_DRINK', label: 'Soft Drink' },
        { value: 'WINE', label: 'Wine' },
        { value: 'ALC_COCKTAIL', label: 'Alcoholic Cocktail' },
        { value: 'NONALC_COCKTAIL', label: 'Nonalcoholic Cocktail' },
        { value: 'BOTTLES', label: 'Bottles' },
        { value: 'APPETIZER', label: 'Appetizer' },
        { value: 'MAIN_DISH', label: 'Main Dish' },
        { value: 'DESSERT', label: 'Dessert' },
    ];
    const currencyOptions = [
        { value: 'RON', label: 'RON' },
        { value: 'EUR', label: 'EUR' },
    ];


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
            {/*TODO: ADD VALIDATION FOR CATEGORY*/}
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
            {/*TODO: INVESTIGATE HOW TO ADD IMAGE AND STORE IT TO DB*/}
            {/*<Form.Item*/}
            {/*    label="Image"*/}
            {/*    name="image">*/}
            {/*    <Upload*/}
            {/*        action="gs://e-healthapp-1ae93.appspot.com"*/}
            {/*        listType="picture-circle"*/}
            {/*        fileList={fileList}*/}
            {/*        onChange={handleChange}*/}
            {/*    >*/}
            {/*        {fileList.length >= 8 ? null : uploadButton}*/}
            {/*    </Upload>*/}
            {/*</Form.Item>*/}
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