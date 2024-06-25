import React, {useState} from "react";
import {Button, Form, Input, Popconfirm, Table} from 'antd';

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

const StaffTable = (props) => {
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');

    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            id: '',
            email: '',
            firstName: '',
            lastName: '',
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
            const index = props.staffData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = props.staffData[index];
                props.updateWaiter(item.id, row.firstName, row.lastName);
                setEditingKey('');
            }
        } catch (errInfo) {
            alert('Validate Failed');
        }
    };

    const deleteRow = (key) => {
        const itemToDelete = props.staffData.filter(item => item.key === key)[0]
        props.deleteWaiter(itemToDelete.id)
    };

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            editable: false,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            editable: false,
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            editable: true,
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            editable: true,
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
                dataSource={props.staffData}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{onChange: cancel,}}
            />
        </Form>
    );
};

export default StaffTable;
