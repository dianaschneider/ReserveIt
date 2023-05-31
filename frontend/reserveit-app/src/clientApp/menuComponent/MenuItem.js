import React, {useState} from "react";
import {Button, Checkbox, Col, Row} from "antd";
import './resources/Styling.css'
import {MinusOutlined, PlusOutlined} from '@ant-design/icons';

const MenuItem = (props) => {
    const itemData = props.item.itemData
    const [numAdded, setNumAdded] = useState(props.item.quantity);

    const onPlusClick = () => {
        props.addItemToCart({
            itemData: itemData,
            quantity: numAdded+1,
            editable: Boolean(props.item.editable)
        })
        setNumAdded(numAdded + 1);
    };
    const onMinusClick = () => {
        if (numAdded - 1 < 0) {
            return;
        }
        props.addItemToCart({
            itemData: itemData,
            quantity: numAdded - 1,
            editable: props.item.editable
        })
        setNumAdded(numAdded - 1);
    };

    return <Row className="menuItemRow">
        <Row className="menuItemName">{itemData.item}</Row>
        <Row className="menuItemData">{itemData.description}</Row>
        <Row>
            <Col span={12}>
                <Row className="menuItemData">
                    <Col span={12}>Quantity</Col>
                    <Col span={12}>{itemData.quantity}</Col>
                </Row>
                <Row className="menuItemData">
                    <Col span={12}>Price</Col>
                    <Col span={12}>{itemData.price} RON</Col>
                </Row>
            </Col>
            {/*TODO: ADD IMAGE WHEN THE FETCHING FROM BACKEND WILL BE AVAILABLE*/}
            <Col span={12}>PICTURE</Col>
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
                        <Col style={{ marginTop: '5px' }}>{numAdded}</Col>
                        <Col>
                            <Button onClick={onPlusClick}>
                                <PlusOutlined/>
                            </Button>
                        </Col>
                    </Row>
                </Row>
                :
                <Row className="buttonRowStyling">
                    <Col style={{ marginRight: '20px' }}>
                        {/*TODO: ADD ORDER STATUS FROM ORDER DATA*/}
                        <Checkbox defaultChecked disabled />
                    </Col>
                </Row>
        }

    </Row>
}

export default MenuItem;