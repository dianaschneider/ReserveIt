import React, {useState} from "react";
import {Button, Checkbox, Col, Row} from "antd";
import './resources/Styling.css'
import {MinusOutlined, PlusOutlined} from '@ant-design/icons';
import ImageFile from "../../ImageFile";

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
        return (
            <div className="menuItemCard">
                <Row>
                    {itemData.image && (
                        <Col span={24} className="menuItemImage">
                            <ImageFile filePath={itemData.image} />
                        </Col>
                    )}
                </Row>
                <Row className="menuItemContent">
                    <Col span={24} className="menuItemName">
                        {itemData.name}
                    </Col>
                    <Col span={24} className="menuItemDescription">
                        {itemData.description}
                    </Col>
                    <Col span={24} className="menuItemDetails">
                        <Row>
                            <Col span={12} className="detailLabel">Quantity</Col>
                            <Col span={12} className="detailValue">{itemData.quantity}</Col>
                        </Row>
                        <Row>
                            <Col span={12} className="detailLabel">Price</Col>
                            <Col span={12} className="detailValue">{itemData.price} {itemData.currency}</Col>
                        </Row>
                    </Col>
                </Row>
                {props.item.editable ? (
                    <Row className="buttonRowStyling">
                        <Col className="buttonGroup">
                            <Button onClick={onMinusClick} shape="circle" icon={<MinusOutlined />} />
                            <span className="itemCount">{numAdded}</span>
                            <Button onClick={onPlusClick} shape="circle" icon={<PlusOutlined />} />
                        </Col>
                    </Row>
                ) : (
                    <Row className="buttonRowStyling">
                        <Col>
                            <Checkbox defaultChecked={props.item.delivered} disabled />
                            <p>Delivered {props.item.numberRequested} items</p>
                        </Col>
                    </Row>
                )}
            </div>
        );
}

export default MenuItem;