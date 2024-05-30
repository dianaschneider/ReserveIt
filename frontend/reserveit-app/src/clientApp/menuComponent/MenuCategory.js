import React from "react";
import {Row} from "antd";
import MenuItem from "./MenuItem";

const MenuCategory = (props) => {
    return <div>
        {
            props.categoryItems.map(element => {
                return <Row key={"category-" + props.category + element.itemData.id}>
                    <MenuItem
                        item={element.item}
                        itemData={element.itemData}
                        addItemToCart={props.addItemToCart}
                        cartComponent={false}
                    />
                </Row>
            })
        }
    </div>
}

export default MenuCategory;