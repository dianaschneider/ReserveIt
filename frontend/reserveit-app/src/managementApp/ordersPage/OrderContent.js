import React from "react";
import {Button, Checkbox, Col, Row} from "antd";
import './resources/Styling.css'

const OrderContent = (props) => {
    const deliverItem = (item, index) => {
        const order = props.order;
        item.delivered = true;
        order.items[index] = item;
        props.updateOrderStatus(order);
    }

    return <div>
        <Button type="primary" onClick={props.backToList}>Back to List</Button>
        <div>
            {props.order.items.map((element, index) => {
                const rowKey = "menu-item-" + props.order.key + "-" + index + "-"+ element.itemData.name;
                return <Row key={rowKey}>
                    <Col span={12}>
                        <Row className="menuItemName">{element.itemData.name}</Row>
                        <Row className="menuItemData">{element.itemData.description}</Row>
                        <Row>
                            <Col span={12}>
                                <Row className="menuItemData">
                                    <Col span={12}>Quantity</Col>
                                    <Col span={12}>{element.itemData.quantity}</Col>
                                </Row>
                                <Row className="menuItemData">
                                    <Col span={12}>Price</Col>
                                    <Col
                                        span={12}>{element.itemData.price.value} {element.itemData.price.currency}</Col>
                                </Row>
                            </Col>
                            {/*TODO: RENDER IMAGE WHEN THE FETCHING FROM BACKEND WILL BE AVAILABLE*/}
                            <Col span={12}>{element.itemData.image}</Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Row className="menuItemName">DELIVERY STATUS</Row>
                        <Row className="menuItemData">
                            <Col span={12}>Requested quantity: </Col>
                            <Col span={12}>{element.quantity}</Col>
                        </Row>
                        <Row className="menuItemData">
                            <Col span={12}>Delivered: </Col>
                            <Col span={12}>
                                <Checkbox disabled={element.delivered} defaultChecked={element.delivered} onChange={() => deliverItem(element, index)}/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            })}
        </div>
    </div>;

}

export default OrderContent;
