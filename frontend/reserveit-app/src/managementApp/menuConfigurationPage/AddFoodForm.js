import React from "react";
import {Button, Form, Input} from 'antd';

const AddFoodForm = (props) => {
    // TODO: uncomment when upload of image works
    const [form] = Form.useForm();
    // const [fileList, setFileList] = useState([]);
    //
    // const handleChange = ({fileList: newFileList}) => {
    //     setFileList(newFileList)
    // };
    const onFinish = (values) => {
        const priceArray = values.price.split(/(\s+)/);
        const item = {
            id: values.item,
            name: values.item,
            price: {
                value: priceArray[0],
                currency: priceArray[2]
            },
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

    return <>
        <Form
            form={form}
            onFinish={onFinish}
            autoComplete="off">
            <Form.Item
                label="Item"
                name="item"
                rules={[{required: true, message: 'Please input your item name!',},]}>
                <Input/>
            </Form.Item>
            <Form.Item
                label="Category"
                name="category"
                rules={[{required: true, message: 'Please input your item category!',},]}>
                <Input/>
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