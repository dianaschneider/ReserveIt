import React, {useCallback, useEffect, useState} from "react";
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
import StaffConfiguration from "../staffConfigurationPage/StaffConfiguration";

const RestaurantManagementMainPage = (props) => {
    const {restaurantId} = useParams();
    const admin = props.admin;
    const [tablesData, setTablesData] = useState([]);
    const [foodData, setFoodData] = useState([]);
    const [menuId, setMenuId] = useState(0);
    const [ordersData, setOrdersData] = useState([]);
    const [activeKey, setActiveKey] = useState('table-plan');
    const [tableInfoData, setTableInfoData] = useState({placedOrder: {id: 0}, notificationAlerts: []});
    const [staffData, setStaffData] = useState([]);
    const [items, setItems] = useState([])

    const refreshData = useCallback(() => {
        const storedUserId = localStorage.getItem('userId');
        const storedAdmin = JSON.parse(localStorage.getItem('admin'));

        if (storedUserId && storedAdmin !== null) {
            props.refreshApp(storedUserId, storedAdmin);
        } else {
            props.refreshApp(props.userId, props.admin);
        }
        //get menu data from db
        getMenuData().then(() => {
        });

        //get tables data from db
        getTableConfiguration().then(() => {
        });

        //get orders data from db
        getOrdersData().then(() => {
        });

        //get staff data from db
        getStaffData().then(() => {
        });

        //get Items data from db
        getItemsData().then(() => {
        })
    },
        // eslint-disable-next-line
        []);

    useEffect(() => {
        refreshData();
    }, [refreshData]);

    //get menu info
    const getMenuData = async () => {
        axios.get(`${DATABASE}/restaurants/${restaurantId}/menu`)
            .then(res => {
                if (res.status === 200) {
                    setFoodData(Object.entries(res.data.items).map(([key, value]) => ({key, ...value})));
                    setMenuId(res.data.id);
                }
            })
            .catch(() => alert('Menu data could not be fetched, please try again later!'));
    }
    const addFoodToMenu = async (item) => {
        axios.post(`${DATABASE}/items?menuId=` + menuId, item)
            .then(res => {
                if (res.status === 200) {
                    refreshData();
                }
            })
            .catch(() => alert('Item could not be added to menu!'));
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
            .catch(() => alert("Table configuration could not be fecthed, please try again later!"));
    }
    const addTableConfiguration = async (table) => {
        axios.post(`${DATABASE}/tables?restaurantId=${restaurantId}&waiterId=0`, table)
            .then(res => {
                if (res.status === 200) {
                    refreshData()
                }
            })
            .catch(() => alert("Table could not be saved!"));
    };
    const deleteTablesConfiguration = () => {
        axios.delete(`${DATABASE}/tables?restaurantId=${restaurantId}`)
            .then(res => {
                if (res.status === 200) {
                    refreshData()
                }
            })
            .catch(() => alert('Could not delete configuration, please try again later!'));
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
        axios.get(`${DATABASE}/restaurants/orders?restaurantId=${restaurantId}`)
            .then(res => {
                if (res.status === 200) {
                    setOrdersData(res.data)
                }
            })
            .catch(() => alert("Orders data could not be fetched, please try again later!"));
    }
    const updateOrderStatus = async (itemId) => {
        axios.put(`${DATABASE}/requested-items/deliver/${itemId}/`)
            .then(res => {
                if (res.status === 200) {
                    refreshData()
                }
            })
            .catch(() => alert("Order could not be updated!"));
    }

    //get staff info
    const getStaffData = async () => {
        axios.get(`${DATABASE}/restaurants/${restaurantId}/staff`)
            .then(res => {
                if (res.status === 200) {
                    setStaffData(res.data)
                }
            })
            .catch(() => alert("Staff data could not be fetched, please try again later!"));
    }
    const addStaffForRestaurant = async (waiter) => {
        axios.post(`${DATABASE}/waiters?restaurantId=${restaurantId}`, waiter)
            .then(res => {
                if (res.status === 200) {
                    refreshData();
                }
            })
            .catch(() => alert('Waiter could not be added for the restaurant!'));
    }
    const assignWaiter = async (tableId, waiterId) => {
        axios.put(`${DATABASE}/tables/assign-waiter?waiterId=${waiterId}&tableId=${tableId}`)
            .then(res => {
                if (res.status === 200) {
                    refreshData();
                }
            })
            .catch(() => alert('Waiter could not be assigned!'));
    }

    const deleteNotification = async (notificationId) => {
        axios.delete(`${DATABASE}/notifications?notificationId=${notificationId}`)
            .then(res => {
                if (res.status === 200) {
                    refreshData();
                }
            })
            .catch(() => alert('Could not delete configuration, please try again later!'));
    };

    //method to move to table page
    const moveToPageTab = (tableId) => {
        const table = tablesData.filter(table => table.id === tableId)[0];
        setTableInfoData(table);
        setActiveKey('table-info');
    };

    //get staff info
    const getItemsData = async () => {
        axios.get(`${DATABASE}/items`)
            .then(res => {
                if (res.status === 200) {
                    setItems(res.data)
                }
            })
            .catch(() => alert("Items data could not be fetched, please try again later!"));
    }

    // pay bill for an order
    const payBill = async (orderId) => {
        //when paying the bill the order will be deleted
        axios.delete(`${DATABASE}/orders?orderId=${orderId}`)
            .then(res => {
                if (res.status === 200) {
                    refreshData();
                }
            })
            .catch(() => alert('Could not pay order, please try again later!'));
    }

    const itemsTable = [
        {
            label: <span><AppstoreOutlined/>Configure Tables</span>,
            key: 'configure-tables',
            disabled: !admin,
            children: <TableConfiguration
                tablesData={tablesData}
                saveTablesConfiguration={saveTablesConfiguration}
                deleteTablesConfiguration={deleteTablesConfiguration}/>
        },
        {
            label: <span><AppstoreOutlined/>Configure Menu</span>,
            key: 'configure-menu',
            disabled: !admin,
            children: <MenuConfiguration
                foodData={foodData}
                saveItem={saveFoodItemInRestaurantMenu}
                deleteItem={deleteFoodItemFromRestaurantMenu}/>
        },
        {
            label: <span><AppstoreOutlined/>Configure Staff</span>,
            key: 'configure-staff',
            disabled: !admin,
            children: <StaffConfiguration
                staffData={staffData}
                saveStaff={addStaffForRestaurant}
                accessTable={moveToPageTab}
            />
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
                tablesData={tablesData}
                updateOrderStatus={updateOrderStatus}
                items={items}
                payBill={payBill}
            />
        },
        {
            label: <span><AppstoreOutlined/>Table Info</span>,
            key: 'table-info',
            children: <TablePage
                table={tableInfoData}
                updateOrderStatus={updateOrderStatus}
                assignWaiter={assignWaiter}
                staffData={staffData}
                admin={admin}
                deleteNotification={deleteNotification}
                items={items}
                payBill={payBill}
            />,
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
                items={itemsTable}
            />
        </>
    );
};

export default RestaurantManagementMainPage;
