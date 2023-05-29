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
import {
    addTableConfiguration,
    deleteTableConfiguration,
    getTableConfiguration
} from "../components/fetchingData/TablesFetchingDataMethods";
import {addFood, deleteFood, getFood} from "../components/fetchingData/MenuFetchingDataMethods";

const RestaurantManagementMainPage = (props) => {
    const [tablesData, setTablesData] = useState([]);
    const [foodData, setFoodData] = useState([]);
    const [activeKey, setActiveKey] = useState('table-plan');
    const [tableInfoData, setTableInfoData] = useState({});

    useEffect(() => {
        //get menu data from db
        getFood().then((arr) => {
            setFoodData(arr);
        });

        //get tables data from db
        getTableConfiguration(GENERIC_RESTAURANT_ID).then((arr) => {
            arr = arr.sort((a, b) => a.tableConfiguration.index - b.tableConfiguration.index);
            setTablesData(arr);
        });
    }, []);

    const saveItem = (item, items) => {
        //items.filter(function(item) {return getFoodItem(item).isEmpty()}).map((item) => addFood(item));
        //items.map((item) => addFood(item));
        addFood(item).then(() => setFoodData(items));
    }

    const deleteItem = (items, itemId) => {
        items.filter(() => deleteFood(itemId));
        setFoodData(items);
    }

    //update tables info in db
    const saveTablesConfiguration = (newTableConfiguration) => {
        newTableConfiguration.map((el) => {
            addTableConfiguration(el).then(() => {});
            return el;
        });
        setTablesData(newTableConfiguration);
        props.updateMaxTableNumber(newTableConfiguration.length);
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
                saveItem={saveItem}
                deleteItem={deleteItem}/>
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
