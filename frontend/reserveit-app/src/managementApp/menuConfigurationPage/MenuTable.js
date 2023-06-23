import React from "react";
import {Table} from 'antd';

const columns = [
    {
        title: 'Item',
        dataIndex: 'name',
        key: 'item'
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        render: (price) => {
            return <div>{price.value} {price.currency}</div>
        }
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Image',
        key: 'image',
        dataIndex: 'image',
        render: (image) => (
            <div>IMAGE</div>
            //TODO: when image upload works, render it
            // <img src={image} alt="menu"/>
        ),
    }
];

const MenuTable = (props) => {
    const menuData = props.menuData;

    //TODO: make menu table editable so that the admin can edit the data or delete an entry
    return <Table
        columns={columns}
        dataSource={menuData}
    />
}

export default MenuTable;