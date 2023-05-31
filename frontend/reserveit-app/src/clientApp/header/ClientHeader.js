import React from "react";
import {Col, Row} from "antd";
import './resources/Styling.css'
import logo from '../../resources/images/reserveit-logo.svg'
import cart from './resources/cart.png'
import bill from './resources/bill.png'
import notify from './resources/notify.png'

const ClientHeader = (props) => {
    const notification = (type, message) => {
        return {
            message: message,
            type: type,
            table: props.tableId
        }
    }
    const onClickNotify = () => {
        props.createNotification(notification('NOTIFY', 'Waiter is called at table ' + props.tableId));
    }
    const onClickBill = () => {
        props.createNotification(notification('BILL', 'Bill is requested at table ' + props.tableId));
    }
    const onClickCart = () => {props.renderCart()}
    const onClickLogo= () => {props.renderMenu()}

    return (
        <Row className="headerRow">
            <Col className="headerLogoColumn">
                <img alt="logo" src={logo} className="logoStyle" onClick={onClickLogo}/>
            </Col>
            <Col className="headerIconColumns">
                <img alt="notify" src={notify} className="iconStyle" onClick={onClickNotify}/>
            </Col>
            <Col className="headerIconColumns">
                <img alt="bill" src={bill} className="iconStyle" onClick={onClickBill}/>
            </Col>
            <Col className="headerIconColumns">
                <img alt="cart" src={cart} className="iconStyle" onClick={onClickCart}/>
            </Col>
        </Row>
    );
};

export default ClientHeader;
