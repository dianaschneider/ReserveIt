import React, {useEffect, useState} from "react";
import {Button, Col, Row, Select} from "antd";
import TableIcon from "./TableIcon";
import {CONFIG_TABLE, FREE_TABLE, MAX_TABLE_NUM} from "../../resources/Constants";

const createTable = (index) => {
    return {
        index: index,
        x: 0,
        y: 0,
        status: CONFIG_TABLE,
        disabled: false,
    };
}
const createTableArray = (numberOfTables) => {
    return Array.from({length: numberOfTables}, (_, i) => i + 1).map((element, index) => {
        return createTable(index + 1);
    });
}

const TableConfiguration = (props) => {
    const {tablesData, saveTablesConfiguration, deleteTablesConfiguration} = props;
    const height = '500px';
    const [numberOfTables, setNumberOfTables] = useState(0);
    const [tableArray, setTableArray] = useState([]);
    const [canUpdateNumberOfTables, setCanUpdateNumberOfTables] = useState(true);
    const tableSelectArray = Array.from({length: MAX_TABLE_NUM}, (_, i) => {
        return {value: i + 1, label: i + 1};
    });

    useEffect(() => {
        const auxArray = [...tablesData];
        const arr = [];
        auxArray.forEach((el) => {
            arr.push(el)
        });
        setNumberOfTables(tablesData.length);
        setTableArray(arr);
        setCanUpdateNumberOfTables(tablesData.length === 0);
        // eslint-disable-next-line
    }, []);

    const updateNumberOfTables = (tableNumValue) => {
        setNumberOfTables(tableNumValue);
        setTableArray(createTableArray(tableNumValue));
    };

    const updateCoordinates = (index, x, y) => {
        tableArray[index - 1].x = x;
        tableArray[index - 1].y = y;
        const newArray = [...tableArray];
        setTableArray(newArray);
    };

    const saveConfiguration = () => {
        if (numberOfTables === 0) {
            return;
        }
        //now all the tables become free to use
        tableArray.map((el) => {
            el.status = FREE_TABLE
            return el;
        });
        saveTablesConfiguration(tableArray);
        setCanUpdateNumberOfTables(false);
    }

    const deleteConfiguration = () => {
        const tablesWithActiveOrders = tablesData.filter(table => table.placedOrder !== null);
        if (tablesWithActiveOrders.length > 0) {
            alert("Cannot delete table configuration, there are still orders in progress!")
        } else {
            deleteTablesConfiguration();
            setNumberOfTables(0);
            setTableArray([]);
            setCanUpdateNumberOfTables(true);
        }
    }
    return (
        <>
            <Row>
                <Col>
                    <Row>Select a number of tables</Row>
                    <Row>
                        <Select
                            disabled={!canUpdateNumberOfTables}
                            value={numberOfTables}
                            onChange={(value => updateNumberOfTables(value))}
                            options={tableSelectArray}
                            style={{width: '150px'}}
                        />
                    </Row>
                    <>
                        {
                            tableArray.map((element) => {
                                return <Row key={"row-table" + element.index}><TableIcon
                                    index={element.index}
                                    status={element.status}
                                    isDisabled={element.disabled}
                                    updateCoordinates={updateCoordinates}
                                    accessTable={()=>{alert("Cannot access table data from this menu, go to Table Plan for this operation!")}}
                                    x={element.x}
                                    y={element.y}
                                /></Row>
                            })
                        }
                    </>
                </Col>
                <Col flex="auto">
                    <div id="drop-container"
                         style={{
                             border: '2px solid',
                             height: height,
                             width: "auto",
                             marginRight: '50px',
                             marginLeft: '50px'
                         }}/>
                </Col>
            </Row>
            <Row style={{display: 'flex', justifyContent: 'right', marginRight: '50px', marginTop: '10px'}}>
                <Button type="primary" onClick={saveConfiguration} disabled={!canUpdateNumberOfTables}>
                    SUBMIT CONFIGURATION</Button>
                <Button type="primary" danger onClick={deleteConfiguration}
                        disabled={canUpdateNumberOfTables}>RESET</Button>
            </Row>
        </>
    );
};

export default TableConfiguration;
