import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {Avatar, Button, List} from "antd";
import order from "./resources/order.png";

const OrdersList = (props) => {
    return <div
        id="scrollableDiv"
        style={{
            height: 400,
            marginLeft: 50,
            marginRight: 50,
            overflow: 'auto',
            padding: '0 16px',
            border: '1px solid rgba(140, 140, 140, 0.35)',
        }}
    >
        <InfiniteScroll
            dataLength={props.ordersData.length}
            scrollableTarget="scrollableDiv"
        >
            <List
                dataSource={props.ordersData}
                renderItem={(item) => {
                    const table = props.tablesData.filter(table => table.id === item.tableData)[0]
                    return (<List.Item
                        key={"order-nr-" + item.id}
                        style={{height: 150}}>
                        <List.Item.Meta
                            avatar={<Avatar size="large" icon={<img src={order} alt=""/>}/>}
                            title={<div>{"Order for Table " + table.index}</div>}
                            description={item.status}
                        />
                        <Button type="primary" onClick={() => props.seeOrder(item.id)}>See order content</Button>
                    </List.Item>)
                }}
            />
        </InfiniteScroll>
    </div>
}

export default OrdersList;