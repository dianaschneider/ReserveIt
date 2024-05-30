import React, {useEffect, useState} from "react";
import './Styling.css'
import ClientHeader from "../header/ClientHeader";
import MenuComponent from "../menuComponent/MenuComponent";
import axios from "axios";
import {DATABASE} from "../../managementApp/fetchingData/Constants";
import {Row} from "antd";
import CartComponent from "../cartComponent/CartComponent";
import {useParams} from "react-router";
import NotificationAlert from "./NotificationAlert";

const RestaurantClientMainPage = () => {
    const {restaurantId, tableIndex} = useParams();
    const [tableId, setTableId] = useState(0);
    const [foodData, setFoodData] = useState([]);
    const [isMenu, setMenu] = useState(true);
    const [currentOrder, setCurrentOrder] = useState([]);
    const [currentAlerts, setCurrentAlerts] = useState([])

    const refreshData =  () => {
        getMenuData().then(() => {
        });

        getTableOrder().then(() => {
        });
    }

    useEffect(() => {
        refreshData();
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
            .catch(() => alert('Menu data could not be fetched, please try again later!'));
    }
    const getTableOrder = async () => {
        axios.get(`${DATABASE}/restaurants/${restaurantId}/table?tableDataId=${tableIndex}`)
            .then(res => {
                if (res.status === 200) {
                    if (res.data.placedOrder !== null) {
                        setCurrentOrder(res.data.placedOrder.requestedItems)
                    }
                    setTableId(res.data.id)
                }
            })
            .catch(() => alert('Table data could not be fetched, please try again later!'));
    }

    /*UPDATE DATA TO DATABASE*/
    const addRequestedItemsToOrder = async (orderId, oldOrder, newOrder) => {
        newOrder.forEach(requestedItem => {
            const identicalItemInOldOrder = oldOrder
                .filter(element => element.item === requestedItem.item &&
                    element.numberRequested === requestedItem.numberRequested &&
                    element.delivered === requestedItem.delivered &&
                    element.editable === requestedItem.editable);
            if (identicalItemInOldOrder.length === 0) {
                // check if the item is a dublicate that was not delivered
                const undeliveredItemInOldOrder = oldOrder
                    .filter(element => element.item === requestedItem.item &&
                        element.numberRequested !== requestedItem.numberRequested &&
                        !element.delivered && element.editable);

                if (undeliveredItemInOldOrder.length > 0) {
                    //edit the existing item in the order with the new requested elements
                    axios.put(DATABASE + `/requested-items/edit?itemId=${requestedItem.id}&numberRequested=${requestedItem.numberRequested}`)
                        .then(() => {
                            refreshData()
                        })
                        .catch(() => alert('Number of requested elements for item could not be modified!'))
                } else {
                    // add the new item to the order
                    if (requestedItem.numberRequested === 0)
                        return;
                    axios.post(DATABASE + `/requested-items?placedOrderId=${orderId}&itemId=${requestedItem.item}`, {
                        "numberRequested": requestedItem.numberRequested
                    })
                        .then(() => {
                            refreshData()
                        })
                        .catch(() => alert('The item could not be added to the order!'))
                }
            }
        });
    };
    const createOrderForTable = async () => {
         const tableResponse = await axios.get(DATABASE + `/restaurants/${restaurantId}/table?tableDataId=${tableIndex}`)
         if (tableResponse.status === 200) {
             const tableData = tableResponse.data;
             if (tableData.placedOrder === null) {
                 //first create an empty order
                 await axios.post(DATABASE + `/orders?tableDataId=${tableId}`, {});
            }
         }
         const updatedTableResponse = await axios.get(`${DATABASE}/restaurants/${restaurantId}/table?tableDataId=${tableIndex}`)
         if (updatedTableResponse.status === 200) {
             await addRequestedItemsToOrder(updatedTableResponse.data.placedOrder.id, updatedTableResponse.data.placedOrder.requestedItems, currentOrder)
         }
         refreshData()
    }
    const createNotificationForTable = async (notification) => {
        axios.post(`${DATABASE}/notifications?tableDataId=${tableId}`, notification)
            .then(() => {
                refreshData()
            })
            .catch(() => alert("Notification could not be sent!"));
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
            if (element.item === menuItem.item && element.editable) {
                updated = true;
                return menuItem;
            } else {
                return element
            }
        });
        if (!updated)
            modifiedOrder.push(menuItem);
        setCurrentOrder(modifiedOrder)
    }
    const placeOrder = () => {
        createOrderForTable().then();
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
                            currentOrder={currentOrder}
                            addItemToCart={addItemToCart}
                        />
                        :
                        <CartComponent
                            foodData={foodData}
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
