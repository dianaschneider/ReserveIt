import React, {useState} from "react";
import {Button, Form, Input, Popconfirm, Table} from 'antd';
import ImageFile from "../../ImageFile";

const EditableCell = ({editing, dataIndex, title, inputType, record, index, children, ...restProps}) => {
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{margin: 0}}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const MenuTable = (props) => {
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');

    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            name: '',
            category: '',
            quantity: '',
            price: '',
            currency: '',
            description: '',
            image: '',
            ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const index = props.menuData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = props.menuData[index];
                item.currency = row.currency
                item.description = row.description
                item.name = row.name
                item.price = row.price
                item.quantity = row.quantity
                props.updateItem(item)
                setEditingKey('')
            }
        } catch (errInfo) {
            alert('Validate Failed');
        }
    };

    const deleteRow = (key) => {
        const itemToDelete = props.menuData.filter(item => item.key === key)[0]
        props.deleteItem(itemToDelete.id, itemToDelete.menu)

    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            editable: true,
        },
        {
            title: 'Category',
            dataIndex: 'category',
            editable: false,
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            editable: true,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            editable: true,
        },
        {
            title: 'Currency',
            dataIndex: 'currency',
            editable: true,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            editable: true,
        },
        {
            title: 'Image',
            dataIndex: 'image',
            editable: false,
            render: (_, record) => {
                const imageSrc = record.image
                if (imageSrc === null || imageSrc === '')
                    return <>NO PHOTO</>;
                else
                    return <ImageFile filePath={imageSrc}/>
            }
        },
        {
            title: 'Operation',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Button type="link" onClick={() => save(record.key)} style={{marginRight: 8,}}>
                          Save
                        </Button>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                          <Button type="link" danger>Cancel</Button>
                        </Popconfirm>
                    </span>
                ) : (
                    <span>
                        <Button type="link" disabled={editingKey !== ''} onClick={() => edit(record)}>
                          Edit
                        </Button>
                        <Popconfirm title="Sure to delete?" onConfirm={() => deleteRow(record.key)}>
                          <Button type="link" danger style={{marginLeft: 8}}>Delete</Button>
                        </Popconfirm>
                    </span>
                );
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <Form form={form} component={false}>
            <Table
                components={{body: {cell: EditableCell,},}}
                bordered
                dataSource={props.menuData}
                columns={mergedColumns}
                pagination={{pageSize: 3}}
            />
        </Form>
    );
};

export default MenuTable;
