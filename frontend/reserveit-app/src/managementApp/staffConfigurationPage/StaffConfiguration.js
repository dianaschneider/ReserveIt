import React from "react";
import {Row} from "antd";
import StaffTable from "./StaffTable";
import AddStaffForm from "./AddStaffForm";

const StaffConfiguration = (props) => {
    return (
        <>
            <Row className="fullSizeRow">
                <StaffTable staffData={props.staffData} accessTable={props.accessTable}/>
            </Row>
            <Row className="fullSizeRow">
                <AddStaffForm saveStaff={props.saveStaff}/>
            </Row>
        </>);
};

export default StaffConfiguration;