import React from "react";
import {Button, Col, Row} from "antd";
import MenuItem from "../menuComponent/MenuItem";
import './Styling.css'

const CartComponent = (props) => {
    const totalCartOrder = props.currentOrder.reduce((accumulator, currentValue) => {
        return accumulator + (parseFloat(currentValue.itemData.price.value) * currentValue.quantity)
    }, 0);

    const orderTotalRowComponent = () => {
        //TODO: ADD CURRENCY
        return <Row className="orderTotalRow">
            <Col className="orderTotalTextStyle">TOTAL AMOUNT</Col>
            <Col className="orderTotalTextStyle">{totalCartOrder} RON</Col>
        </Row>
    }

    return <div>
        {props.currentOrder.map((element, index) => {
            const rowKey = "menu-item-"+ index + "-" +element.itemData.name;
            return <Row key={rowKey}>
                <MenuItem
                    item={element}
                    addItemToCart={props.addItemToCart}/>
            </Row>
        } )}
        {
            props.currentOrder.length === 0 ?
                orderTotalRowComponent()
                :
                props.currentOrder.filter(el => el.editable).length === 0 ?
                    orderTotalRowComponent()
                    :
                    <div>
                        {orderTotalRowComponent()}
                        <Row className="orderTotalRow">
                            <Button onClick={props.placeOrder}>PLACE ORDER</Button>
                        </Row>
                    </div>

        }
    </div>
}

export default CartComponent;
