import React from "react";
import {Table} from 'antd';

const StaffTable = (props) => {
    const staffData = props.staffData;

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        //TODO: ADD
        // {
        //     title: 'Assigned Tables',
        //     dataIndex: 'tableData',
        //     key: 'tableData',
        //     render: (_, tableData) => (
        //         <Row>
        //             {console.log(tableData)}
        //             {/*{tableData.map(table => {*/}
        //             {/*    return <Col><Button onClick={() => props.accessTable(table.id)}>Table {table.id}</Button></Col>*/}
        //             {/*})}*/}
        //         </Row>
        //     ),
        //
        // },
    ];

    //TODO: make staff table editable so that the admin can edit the data or delete an entry
    return <Table
        columns={columns}
        dataSource={staffData}
    />
}

export default StaffTable;