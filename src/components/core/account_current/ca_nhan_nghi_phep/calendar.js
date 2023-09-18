import React, { useState, Fragment, useEffect } from 'react';
import { Calendar, Dropdown, Menu, Button, Tooltip, DatePicker } from 'antd';
import { dateFormat, monthFormat } from "./../../../../constants/controll";
import moment from "moment";
import { useDispatch, useSelector } from 'react-redux';
import { CONST_NGHI_PHEP_BUOI } from '../../../../constants/constants';
import { arrayPush, arrayRemove, change, formValueSelector } from 'redux-form';
import * as formName from "./../../../../constants/form_name";

const NghiPhepCalendar = ({ ngayNghiTrongTuan = [], ngayDiLamTrongTuan = [], loadData, data, ngayLes, getNgayNghiLeTrongNam }) => {
    const dispatch = useDispatch();

    const [year, setYear] = useState(moment().year());
    const [month, setMonth] = useState(moment().month());

    const ngayLeTrongNam = ngayLes.find(item => `${item.nam}` === `${year}`);
    const ngayNghis = ngayLeTrongNam && Array.isArray(ngayLeTrongNam.ngayNghis) ? ngayLeTrongNam.ngayNghis : [];
    const thongTinNghiPhepChiTiets = useSelector(state => formValueSelector(formName.FORM_NAME_THONG_TIN_NGHI_PHEP)(state, "thongTinNghiPhepChiTiets")) || [];
    const formId = useSelector(state => formValueSelector(formName.FORM_NAME_THONG_TIN_NGHI_PHEP)(state, "id"));

    useEffect(() => {
        getNgayNghiLeTrongNam(year)
    }, [year]);

    useEffect(() => {
        loadData(year);
        const elm = document.getElementById(`year-${year}`)
        elm && elm.scrollIntoView()
    }, [year])

    useEffect(() => {
        const elm = document.getElementById(`month-${month}`)
        elm && elm.scrollIntoView()
    }, [month])

    const checkDisabledDate = (date) => {
        const nghiPhep = data.find(item => item.id !== formId && item.thongTinNghiPhepChiTiets && Array.isArray(item.thongTinNghiPhepChiTiets) && item.thongTinNghiPhepChiTiets.find(_item => _item.ngayNghi === date.format(dateFormat)));

        return nghiPhep
            || date.month() !== month
            || (ngayNghiTrongTuan.indexOf(date.isoWeekday()) >= 0 && ngayDiLamTrongTuan.findIndex(item => item.ngay === date.format(dateFormat)) < 0)
            || (ngayNghis.findIndex(item => item.ngay === date.format(dateFormat)) >= 0 && ngayDiLamTrongTuan.findIndex(item => item.ngay === date.format(dateFormat)) < 0)
    }

    const dateContent = (date) => {
        const nghiPhep = data.find(item => item.id !== formId && item.thongTinNghiPhepChiTiets && Array.isArray(item.thongTinNghiPhepChiTiets) && item.thongTinNghiPhepChiTiets.find(_item => _item.ngayNghi === date.format(dateFormat)));
        let result = [];
        const _date = ngayDiLamTrongTuan.find(item => item.ngay === date.format(dateFormat));
        const ngayNghiLes = ngayNghis.filter(item => item.ngay === date.format(dateFormat))

        if (_date) {
            result.push(<small className="lich-nghi lich-nghi-tuan">{_date.noiDung}</small>)
        }
        else {
            if (ngayNghiTrongTuan.indexOf(date.isoWeekday()) !== -1) {
                result.push(<small className="lich-nghi lich-nghi-tuan">Ngày nghỉ trong tuần</small>)
            }
            if (ngayNghiLes.length > 0) {
                result = [];
                ngayNghiLes.map(ngayNghiLe => {
                    result.push(<small className="lich-nghi lich-nghi-le">{ngayNghiLe.noiDung}</small>)
                    return result;
                })
            }
        }
        return <Fragment>
            {result.map(item => item)}
            {nghiPhep && <small className="lich-nghi ">Đã nghỉ phép</small>}
        </Fragment>
    }

    const getClassName = (date) => {
        let dayNameOfWeek = "", className = "", ngayNghiClass = "";
        const ngayNghiLes = ngayNghis.filter(item => item.ngay === date.format(dateFormat))
        const nghiPhep = data.find(item => item.id !== formId && item.thongTinNghiPhepChiTiets && Array.isArray(item.thongTinNghiPhepChiTiets) && item.thongTinNghiPhepChiTiets.find(_item => _item.ngayNghi === date.format(dateFormat)));
        const nghiPhepChiTiet = nghiPhep && Array.isArray(nghiPhep.thongTinNghiPhepChiTiets) ? nghiPhep.thongTinNghiPhepChiTiets.find(item => item.ngayNghi === date.format(dateFormat)) : undefined;

        const ngayNghi = thongTinNghiPhepChiTiets.find(item => item.ngayNghi === date.format(dateFormat));

        const _date = ngayDiLamTrongTuan.find(item => item.ngay === date.format(dateFormat));
        if (_date) {
            ngayNghiClass = "di-lam";
        }
        else if (ngayNghiLes.length > 0) {
            ngayNghiClass = "ngay-le";
        }

        if (ngayNghi && ngayNghi.loaiBuoi && CONST_NGHI_PHEP_BUOI[`${ngayNghi.loaiBuoi}`] && CONST_NGHI_PHEP_BUOI[`${ngayNghi.loaiBuoi}`].label) {
            className = CONST_NGHI_PHEP_BUOI[`${ngayNghi.loaiBuoi}`].className;
        }
        else if (nghiPhepChiTiet && nghiPhepChiTiet.loaiBuoi && CONST_NGHI_PHEP_BUOI[`${nghiPhepChiTiet.loaiBuoi}`] && CONST_NGHI_PHEP_BUOI[`${nghiPhepChiTiet.loaiBuoi}`].label) {
            className = CONST_NGHI_PHEP_BUOI[`${nghiPhepChiTiet.loaiBuoi}`].className;
        }

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

        return `${dayNameOfWeek} ${ngayNghiClass} ${className}`;
    }

    const onClick = ({ key }, date) => {
        const index = thongTinNghiPhepChiTiets.findIndex(item => item.ngayNghi === date.format(dateFormat));
        switch (key) {
            case CONST_NGHI_PHEP_BUOI.SANG.value:
            case CONST_NGHI_PHEP_BUOI.CHIEU.value:
            case CONST_NGHI_PHEP_BUOI.CANGAY.value:
                if (index < 0) {
                    dispatch(arrayPush(formName.FORM_NAME_THONG_TIN_NGHI_PHEP, "thongTinNghiPhepChiTiets", { ngayNghi: date.format(dateFormat), loaiBuoi: key }))
                }
                else {
                    dispatch(change(formName.FORM_NAME_THONG_TIN_NGHI_PHEP, `thongTinNghiPhepChiTiets[${index}]`, { ngayNghi: date.format(dateFormat), loaiBuoi: key }))
                }
                break;
            default:
                if (index >= 0) {
                    dispatch(arrayRemove(formName.FORM_NAME_THONG_TIN_NGHI_PHEP, `thongTinNghiPhepChiTiets`, index));
                }
                break;
        }
    }

    const dateFullCellRender = (date) => {
        const ngayNghi = thongTinNghiPhepChiTiets.find(item => item.ngayNghi === date.format(dateFormat));
        const content = () => {
            return <div className={`ant-fullcalendar-date ${getClassName(date)}`}>
                <div className="ant-fullcalendar-value">
                    <span style={{ display: "inline-block", height: 24, width: 24, border: "1px solid #ccc", borderRadius: "50%", textAlign: "center" }}>
                        {date.date()}
                    </span>
                </div>
                <div className="ant-fullcalendar-content">
                    <div id={`date-cell-${date.format("DDMMYYYY")}`}>
                        {dateContent(date)}
                    </div >
                </div>
            </div>
        }

        return checkDisabledDate(date) ?
            content() :
            <Dropdown
                trigger={["click"]}
                overlay={<Menu onClick={(param) => onClick(param, date)}>
                    <Menu.Item disabled={ngayNghi && ngayNghi.loaiBuoi === CONST_NGHI_PHEP_BUOI.CANGAY.value} key={CONST_NGHI_PHEP_BUOI.CANGAY.value}>{CONST_NGHI_PHEP_BUOI.CANGAY.label}</ Menu.Item>
                    <Menu.Item disabled={ngayNghi && ngayNghi.loaiBuoi === CONST_NGHI_PHEP_BUOI.SANG.value} key={CONST_NGHI_PHEP_BUOI.SANG.value}>{CONST_NGHI_PHEP_BUOI.SANG.label}</Menu.Item>
                    <Menu.Item disabled={ngayNghi && ngayNghi.loaiBuoi === CONST_NGHI_PHEP_BUOI.CHIEU.value} key={CONST_NGHI_PHEP_BUOI.CHIEU.value}>{CONST_NGHI_PHEP_BUOI.CHIEU.label}</Menu.Item>
                    <Menu.Item key="KHONGNGHI" disabled={!ngayNghi}>Không nghỉ</Menu.Item>
                </Menu>}
                getPopupContainer={() => document.getElementById("wrapper-content")}
            >
                {content()}
            </Dropdown>
    }

    const headerRender = ({ value, onChange }) => {
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
            <div className="col-md-12" style={{ padding: 0 }}>
                <div className="pull-left">
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
                </div>
                <div className="pull-right">
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

    return <Fragment>
        <Calendar
            onPanelChange={(date) => {
                setYear(moment(date).year());
                setMonth(moment(date).month())
            }}
            dateFullCellRender={dateFullCellRender}
            headerRender={headerRender}
            disabledDate={checkDisabledDate}
        />
    </Fragment>
}


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

export default NghiPhepCalendar;