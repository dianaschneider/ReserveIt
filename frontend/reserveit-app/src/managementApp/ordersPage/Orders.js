import React, {useState} from "react";
import OrdersList from "./OrdersList";
import OrderContent from "./OrderContent";

const Orders = (props) => {
    const [listComponent, setListComponent] = useState(true);
    const [displayedOrder, setDisplayedOrder] = useState(0);

    const seeOrder = (orderId) => {
        setListComponent(false);
        setDisplayedOrder(orderId); // TODO: change to fetch from BE
    }
    const backToList = () => {
        setListComponent(true);
        setDisplayedOrder(0);
    }

    const payBill = (id) => {
        backToList();
        props.payBill(id);
    }

    return <div>
        {
            listComponent ?
                <OrdersList
                    ordersData={props.ordersData}
                    tablesData={props.tablesData}
                    seeOrder={seeOrder}/>
                :
                <OrderContent
                    orderId={displayedOrder}
                    backToList={backToList}
                    isOrdersPage={true}
                    updateOrderStatus={props.updateOrderStatus}
                    items={props.items}
                    payBill={payBill}
                />
        }
    </div>
};

export default Orders;
