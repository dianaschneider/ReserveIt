import React, {useEffect, useState} from "react";
import {AppstoreOutlined} from '@ant-design/icons';
import {Row, Tabs} from 'antd';
import Logo from "../../resources/images/reserveit-logo.svg";
import TableConfiguration from "../tableConfigurationPage/TableConfiguration";
import MenuConfiguration from "../menuConfigurationPage/MenuConfiguration";
import TablePlan from "../tablePlanPage/TablePlan";
import Orders from "../ordersPage/Orders";
import TablePage from "../tablePage/TablePage";
import {deleteFoodFromMenu} from "../fetchingData/MenuFetchingDataMethods";
import axios from "axios";
import {DATABASE} from "../fetchingData/Constants";
import {useParams} from "react-router";


const RestaurantManagementMainPage = (props) => {
    const {restaurantId} = useParams();
    const [tablesData, setTablesData] = useState([]);
    const [foodData, setFoodData] = useState([]);
    const [ordersData, setOrdersData] = useState([]);
    const [activeKey, setActiveKey] = useState('table-plan');
    const [tableInfoData, setTableInfoData] = useState({});

    //TODO: add authentication header below to all requests in this page
    // eslint-disable-next-line
    const config = {
        headers: {Authorization: `Bearer ${props.userToken}`}
    };

    useEffect(() => {
        //get menu data from db
        getMenuData().then(() => {
        });

        //get tables data from db
        getTableConfiguration().then(() => {
        });

        //get orders data from db
        getOrdersData().then(() => {
        });
        // eslint-disable-next-line
    }, []);

    //get menu info
    const getMenuData = async () => {
        axios.get(`${DATABASE}/restaurants/${restaurantId}/menu`)
            .then(res => {
                if (res.status === 200) {
                    setFoodData(Object.entries(res.data.items).map(([key, value]) => ({key, ...value})));
                }
            })
            .catch(() => console.log("GET ERROR"));
    }
    const addFoodToMenu = async (item) => {
        axios.post(`${DATABASE}/restaurants/${restaurantId}/menu`, item)
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
        //todo:
        items.filter(() => deleteFoodFromMenu(itemId));
        setFoodData(items);
    }

    //get tables info
    const getTableConfiguration = async () => {
        axios
            .get(`${DATABASE}/restaurants/${restaurantId}`)
            .then(res => {
                if (res.status === 200) {
                    setTablesData(Object.entries(res.data.tables).map(([key, value]) => ({key, ...value})));
                }
            })
            .catch(() => console.log("GET ERROR"));
    }
    const addTableConfiguration = async (table) => {
        axios.post(`${DATABASE}/restaurants/${restaurantId}/tables`, table)
            .then(res => {
                if (res.status === 200) {
                    console.log("POST SUCCEEDED")
                    getTableConfiguration();
                }
            })
            .catch(() => console.log("GET ERROR"));
    };
    const deleteTablesConfiguration = () => {
        axios.delete(`${DATABASE}/restaurants/${restaurantId}/tables`)
            .then(res => {
                if (res.status === 200) {
                    console.log("DELETE SUCCEEDED")
                    getTableConfiguration().then();
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

    //get orders info
    const getOrdersData = async () => {
        axios.get(`${DATABASE}/restaurants/${restaurantId}/orders`)
            .then(res => {
                if (res.status === 200) {
                    setOrdersData(Object.entries(res.data).map(([key, value]) => ({key, ...value})));
                }
            })
            .catch(() => console.log("GET ERROR"));
    }
    const updateOrderStatus = async (order) => {
        axios.put(`${DATABASE}/restaurants/${restaurantId}/orders`, order)
            .then(res => {
                if (res.status === 200) {
                    console.log("PUT SUCCEEDED")
                    getOrdersData()
                }
            })
            .catch(() => console.log("PUT ERROR"));
    }

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
            children: <Orders
                ordersData={ordersData}
                updateOrderStatus={updateOrderStatus}
            />
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
