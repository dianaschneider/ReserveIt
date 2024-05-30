import React from "react";
import {Button, Col, Row} from "antd";
import './Styling.css'
import MenuItem from "../menuComponent/MenuItem";

const CartComponent = (props) => {
    const totalCartOrder = props.currentOrder.reduce((accumulator, currentValue) => {
        const itemData = props.foodData.filter(item => item.id === currentValue.item)[0];
        return accumulator + (parseFloat(itemData.price) * currentValue.numberRequested)
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
            const itemData = props.foodData.filter(item => item.id === element.item)[0];
            const rowKey = "menu-item-"+ index + "-" +itemData.name;
            return <Row key={rowKey}>
                <MenuItem
                    itemData={itemData}
                    item={element}
                    cartComponent={true}
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
