import React, {useEffect, useState} from "react";
import {notification, Space} from "antd";

const NotificationComponent = (props) => {
    const [api, contextHolder] = notification.useNotification();
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        setNotifications(props.notifications)

        // eslint-disable-next-line
    }, [props.notifications]);

    const removeNotification = (id) => {
        props.deleteNotification(id)
        setNotifications(props.notifications.filter(notification => notification.id !== id));
    }

    const openNotificationWithIcon = (notif) => {
        api.open({
            message: notif.type,
            description: notif.message,
            onClose: () => {
                //todo: logic for deleting notifications
                removeNotification(notif.id);
            }
        });
    };

    return (<>
        <>
            {contextHolder}
            <Space>
                {
                    notifications.forEach(notif => {
                        openNotificationWithIcon(notif);
                    })
                }
            </Space>
        </>
    </>);
};

export default NotificationComponent;
