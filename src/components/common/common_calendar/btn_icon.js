import React, { useState, Fragment } from "react";
import { Button, DatePicker } from 'antd';
import moment from "moment";
import { monthFormat } from "./../../../constants/controll";

const BtnIcon = ({
    month,
    year,
    value,
    onChange
}) => {
    const [open, setOpen] = useState(false);
    return <Fragment>
        <DatePicker
            dropdownClassName="nghi-phep-dropdown-datepicker"
            value={moment(`${month < 10 ? `0${month + 1}` : month + 1}/${year}`, monthFormat)}
            open={open}
            onOpenChange={open => setOpen(open)}
            mode="month"
            getCalendarContainer={() => document.body}
            style={{ width: 0, height: 0, opacity: 0 }}
            format={monthFormat}
            onPanelChange={(date) => {
                const _month = date.month();
                const _year = date.year();
                const newValue = value.clone();
                newValue.month(_month);
                newValue.year(_year);
                onChange(newValue);
                setOpen(false);
            }}
        />
        <Button onClick={() => setOpen(true)}>
            <i className="fa fa-calendar" />
        </Button>
    </Fragment>
}
export default BtnIcon;