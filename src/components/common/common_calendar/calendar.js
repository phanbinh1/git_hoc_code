import React, { useState, Fragment, useEffect } from "react";
import { Calendar } from 'antd';
import moment from "moment";
import { dateFormat } from "./../../../constants/controll";
import * as actCauHinh from "./../../../actions/app/quan_ly_nghi_phep/quan_ly_cau_hinh_nghi_phep";
import { useDispatch } from 'react-redux';
import CalendarHeader from "./header";
import CalendarDate from "./date";

const CommonCalendar = ({
    onYearChange,
    onMonthChange,
    headerFilter,
    disabledDate
}) => {
    const dispatch = useDispatch();
    const [_year, _setYear] = useState(moment().year());
    const [_month, _setMonth] = useState(moment().month());

    const [ngayLes, setNgayLes] = useState([]);
    const [ngayNghiTrongTuan, setNgayNghiTrongTuan] = useState({
        error: true,
        data: []
    });
    const getCauHinhByMa = (data = {}) => dispatch(actCauHinh.getOneByMaRequest(data));

    const ngayLeTrongNam = ngayLes.find(item => `${item.nam}` === `${_year}`);
    const ngayNghis = ngayLeTrongNam && Array.isArray(ngayLeTrongNam.ngayNghis) ? ngayLeTrongNam.ngayNghis : [];

    const getNgayNghiLeTrongNam = (year) => {
        getCauHinhByMa({
            data: { maCauHinh: `cauhinh_nghile_${year}` },
            requestSuccess: (res) => {
                try {
                    const giaTri = JSON.parse(res.result.giaTri);
                    setNgayLes(ngayLes => {
                        const index = ngayLes.findIndex(item => item.nam === giaTri.nam);
                        if (index >= 0) {
                            ngayLes[index] = giaTri;
                            return ngayLes;
                        }
                        else {
                            return [...ngayLes, giaTri];
                        }
                    })
                }
                catch (e) { }
            }
        })
    }

    useEffect(() => {
        if (ngayNghiTrongTuan.error) {
            getCauHinhByMa({
                data: { maCauHinh: "cauhinh_nghitrongtuan" },
                requestSuccess: (res) => {
                    try {
                        const giaTri = JSON.parse(res.result.giaTri);
                        giaTri.ngayNghiTrongTuan && Array.isArray(giaTri.ngayNghiTrongTuan) && setNgayNghiTrongTuan({ error: false, data: giaTri.ngayNghiTrongTuan });
                    }
                    catch (e) { }
                }
            });
        }
    }, [ngayNghiTrongTuan.error, _year, _month])

    useEffect(() => {
        getNgayNghiLeTrongNam(_year);
        const elm = document.getElementById(`year-${_year}`)
        elm && elm.scrollIntoView()
        if (onYearChange && typeof onYearChange === "function") {
            onYearChange(_year)
        }
    }, [_year])

    useEffect(() => {
        const elm = document.getElementById(`month-${_month}`)
        elm && elm.scrollIntoView()
        if (onMonthChange && typeof onMonthChange === "function") {
            onMonthChange(_month)
        }
    }, [_month])


    return <Fragment>
        <Calendar
            onPanelChange={(date) => {
                _setYear(moment(date).year());
                _setMonth(moment(date).month())
            }}
            dateFullCellRender={(date) => <CalendarDate
                date={date}
                ngayNghiLes={ngayNghis.filter(item => item.ngay === date.format(dateFormat))}
                ngayNghiTrongTuan={ngayNghiTrongTuan.data}
            />}
            headerRender={({ value, onChange }) => <CalendarHeader headerFilter={headerFilter} value={value} onChange={onChange} />}
            disabledDate={date => date.month() !== _month || (typeof disabledDate === "function" && disabledDate(date))}
        />
    </Fragment>
}
export default CommonCalendar;