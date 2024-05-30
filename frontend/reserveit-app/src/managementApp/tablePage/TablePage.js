import React, { useState} from "react";
import OrderContent from "../ordersPage/OrderContent";
import AssignUser from "./AssignUser";
import NotificationComponent from "../ordersPage/NotificationComponent";

const TablePage = (props) => {
    const [orderPaid, setOrderPaid] = useState(false);

    const payBill = (id) => {
        props.payBill(id);
        setOrderPaid(true);
    }

    return (<>
        <h2>Info about table {props.table.index}</h2>
        <AssignUser
            table={props.table}
            staffData={props.staffData}
            assignWaiter={props.assignWaiter}
        />
        {
            props.table.placedOrder !== null && !orderPaid ?
                <OrderContent
                    orderId={props.table.placedOrder.id}
                    isOrdersPage={false}
                    backToList={() => {}}
                    updateOrderStatus={props.updateOrderStatus}
                    items={props.items}
                    payBill={payBill}
                />
                :
                <h2>No orders yet!</h2>
        }
        <div>
            <NotificationComponent
                notifications={props.table.notificationAlerts}
                deleteNotification={props.deleteNotification}
            />
        </div>
    </>);
};

export default TablePage;
