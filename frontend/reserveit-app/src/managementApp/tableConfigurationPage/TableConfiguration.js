import React, {useEffect, useState} from "react";
import {Button, Col, Row, Select} from "antd";
import TableIcon from "./TableIcon";
import {CONFIG_TABLE, FREE_TABLE, GENERIC_RESTAURANT_ID, MAX_TABLE_NUM} from "../../resources/Constants";

const createTable = (index) => {
    return {
        restaurant: GENERIC_RESTAURANT_ID,
        tableConfiguration: {
            index: index,
            status: CONFIG_TABLE,
            isDisabled: false,
            x: 0,
            y: 0
        }
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
    }, [tablesData]);

    const updateNumberOfTables = (tableNumValue) => {
        setNumberOfTables(tableNumValue);
        setTableArray(createTableArray(tableNumValue));
    };

    const updateCoordinates = (index, x, y) => {
        tableArray[index - 1].tableConfiguration.x = x;
        tableArray[index - 1].tableConfiguration.y = y;
        const newArray = [...tableArray];
        setTableArray(newArray);
    };

    const saveConfiguration = () => {
        if (numberOfTables === 0) {
            return;
        }
        //now all the tables become free to use
        tableArray.map((el) => {
            el.tableConfiguration.status = FREE_TABLE
            return el;
        });
        saveTablesConfiguration(tableArray);
        setCanUpdateNumberOfTables(false);
    }

    const deleteConfiguration = () => {
        deleteTablesConfiguration();
        setNumberOfTables(0);
        setTableArray([]);
        setCanUpdateNumberOfTables(true);
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
                                return <Row key={"row-table" + element.tableConfiguration.index}><TableIcon
                                    index={element.tableConfiguration.index}
                                    status={element.tableConfiguration.status}
                                    isDisabled={element.tableConfiguration.isDisabled}
                                    updateCoordinates={updateCoordinates}
                                    x={element.tableConfiguration.x}
                                    y={element.tableConfiguration.y}
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
