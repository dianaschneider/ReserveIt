import React, {useEffect, useState} from "react";
import "./resources/Styling.css";
import {Row} from "antd";
import TableIcon from "../tableConfigurationPage/TableIcon";

const TablePlan = (props) => {
    const {tablesData, accessTable} = props;
    const height = '700px'
    const [tables, setTables] = useState([]);

    useEffect(() => {
        setTables(tablesData);
    }, [tablesData]);

    if (tables.length === 0) {
        return <div>
            <Row className="center-div-row">You have no tables configured.</Row>
            <Row className="center-div-row">Go to "Configure Tables" menu for creating the configuration.</Row>
        </div>
    } else {
        return (
            <>
                <Row className="center-div-row">Explore your restaurant configuration</Row>
                <Row className="center-div-row">
                    <div id="drop-container"
                         style={{
                             border: '2px solid',
                             height: height,
                             width: "100%",
                             marginRight: '50px',
                             marginLeft: '50px'
                         }}/>
                </Row>
                <>
                    {
                        tables.map((element) => {
                            return <Row key={"row-table" + element.tableConfiguration.index}><TableIcon
                                index={element.tableConfiguration.index}
                                status={element.tableConfiguration.status}
                                isDisabled={element.tableConfiguration.isDisabled}
                                x={element.tableConfiguration.x}
                                y={element.tableConfiguration.y}
                                accessTable={accessTable}
                            /></Row>
                        })
                    }
                </>
            </>
        );
    }
};

export default TablePlan;
