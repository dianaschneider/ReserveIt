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

const MenuComponent = (props) => {
    const [menuCategories, setMenuCategories] = useState([]);

    useEffect(() => {
        const categoriesSet = createCategoriesSet(props.foodData);
        const categories = [];
        categoriesSet.forEach(category => {
            categories.push({
                key: category,
                label: category,
                children: <MenuCategory categoryItems={props.foodData.filter((element) => element.category === category)}/>
            })
        })
        setMenuCategories(categories);
    }, [props.foodData])

    const onTabChange = () => {
    }
    return <div style={{ width: 'inherit' }}>
        <Tabs
            items={menuCategories}
            onChange={onTabChange}
        />
    </div>
}

export default MenuComponent;