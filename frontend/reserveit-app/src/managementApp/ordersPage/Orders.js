import React, {useState} from "react";
import OrdersList from "./OrdersList";
import OrderContent from "./OrderContent";

const Orders = (props) => {
    const [listComponent, setListComponent] = useState(true);
    const [displayedOrder, setDisplayedOrder] = useState({});

    const seeOrder = (i) => {
        setListComponent(false);
        setDisplayedOrder(props.ordersData[i]);
    }
    const backToList = () => {
        setListComponent(true);
        setDisplayedOrder({});
    }

    return <div>
        {
            listComponent ?
                <OrdersList
                    ordersData={props.ordersData}
                    seeOrder={seeOrder}/>
                :
                <OrderContent
                    order={displayedOrder}
                    backToList={backToList}
                    updateOrderStatus={props.updateOrderStatus}
                />
        }
    </div>
};

export default Orders;
