import React, {useState} from "react";
import {Button, Col, Row} from "antd";
import './resources/Styling.css'
import {MinusOutlined, PlusOutlined} from '@ant-design/icons';

const MenuItem = (props) => {
    const [numAdded, setNumAdded] = useState(0);

    const onPlusClick = () => {
        setNumAdded(numAdded + 1);
    };
    const onMinusClick = () => {
        if (numAdded - 1 < 0) {
            return;
        }
        setNumAdded(numAdded - 1);
    };
    const onAddToCart = () => {
        //TODO: implement logic to add to cart
        setNumAdded(0);
    }

    return <Row className="menuItemRow">
        <Row className="menuItemName">{props.item.item}</Row>
        <Row className="menuItemData">{props.item.description}</Row>
        <Row>
            <Col span={12}>
                <Row className="menuItemData">
                    <Col span={12}>Quantity</Col>
                    <Col span={12}>{props.item.quantity}</Col>
                </Row>
                <Row className="menuItemData">
                    <Col span={12}>Price</Col>
                    <Col span={12}>{props.item.price} RON</Col>
                </Row>
            </Col>
            <Col span={12}>PICTURE</Col>
        </Row>
        <Row style={{display: 'flex', justifyContent: 'right'}}>
            <Row>
                <Col>
                    <Button onClick={onMinusClick}>
                        <MinusOutlined/>
                    </Button>
                </Col>
                <Col style={{ marginTop: '5px' }}>{numAdded}</Col>
                <Col>
                    <Button onClick={onPlusClick}>
                        <PlusOutlined/>
                    </Button>
                </Col>
            </Row>
            <Row>
                <Button onClick={onAddToCart}>ADD TO CART</Button>
            </Row>
        </Row>
    </Row>
}

export default MenuItem;