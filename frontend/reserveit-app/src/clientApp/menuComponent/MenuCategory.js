import React from "react";
import {Row} from "antd";
import MenuItem from "./MenuItem";

const MenuCategory = (props) => {
    return <div>
        {props.categoryItems.map(element => {
            return <Row>
                <MenuItem
                    item={element}
                    addItemToCart={props.addItemToCart}
                />
            </Row>
        })}
    </div>
}

export default MenuCategory;