import React, {useEffect, useState} from "react";
import {Button, Checkbox, Col, Row} from "antd";
import './resources/Styling.css'
import axios from "axios";
import {DATABASE} from "../fetchingData/Constants";

const OrderContent = (props) => {
    const [displayedDataItems, setDisplayedDataItems] = useState([]);
    const [allDelivered, setAllDelivered] = useState(false);

    useEffect(() => {
        getOrdersData().then(() => {
        });

        // eslint-disable-next-line
    }, [props.updateOrderStatus]);

    const getOrdersData = async () => {
        axios.get(`${DATABASE}/orders/requested-items/${props.orderId}`)
            .then(res => {
                if (res.status === 200) {
                    setDisplayedDataItems(res.data.map(element => {
                        const itemData = props.items.filter(item => item.id === element.item)[0];
                        element.itemData = itemData
                        return element;
                    }))
                    setAllDelivered(res.data.filter(item => !item.delivered).length === 0)
                }
            })
            .catch(() => alert("Order data could not be loaded!"));
    };

    const deliverItem = (item, index) => {
        // const order = props.order;
        // item.delivered = true;
        // order.items[index] = item;
        props.updateOrderStatus(item.id);
    }

    const billPaid = () => {
        props.payBill(props.orderId)
    }

    return <div>
        {
            props.isOrdersPage ?
                <Button type="primary" onClick={props.backToList}>Back to List</Button>
                :
                <></>
        }
        <div>
            {displayedDataItems.map((element, index) => {
                const rowKey = "menu-item-" + props.order + "-" + index + "-" + element.id;
                return <Row key={rowKey}>
                    <Col span={12}>
                        <Row className="menuItemName">{element.itemData.name}</Row>
                        <Row className="menuItemData">{element.itemData.description}</Row>
                        <Row>
                            <Col span={12}>
                                <Row className="menuItemData">
                                    <Col span={12}>Quantity</Col>
                                    <Col span={12}>{element.numberRequested}</Col>
                                </Row>
                                <Row className="menuItemData">
                                    <Col span={12}>Price</Col>
                                    <Col
                                        span={12}>{element.itemData.price} {element.itemData.currency}</Col>
                                </Row>
                            </Col>
                            {/*TODO: RENDER IMAGE WHEN THE FETCHING FROM BACKEND WILL BE AVAILABLE*/}
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Row className="menuItemName">DELIVERY STATUS</Row>
                        <Row className="menuItemData">
                            <Col span={12}>Requested quantity: </Col>
                            <Col span={12}>{element.numberRequested}</Col>
                        </Row>
                        <Row className="menuItemData">
                            <Col span={12}>Delivered: </Col>
                            <Col span={12}>
                                <Checkbox disabled={element.delivered} defaultChecked={element.delivered}
                                          onChange={() => deliverItem(element)}/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            })}
            {/*    TODO: ADD BILL PAID BUTTON*/}
            {
                allDelivered ?
                    <Button type="primary" onClick={billPaid}>PAY BILL</Button>
                    :
                    ""
            }
        </div>
    </div>;

}

export default OrderContent;
