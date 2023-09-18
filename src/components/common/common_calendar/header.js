import React from "react";
import { Dropdown, Menu, Button, Tooltip } from 'antd';
import BtnIcon from "./btn_icon";

const CalendarHeader = ({ value, onChange, headerFilter }) => {
    const start = 0;
    const end = 12;
    const monthOptions = [];
    for (let i = start; i < end; i++) {
        monthOptions.push(<Menu.Item id={`month-${i}`} key={`${i}`} >Tháng {i + 1}</Menu.Item>);
    }
    const month = value.month();
    const year = value.year();
    const yearOptions = [];
    for (let i = year - 10; i < year + 10; i += 1) {
        yearOptions.push(<Menu.Item id={`year-${i}`} key={`${i}`} >Năm {i}</Menu.Item>);
    }
    const nextMonth = () => {
        let _nextMonth = parseInt(month, 10) + 1;
        let _year = year;
        if (_nextMonth === 12) {
            _nextMonth = 0;
            _year = _year + 1;
        }
        const newValue = value.clone();
        newValue.month(_nextMonth);
        newValue.year(_year);
        onChange(newValue);
    }
    const nextYear = () => {
        let _nextYear = year + 1;
        const newValue = value.clone();
        newValue.year(_nextYear);
        onChange(newValue);
    }
    const preMonth = () => {
        let _preMonth = parseInt(month, 10) - 1;
        let _year = year;
        if (_preMonth === -1) {
            _preMonth = 11;
            _year = _year - 1;
        }
        const newValue = value.clone();
        newValue.month(_preMonth);
        newValue.year(_year);
        onChange(newValue);
    }
    const preYear = () => {
        let _preYear = year - 1;
        const newValue = value.clone();
        newValue.year(_preYear);
        onChange(newValue);
    }

    return <div className="row" style={{ padding: "8px 0", margin: 0 }}>
        <div className="col-md-12">
            <div className="pull-left">{headerFilter}</div>
            <div className="pull-right">
                <Button.Group className="m-r-10">
                    <BtnIcon
                        month={month}
                        year={year}
                        value={value}
                        onChange={onChange}
                    />
                    <Dropdown
                        trigger={["click"]}
                        overlay={<Menu
                            selectedKeys={[`${month}`]}
                            onClick={({ key }) => {
                                const newValue = value.clone();
                                newValue.month(parseInt(key, 10));
                                onChange(newValue);
                            }}
                        >
                            {monthOptions}
                        </Menu>}
                        overlayStyle={{ overflow: "auto", maxHeight: "200px" }}
                    >
                        <Button>
                            <span>Tháng {month + 1}</span>
                            <i className="fa fa-angle-down m-l-5" />
                        </Button>
                    </Dropdown>
                    <Dropdown
                        trigger={["click"]}
                        overlay={<Menu
                            selectedKeys={[`${year}`]}
                            onClick={({ key }) => {
                                const now = value.clone().year(parseInt(key, 0));
                                onChange(now);
                            }}
                        >
                            {yearOptions}
                        </Menu>}
                        overlayStyle={{ overflow: "auto", maxHeight: "200px" }}
                    >
                        <Button>
                            <span>Năm {year}</span>
                            <i className="fa fa-angle-down m-l-5" />
                        </Button>
                    </Dropdown>
                </Button.Group>
                <Button.Group>
                    <Tooltip title="Năm trước"><Button onClick={preYear}><i className="fa fa-angle-double-left" /></Button></Tooltip>
                    <Tooltip title="Tháng trước"><Button onClick={preMonth}><i className="fa fa-angle-left" /></Button></Tooltip>
                    <Tooltip title="Tháng sau"><Button onClick={nextMonth}><i className="fa fa-angle-right" /></Button></Tooltip>
                    <Tooltip title="Năm sau"><Button onClick={nextYear}><i className="fa fa-angle-double-right" /></Button></Tooltip>
                </Button.Group>
            </div>
        </div>
    </div>

}
export default CalendarHeader;