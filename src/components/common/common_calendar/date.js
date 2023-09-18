import React, { Fragment } from "react";

const CalendarDate = ({
    date,
    ngayNghiTrongTuan = [],
    ngayNghiLes = []
}) => {
    const getClassName = (date) => {
        let dayNameOfWeek = "";
        switch (date.isoWeekday()) {
            case 1: dayNameOfWeek = "monday"; break;
            case 2: dayNameOfWeek = "tuesday"; break;
            case 3: dayNameOfWeek = "wednesday"; break;
            case 4: dayNameOfWeek = "thursday"; break;
            case 5: dayNameOfWeek = "friday"; break;
            case 6: dayNameOfWeek = "saturday"; break;
            case 7: dayNameOfWeek = "sunday"; break;
            default: break;
        }
        return `${dayNameOfWeek} ${ngayNghiLes.length > 0 ? "ngay-le" : ""}`;
    }

    return <Content
        date={date}
        className={getClassName(date)}
        ngayNghiLes={ngayNghiLes}
        ngayNghiTrongTuan={ngayNghiTrongTuan}
    />
}

const Content = ({
    className,
    date,
    children,
    ngayNghiTrongTuan = [],
    ngayNghiLes = []
}) => {
    const dateContent = () => {
        let result = [];
        if (ngayNghiTrongTuan.indexOf(date.isoWeekday()) !== -1) {
            result.push(<small className="lich-nghi lich-nghi-tuan">Ngày nghỉ</small>)
        }
        if (ngayNghiLes.length > 0) {
            result = [];
            ngayNghiLes.map(ngayNghiLe => {
                result.push(<small className="lich-nghi lich-nghi-le">{ngayNghiLe.noiDung}</small>)
                return result;
            })
        }
        return <Fragment>
            {result.map(item => item)}
        </Fragment>
    }

    return <div className={`ant-fullcalendar-date ${className}`}>
        <div className="ant-fullcalendar-value">
            <span style={{ display: "inline-block", height: 24, width: 24, border: "1px solid #ccc", borderRadius: "50%", textAlign: "center" }}>
                {date.date()}
            </span>
        </div>
        <div className="ant-fullcalendar-content">
            <div id={`date-cell-${date.format("DDMMYYYY")}`}>
                {dateContent()}
                {children}
            </div >
        </div>
    </div>
}
export default CalendarDate;