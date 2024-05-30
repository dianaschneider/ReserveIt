import React, {useState} from "react";
import {Select} from "antd";

const AssignUser = (props) => {
    const [selectedId, setSelectedId] = useState(props.table.waiter);
    const waiterOptions = props.staffData.map(waiter => {
        return {
            label: waiter.firstName + " " + waiter.lastName,
            value: waiter.id,
        }
    });

    const handleChangeWaiter = (value) => {
        setSelectedId(value)
        props.assignWaiter(props.table.id, value);
    };


    return (<>
        <h2>Assign waiter</h2>
        <Select
            value={selectedId}
            style={{width: 300}} // TODO: add default value: the default one is kept from the first table accessed
            onChange={handleChangeWaiter}
        >
            {
                waiterOptions.map(option => {
                    return <Select.Option key={option.value} value={option.value}>{option.label}</Select.Option>
                })
            }
        </Select>
    </>);
};

export default AssignUser;
