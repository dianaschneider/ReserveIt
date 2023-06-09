import React from 'react';
import {Alert, Row} from "antd";

const NotificationAlert = (props) => {
    return <Row className="componentsPage" key={"alert-"+props.alertType+props.index}>
        <Alert
            style={{ width: 'inherit' }}
            message={props.alertMessage}
            type={props.alertType}
            closable/>
    </Row>
}

export default NotificationAlert