import "./resources/Styling.css";
import MenuTable from "./MenuTable";
import AddFoodForm from "./AddFoodForm";
import {Row} from "antd";

const MenuConfiguration = (props) => {
    const addNewItem = (item) => {
        props.saveItem(item)
    }
    //TODO: delete all menu configuration
    // const deleteItem = (item) => {
    //     props.deleteItem(item)
    // }

    return (
        <>
            <Row className="fullSizeRow">
                <MenuTable menuData={props.foodData}/>
            </Row>
            <Row>
                <AddFoodForm saveItem={addNewItem}/>
            </Row>
        </>
    );

};

export default MenuConfiguration;
