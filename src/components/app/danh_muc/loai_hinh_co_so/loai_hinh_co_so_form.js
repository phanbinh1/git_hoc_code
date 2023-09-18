import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CommonForm } from "./../../../common";
import * as validate from "./../../../../constants/validate"
import * as actLoaiHinhCoSo from "./../../../../actions/app/danh_muc/loai_hinh_co_so/loai_hinh_co_so";
import * as constants from "./../../../../constants/constants";
import * as formName from "./../../../../constants/form_name";
import * as main from "./../../../../constants/main";

const LoaiHinhCoSoForm = ({ handleBack }) => {
    const loai_hinh_co_so = useSelector(state => state.app.danh_muc.loai_hinh_co_so.item);
    const loai_hinh_co_so_tree = useSelector(state => state.app.danh_muc.loai_hinh_co_so.tree);

    const dispatch = useDispatch();
    const createRequest = (object = {}) => dispatch(actLoaiHinhCoSo.createRequest(object));
    const updateRequest = (object = {}) => dispatch(actLoaiHinhCoSo.updateRequest(object));
    const getTreeRequest = (object = {}) => dispatch(actLoaiHinhCoSo.getTreeRequest(object));

    useEffect(() => {
        getTreeRequest();
    }, [])

    const handleSubmit = (values) => {
        values = { ...values, maLoaiHinhCha: values.maLoaiHinhCha ? values.maLoaiHinhCha : "0" };
        if (values.hasOwnProperty("id")) {
            updateRequest({
                data: values,
                requestSuccess: handleBack
            });
        }
        else {
            createRequest({
                data: values,
                requestSuccess: handleBack
            });
        }
    };

    return (
        <React.Fragment>
            <CommonForm
                data={[
                    [//row 1
                        {
                            col: 4,
                            label: "Mã loại cơ sở",
                            placeholder: "Mã loại hình cơ sở",
                            name: "ma",
                            readOnly: loai_hinh_co_so.hasOwnProperty("id"),
                            checkValid: true,
                            validates: [validate.VALIDATE_LOAI_HINH_CO_SO_MA_REQUIRED]
                        },
                        {
                            col: 4,
                            label: "Tên loại cơ sở",
                            placeholder: "Tên loại hình cơ sở",
                            name: "ten",
                            checkValid: true,
                            validates: [validate.VALIDATE_LOAI_HINH_CO_SO_TEN_REQUIRED]
                        },
                        {
                            col: 4,
                            label: "Loại hình cơ sở cha",
                            placeholder: "Loại hình cơ sở cha",
                            fieldType: "selectTree",
                            valueKey: "value",
                            labelKey: "label",
                            name: "maLoaiHinhCha",
                            options: main.convertListDisabledItemCustom({
                                list: loai_hinh_co_so_tree,
                                items: [{ ...loai_hinh_co_so, value: loai_hinh_co_so.ma }],
                                comparative: "value"
                            })
                        }
                    ],
                ]}
                actions={[
                    {
                        htmlType: constants.FORM_HTML_TYPE_SUBMIT,
                        label: loai_hinh_co_so.hasOwnProperty("id") ? constants.FORM_BUTTON_LABEL_UPDATE : constants.FORM_BUTTON_LABEL_CREATE,
                        icon: "fa fa-save",
                        type: constants.CONST_TYPE_BTN_SUBMIT,
                    }
                ]}
                onSubmit={handleSubmit}
                form={formName.FORM_NAME_LOAI_HINH_CO_SO}
                initialValues={loai_hinh_co_so}
            />
        </React.Fragment >
    );
}

export default LoaiHinhCoSoForm;