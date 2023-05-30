import React, {useEffect, useState} from "react";
import './Styling.css'
import ClientHeader from "../header/ClientHeader";
import MenuComponent from "../menuComponent/MenuComponent";
import axios from "axios";
import {AUTH_TOKEN, DATABASE_PATH} from "../../managementApp/components/fetchingData/Constants";
import {Row} from "antd";

const RestaurantClientMainPage = () => {
    //TODO: uncomment when creating order const {tableId} = useParams();
    const [foodData, setFoodData] = useState([]);

    useEffect(() => {
        getMenuData().then(() => {
        });
    }, []);

    const getMenuData = async () => {
        axios.get(`${DATABASE_PATH}/menu.json?auth=${AUTH_TOKEN}`)
            .then(res => {
                if (res.status === 200) {
                    setFoodData(Object.entries(res.data).map(([key, value]) => ({key, ...value})));
                }
            })
            .catch(() => console.log("GET ERROR"));
    }

    return (
        <div className="blockPage">
            <Row className="componentsPage">
                <ClientHeader/>
            </Row>
            <Row className="componentsPage">
                <MenuComponent foodData={foodData}/>
            </Row>
        </div>
    );
};

export default RestaurantClientMainPage;
