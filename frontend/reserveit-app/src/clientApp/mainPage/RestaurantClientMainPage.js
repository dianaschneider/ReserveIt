import React, {useEffect, useState} from "react";
import './Styling.css'
import ClientHeader from "../header/ClientHeader";
import MenuComponent from "../menuComponent/MenuComponent";
import axios from "axios";
import {AUTH_TOKEN, DATABASE, DATABASE_PATH} from "../../managementApp/fetchingData/Constants";
import {Row} from "antd";
import CartComponent from "../cartComponent/CartComponent";
import {useParams} from "react-router";
import NotificationAlert from "./NotificationAlert";

const RestaurantClientMainPage = () => {
    const {restaurantId, tableId} = useParams();
    const [foodData, setFoodData] = useState([]);
    const [isMenu, setMenu] = useState(true);
    const [currentOrder, setCurrentOrder] = useState([]);
    const [currentAlerts, setCurrentAlerts] = useState([])

    useEffect(() => {
        getMenuData().then(() => {
        });
        getTableOrder().then(() => {
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /*FETCH DATA FOR MENU & CURRENT TABLE ORDER*/
    const getMenuData = async () => {
        axios.get(`${DATABASE}/restaurants/${restaurantId}/menu`)
            .then(res => {
                if (res.status === 200) {
                    setFoodData(Object.entries(res.data.items).map(([key, value]) => ({key, ...value})));
                }
            })
            .catch(() => console.log("GET ERROR"));
    }
    const getTableOrder = async () => {
        axios.get(`${DATABASE}/restaurants/${restaurantId}/orders/${tableId}`)
            .then(res => {
                if (res.status === 200) {
                    setCurrentOrder(res.data.items)
                }
            })
            .catch(() => console.log("GET ERROR"));
    }

    /*UPDATE DATA TO DATABASE*/
    const createOrderForTable = async (order) => {
        axios.get(`${DATABASE}/restaurants/${restaurantId}/orders/${tableId}`)
            .then(res => {
                if (res.status === 200) {
                    axios.put(`${DATABASE}/restaurants/${restaurantId}/orders`, order)
                        .then(res => {
                            if (res.status === 200) {
                                console.log("PUT SUCCEEDED")
                                getTableOrder()
                            }
                        })
                        .catch(() => console.log("PUT ERROR"));
                }
            })
            .catch(() => {
                axios.post(`${DATABASE}/restaurants/${restaurantId}/orders`, order)
                    .then(res => {
                        if (res.status === 200) {
                            console.log("POST SUCCEEDED")
                            getTableOrder()
                        }
                    })
                    .catch(() => console.log("POST ERROR"));
            })
    }
    const createNotificationForTable = async (notification) => {
        //TODO: IMPLEMENT NOTIFICATION BACKEND SYSTEM
        axios.post(`${DATABASE_PATH}/notifications.json?auth=${AUTH_TOKEN}`, notification)
            .then(res => {
                if (res.status === 200) {
                    console.log("POST SUCCEEDED")
                }
            })
            .catch(() => console.log("GET ERROR"));
    }

    const renderMenu = () => {
        setMenu(true);
    }
    const renderCart = () => {
        setMenu(false);
    }

    const addItemToCart = (menuItem) => {
        const order = [...currentOrder];
        let updated = false;
        const modifiedOrder = order.map(element => {
            if (element.itemData.key === menuItem.itemData.key && element.editable) {
                updated = true;
                return menuItem;
            } else {
                return element
            }
        });
        if (!updated)
            modifiedOrder.push(menuItem);
        if (menuItem.quantity === 0)
            setCurrentOrder(modifiedOrder.filter(element => element !== menuItem))
        else
            setCurrentOrder(modifiedOrder)
    }
    const placeOrder = () => {
        const order = {
            items: currentOrder.map(element => {
                if (element.editable) {
                    element.editable = false;
                    element.table = tableId;
                    element.delivered = false;
                }
                return element
            }),
            table: {
                id: tableId
            }
        }
        //todo:[SOLVE] not refreshing when updating order or creating a new one
        createOrderForTable(order).then();
    }
    const createNotification = (notification) => {
        if (notification.type === 'BILL') {
            const editableFields = currentOrder.filter(el => el.editable);
            if (editableFields.length === 0) {
                createNotificationForTable(notification).then(() => {
                    const alert = {
                        message: 'The waiter was notified to bring the bill to your table',
                        type: 'success'
                    }
                    const alerts = [...currentAlerts];
                    alerts.push(alert);
                    setCurrentAlerts(alerts)
                });
            } else {
                const alert = {
                    message: 'You cannot request the bill when there are items on you cart or undelivered',
                    type: 'error'
                }
                const alerts = [...currentAlerts];
                alerts.push(alert);
                setCurrentAlerts(alerts)
            }
        } else {
            createNotificationForTable(notification).then(() => {
                const alert = {
                    message: 'The waiter was notified to come to your table',
                    type: 'success'
                }
                const alerts = [...currentAlerts];
                alerts.push(alert);
                setCurrentAlerts(alerts)
            });
        }
    }

    return (
        <div className="blockPage">
            <Row className="componentsPage">
                {
                    currentAlerts.map((element, index) =>
                        <NotificationAlert
                            index={index}
                            alertMessage={element.message}
                            alertType={element.type}
                        />)
                }
            </Row>
            <Row className="componentsPage">
                <ClientHeader
                    renderMenu={renderMenu}
                    renderCart={renderCart}
                    createNotification={createNotification}
                    tableId={tableId}
                />
            </Row>
            <Row className="componentsPage">
                {
                    isMenu ?
                        <MenuComponent
                            foodData={foodData}
                            addItemToCart={addItemToCart}
                            currentOrder={currentOrder}/>
                        :
                        <CartComponent
                            currentOrder={currentOrder}
                            addItemToCart={addItemToCart}
                            placeOrder={placeOrder}
                        />
                }
            </Row>
        </div>
    );
};

export default RestaurantClientMainPage;
