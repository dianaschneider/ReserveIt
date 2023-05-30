import React, {useEffect, useState} from "react";
import {AppstoreOutlined} from '@ant-design/icons';
import {Row, Tabs} from 'antd';
import Logo from "../../resources/images/reserveit-logo.svg";
import TableConfiguration from "../tableConfigurationPage/TableConfiguration";
import MenuConfiguration from "../menuConfigurationPage/MenuConfiguration";
import TablePlan from "../tablePlanPage/TablePlan";
import Orders from "../ordersPage/Orders";
import TablePage from "../tablePage/TablePage";
import {GENERIC_RESTAURANT_ID} from "../../resources/Constants";
import {deleteTableConfiguration} from "../components/fetchingData/TablesFetchingDataMethods";
import {deleteFoodFromMenu} from "../components/fetchingData/MenuFetchingDataMethods";
import axios from "axios";
import {AUTH_TOKEN, DATABASE_PATH} from "../components/fetchingData/Constants";

const RestaurantManagementMainPage = (props) => {
    const [tablesData, setTablesData] = useState([]);
    const [foodData, setFoodData] = useState([]);
    const [activeKey, setActiveKey] = useState('table-plan');
    const [tableInfoData, setTableInfoData] = useState({});

    useEffect(() => {
        //get menu data from db
        getMenuData().then(() => {
        });

        //get tables data from db
        getTableConfiguration().then(() => {
        });
    }, []);

    //get menu info
    const getMenuData = async () => {
        axios.get(`${DATABASE_PATH}/menu.json?auth=${AUTH_TOKEN}`)
            .then(res => {
                if (res.status === 200) {
                    setFoodData(Object.entries(res.data).map(([key, value]) => ({key, ...value})));
                }
            })
            .catch(() => console.log("GET ERROR"));
    }
    const addFoodToMenu = async (item) => {
        axios.post(`${DATABASE_PATH}/menu.json?auth=${AUTH_TOKEN}`, item)
            .then(res => {
                if (res.status === 200) {
                    console.log("POST SUCCEEDED")
                    getMenuData();
                }
            })
            .catch(() => console.log("GET ERROR"));
    }

    //update menu info in db
    const saveFoodItemInRestaurantMenu = (item) => {
        addFoodToMenu(item).then(() => {
        });
    }
    const deleteFoodItemFromRestaurantMenu = (items, itemId) => {
        items.filter(() => deleteFoodFromMenu(itemId));
        setFoodData(items);
    }

    //get tables info
    const getTableConfiguration = async () => {
        //TODO: add restaurant id
        axios.get(`${DATABASE_PATH}/restaurant.json?auth=${AUTH_TOKEN}`)
            .then(res => {
                if (res.status === 200) {
                    setTablesData(Object.entries(res.data).map(([key, value]) => ({key, ...value})));
                }
            })
            .catch(() => console.log("GET ERROR"));
    }
    const addTableConfiguration = async (table) => {
        axios.post(`${DATABASE_PATH}/restaurant.json?auth=${AUTH_TOKEN}`, table)
            .then(res => {
                if (res.status === 200) {
                    console.log("POST SUCCEEDED")
                    getTableConfiguration();
                }
            })
            .catch(() => console.log("GET ERROR"));
    };

    //update tables info in db
    const saveTablesConfiguration = (newTableConfiguration) => {
        newTableConfiguration.forEach(table => {
            addTableConfiguration(table).then(() => {
            })
        })
    };
    const deleteTablesConfiguration = () => {
        deleteTableConfiguration(GENERIC_RESTAURANT_ID).then(() => {
        });
        setTablesData([]);
    };

    //method to move to table page
    const moveToPageTab = (index) => {
        setActiveKey('table-info');
        setTableInfoData(tablesData[index - 1]);
    };

    const items = [
        {
            label: <span><AppstoreOutlined/>Configure Tables</span>,
            key: 'configure-tables',
            children: <TableConfiguration
                tablesData={tablesData}
                saveTablesConfiguration={saveTablesConfiguration}
                deleteTablesConfiguration={deleteTablesConfiguration}/>
        },
        {
            label: <span><AppstoreOutlined/>Configure Menu</span>,
            key: 'configure-menu',
            children: <MenuConfiguration
                foodData={foodData}
                saveItem={saveFoodItemInRestaurantMenu}
                deleteItem={deleteFoodItemFromRestaurantMenu}/>
        },
        {
            label: <span><AppstoreOutlined/>Table Plan</span>,
            key: 'table-plan',
            children: <TablePlan
                tablesData={tablesData}
                accessTable={moveToPageTab}/>
        },
        {
            label: <span><AppstoreOutlined/>Active Orders</span>,
            key: 'active-orders',
            children: <Orders/>
        },
        {
            label: <span><AppstoreOutlined/>Table Info</span>,
            key: 'table-info',
            children: <TablePage table={tableInfoData}/>,
            disabled: true
        }
    ];
    const changeTab = (key) => {
        setActiveKey(key);
    };

    return (
        <>
            <Row>
                <img src={Logo} alt="reserveit-logo" className="menu-logo"/>
            </Row>
            <Tabs
                activeKey={activeKey}
                onChange={changeTab}
                tabPosition="left"
                items={items}
            />
        </>
    );
};

export default RestaurantManagementMainPage;
