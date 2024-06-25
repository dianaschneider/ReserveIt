import React from "react";
import {Row} from "antd";
import StaffTable from "./StaffTable";
import AddStaffForm from "./AddStaffForm";

const StaffConfiguration = (props) => {
    const deleteWaiter = (waiterId) => {
        props.deleteWaiter(waiterId);
    }
    const updateWaiter = (waiterId, firstName, lastName) => {
        props.updateWaiter(waiterId, firstName, lastName);
    }

    return (
        <>
            <Row className="fullSizeRow">
                <StaffTable staffData={props.staffData.map((element, index) => {
                    element.key = index;
                    return element
                })}
                            accessTable={props.accessTable}
                            deleteWaiter={deleteWaiter}
                            updateWaiter={updateWaiter}
                />
            </Row>
            <Row className="fullSizeRow">
                <AddStaffForm saveStaff={props.saveStaff}/>
            </Row>
        </>);
};

export default StaffConfiguration;