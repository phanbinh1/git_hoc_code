import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Divider, Radio } from "antd";
import * as act from "./../../../actions";
import * as constants from "./../../../constants/constants";
import * as formName from "./../../../constants/form_name";
import * as main from "./../../../constants/main";

const CauHinh = ({ form }) => {

    const [style, setStyle] = useState({});
    const config = useSelector(state => state.core.config);

    const dispatch = useDispatch();
    const onChangeStyleForm = (_style) => {
        main.setFormStyle({
            form: form ? form : formName.FORM_NAME_DEFAULT,
            style: { ...style, ..._style }
        });
        dispatch(act.handleChangeLayout({
            key: constants.CONST_LAYOUT_KEY_FORM,
            form: form ? form : formName.FORM_NAME_DEFAULT,
            style: { ...style, ..._style }
        }))
    }

    useEffect(() => {
        const _form = form ? form : formName.FORM_NAME_DEFAULT;
        setStyle(config.form && config.form.hasOwnProperty(_form) ? config.form[_form] : {});
    }, [config])

    return <React.Fragment>
        <Divider orientation="left">Kiểu hiển thị</Divider>
        <div className="form-group">
            <Radio
                checked={style.type === "vertical"}
                onClick={() => onChangeStyleForm({ type: "vertical" })}
            >
                Kiểu 1
            </Radio>
            <div className="row">
                <div className="col-md-12">Tiêu đề:</div>
                <div className="col-md-12">
                    <input className="form-control input-sm" value="Nội dung" readOnly={true} />
                </div>
            </div>
        </div>
        <div className="form-group">
            <Radio
                checked={style.type === "inline"}
                onClick={() => onChangeStyleForm({ type: "inline" })}
            >
                Kiểu 2
            </Radio>
            <div className="row">
                <div className="col-md-4">Tiêu đề:</div>
                <div className="col-md-8">
                    <input className="form-control input-sm" value="Nội dung" readOnly={true} />
                </div>
            </div>
        </div>
        {/* <div className="form-group">
            <Radio
                checked={style.type === "horizontal"}
                onClick={() => onChangeStyleForm({ type: "horizontal" })}
            >
                Kiểu 3
            </Radio>
            <div className="row">
                <div className="col-md-4">Tiêu đề:</div>
                <div className="col-md-8">
                    <input className="form-control input-sm" value="Nội dung" readOnly={true} />
                </div>
            </div>
        </div> */}
    </React.Fragment>
}
export default CauHinh;