import React, {useEffect, useState} from "react";
import {Tabs} from 'antd';
import MenuCategory from "./MenuCategory";

const createCategoriesSet = (foodData) => {
    const categories = new Set();

    foodData.forEach(el => {
        categories.add(el.category)
    });

    return categories;
}
const createCategoriesItemsMap = (categoriesSet, foodData, currentOrder) => {
    const categoriesItemsMap = new Map();

    categoriesSet.forEach(category => {
        const itemsFromCategory = foodData.filter((element) => element.category === category)
            .map(data => {
                const orderedItem = currentOrder.filter((element) => element.item === data.id && element.editable)
                const item = orderedItem.length > 0 ? orderedItem[0] : {
                    id: 0,
                    item: data.id,
                    numberRequested: 0,
                    editable: true,
                    delivered: false
                }
                return {
                    itemData: data,
                    item: item
                }
            });
        categoriesItemsMap.set(category, itemsFromCategory);
    });

    return categoriesItemsMap;
}

const MenuComponent = (props) => {
    const [menuCategories, setMenuCategories] = useState([]);

    useEffect(() => {
        const categoriesSet = createCategoriesSet(props.foodData);
        const categoriesItemsMap = createCategoriesItemsMap(categoriesSet, props.foodData, props.currentOrder);
        const categories = [];
        categoriesSet.forEach(category => {
            categories.push({
                key: category,
                label: category,
                children:
                    <MenuCategory
                        category={category}
                        categoryItems={categoriesItemsMap.get(category)}
                        addItemToCart={props.addItemToCart}
                    />
            })
        })
        setMenuCategories(categories);
    }, [props.foodData, props.addItemToCart, props.currentOrder])

    const onTabChange = () => {
    }
    return <div style={{width: 'inherit'}}>
        <Tabs
            items={menuCategories}
            onChange={onTabChange}
        />
    </div>
}

export default MenuComponent;