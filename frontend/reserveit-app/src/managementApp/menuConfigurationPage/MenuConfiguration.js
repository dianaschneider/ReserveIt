import "./resources/Styling.css";
import MenuTable from "./MenuTable";
import AddFoodForm from "./AddFoodForm";
import {Row} from "antd";

const MenuConfiguration = (props) => {
    const addNewItem = (item) => {
        props.saveItem(item)
    }
    const deleteItem = (itemId, menuId) => {
        props.deleteItem(itemId, menuId)
    }
    const updateItem = (item) => {
        const newItem = {
            id: item.id,
            name: item.name,
            category: item.category,
            quantity: item.quantity,
            price: item.price,
            currency: item.currency,
            description: item.description,
            image: item.image,
            menu: item.menu
        }
        props.updateItem(newItem)
    }

    return (
        <>
            <Row className="fullSizeRow">
                <MenuTable
                    menuData={props.foodData}
                    deleteItem={deleteItem}
                    updateItem={updateItem}
                />
            </Row>
            <Row>
                <AddFoodForm saveItem={addNewItem}/>
            </Row>
        </>
    );

};

export default MenuConfiguration;
