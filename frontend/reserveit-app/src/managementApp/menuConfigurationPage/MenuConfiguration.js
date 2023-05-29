import {useState} from "react";
import "./resources/Styling.css";
import {nanoid} from 'nanoid';

const options = [
    {
        label: "Side Dish",
        value: "side dish"
    },
    {
        label: "Principal",
        value: "principal"
    },
    {
        label: "Drinks",
        value: "drinks"
    },
    {
        label: "Snacks",
        value: "snacks"
    }

];


const MenuConfiguration = (props) => {

    const [foodItems, setFoodItems] = useState(props.foodData);
    const [addFormData, setAddFormData] = useState({
        item: '',
        category: '',
        quantity: '',
        price: ''
    });

    const handleAddNewItem = (event) => {
        event.preventDefault();

        const fieldItem = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = {...addFormData};
        newFormData[fieldItem] = fieldValue;
        setAddFormData(newFormData);
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const newItem = {
            id: nanoid(),
            item: addFormData.item,
            category: addFormData.category,
            quantity: addFormData.quantity,
            price: addFormData.price
        }

        const newItems = [...foodItems, newItem];
        setFoodItems(newItems);
        props.saveItem(newItem, newItems);
    }

    const handleDeleteClick = (itemId) => {
        const newItems = [...foodItems];

        const index = foodItems.findIndex((item) => item.id === itemId);

        newItems.splice(index, 1);

        setFoodItems(newItems);
        props.deleteItem(newItems, itemId);
    }


    return (
        <div>
            <div className="app-container">
                <div align="left">
                    <h2>Add new food item</h2>
                </div>

                <form onSubmit={handleFormSubmit}>
                    <input
                        type="text"
                        name="item"
                        required="required"
                        placeholder="Enter item name"
                        onChange={handleAddNewItem}/>
                    <select
                        name="category"
                        onChange={handleAddNewItem}>
                        <option value="disabled selected">Select category</option>
                        {options.map((option, index) => (
                            <option key={index} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        name="quantity"
                        required="required"
                        placeholder="Enter quantity"
                        onChange={handleAddNewItem}/>
                    <input
                        type="number"
                        name="price"
                        required="required"
                        placeholder="Enter price"
                        onChange={handleAddNewItem}/>
                    <button type="submit">Add</button>
                </form>
                <table>
                    <thead>
                    <tr>
                        <th>Item</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {foodItems.map((item, index) => (
                        <tr key={index}>
                            <td>{item.item}</td>
                            <td>{item.category}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                            <td>
                                <button type="button" onClick={() => handleDeleteClick(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

};

export default MenuConfiguration;
