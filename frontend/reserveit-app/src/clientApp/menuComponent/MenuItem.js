import React, {useState} from "react";
import {Button, Checkbox, Col, Row} from "antd";
import './resources/Styling.css'
import {MinusOutlined, PlusOutlined} from '@ant-design/icons';

const MenuItem = (props) => {
    const itemData = props.itemData
    const [numAdded, setNumAdded] = useState(props.item.numberRequested);

    const onPlusClick = () => {
        props.addItemToCart({
            id: props.item.id,
            item: props.item.item,
            numberRequested: numAdded + 1,
            editable: Boolean(props.item.editable),
            delivered: props.item.delivered
        })
        setNumAdded(numAdded + 1);
    };
    const onMinusClick = () => {
        if (numAdded - 1 < 0) {
            return;
        }
        props.addItemToCart({
            id: props.item.id,
            item: props.item.item,
            numberRequested: numAdded - 1,
            editable: props.item.editable,
            delivered: props.item.delivered
        })
        setNumAdded(numAdded - 1);
    };

    if (props.item.numberRequested === 0 && props.cartComponent)
        return <></>
    else
        return <Row className="menuItemRow">
            <Row className="menuItemName">{itemData.name}</Row>
            <Row className="menuItemData">{itemData.description}</Row>
            <Row>
                <Col span={12}>
                    <Row className="menuItemData">
                        <Col span={12}>Quantity</Col>
                        <Col span={12}>{itemData.quantity}</Col>
                    </Row>
                    <Row className="menuItemData">
                        <Col span={12}>Price</Col>
                        <Col span={12}>{itemData.price} {itemData.currency}</Col>
                    </Row>
                </Col>
                {/*TODO: RENDER IMAGE WHEN THE FETCHING FROM BACKEND WILL BE AVAILABLE*/}
                <Col span={12}>{itemData.image}</Col>
            </Row>
            {
                props.item.editable ?
                    <Row className="buttonRowStyling">
                        <Row>
                            <Col>
                                <Button onClick={onMinusClick}>
                                    <MinusOutlined/>
                                </Button>
                            </Col>
                            <Col style={{marginTop: '5px'}}>{numAdded}</Col>
                            <Col>
                                <Button onClick={onPlusClick}>
                                    <PlusOutlined/>
                                </Button>
                            </Col>
                        </Row>
                    </Row>
                    :
                    <Row className="buttonRowStyling">
                        <Col style={{marginRight: '20px'}}>
                            <Checkbox defaultChecked={props.item.delivered} disabled/>
                            <p>Delivered {props.item.numberRequested} items</p>
                        </Col>
                    </Row>
            }

        </Row>
}

export default MenuItem;