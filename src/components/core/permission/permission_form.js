import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFormValues } from 'redux-form';
import { CommonForm } from "./../../common";
import * as formName from "./../../../constants/form_name";
import * as validate from "./../../../constants/validate"
import * as warn from "./../../../constants/warn";
import * as actPermission from "./../../../actions/core/permission";
import * as constants from "./../../../constants/constants";
import * as url from "./../../../constants/url";
import * as main from "./../../../constants/main";
import * as icon from "./../../../constants/icon";

const PermissionForm = ({
    queryVariable,
    handleBack,
    width
}) => {

    const [listActId, setListActId] = useState([]);

    const permission = useSelector(state => state.core.permission.item);
    const permission_menu = useSelector(state => state.core.permission.permission_menu);
    const formValue = useSelector(state => getFormValues(formName.FORM_NAME_PERMISSION)(state));
    const typeIsLink = formValue && formValue.type ? (formValue.type === constants.CONST_PERMISSION_TYPE_ACTION ? false : true) : true;
    const iconClassName = formValue ? formValue.icon : "";

    const dispatch = useDispatch();
    const createRequest = (object = {}) => dispatch(actPermission.createRequest(object));
    const updateRequest = (object = {}) => dispatch(actPermission.updateRequest(object));
    const handleGetOne = (idParent = 0) => dispatch(actPermission.handleGetOne({ idParent }));

    useEffect(() => {
        const idParent = (queryVariable && queryVariable.permission_active_id) ? parseInt(queryVariable.permission_active_id, 0) : 0;
        const permissionActive = findPermissionById(permission_menu, idParent);
        let list_act_id = [];
        main.getActionFromUrl().map((val) => {
            if (permissionActive !== null
                && permissionActive.hasOwnProperty("url")
                && val.hasOwnProperty("actions")
                && val.url === permissionActive.url) {
                list_act_id = val.actions;
            }
            return null;
        })
        setListActId(list_act_id);
    }, [permission_menu]);

    const findPermissionById = (list, id, result = null) => {
        list.map((item) => {
            if (item.id === id) {
                return result = item;
            }
            else {
                return result = findPermissionById(item.children, id, result);
            }
        });
        return result;
    }

    const WARN_PERMISSION_ACT_ID_NOT_FOUND = value => {
        return (value && listActId.indexOf(value) === -1) ?
            <React.Fragment key="warn-action">
                <span key="warn-1">ID chức năng này không được tìm thấy</span><br />
                <span key="warn-2">Nếu bạn muốn tiếp tục có thể quyền này không hoạt động hoặc hoạt động sai!</span>
            </React.Fragment> :
            undefined;
    };

    const handleSubmit = (values) => {
        let data = { ...values };
        if (!data.hasOwnProperty("menuTop")) {
            data.menuTop = false;
        }
        if (!data.hasOwnProperty("sort")) {
            data.sort = 1;
        }
        if (!data.menuLeft && data.type === constants.CONST_PERMISSION_TYPE_URL) {
            data.type = constants.CONST_PERMISSION_TYPE_URL_HIDDEN;
        }
        if (data.hiddenAction && data.type === constants.CONST_PERMISSION_TYPE_ACTION) {
            data.type = constants.CONST_PERMISSION_TYPE_ACTION_HIDDEN;
        }
        data.isMobile = values.isMobile ? 1 : 0;
        if (data.hasOwnProperty("id")) {
            updateRequest({
                data,
                requestSuccess: () => handleSubmitSuccess(data.idParent)
            });
        }
        else {
            data.idParent = (queryVariable && queryVariable.permission_active_id) ? parseInt(queryVariable.permission_active_id, 0) : 0;
            createRequest({
                data,
                requestSuccess: () => handleSubmitSuccess(data.idParent)
            });
        }
    };

    const handleSubmitSuccess = (idParent) => {
        handleGetOne(idParent);
        handleBack();
    }

    return (
        <React.Fragment>
            <CommonForm
                style={{ width: `calc(100% - ${width}px)`, left: width, position: "absolute" }}
                wrapperClassName="wrapper-form permission-form"
                data={[
                    [//row 1
                        {
                            col: 6,
                            label: "Tên quyền",
                            placeholder: "Tên quyền",
                            name: "name",
                            checkValid: true,
                            validates: [validate.VALIDATE_PERMISSION_TEN_REQUIRED]
                        },
                        {
                            col: 6,
                            label: "Biểu thức",
                            placeholder: "Biểu thức",
                            name: "permission",
                            checkValid: true,
                            validates: [validate.VALIDATE_PERMISSION_BIEUTHUC_REQUIRED]
                        },
                    ],
                    [ //row 2
                        {
                            col: 6,
                            label: "Loại quyền",
                            placeholder: "Biểu thức",
                            name: "type",
                            fieldType: "select",
                            checkValid: true,
                            validates: [validate.VALIDATE_PERMISSION_LOAI_REQUIRED],
                            options: [
                                { value: constants.CONST_PERMISSION_TYPE_URL, label: "Đường dẫn" },
                                { value: constants.CONST_PERMISSION_TYPE_ACTION, label: "Thao tác" }
                            ],
                            allowClear: false,
                        },
                        {
                            col: 6,
                            label: "Sắp xếp",
                            placeholder: "Sắp xếp",
                            name: "sort",
                            fieldType: "input",
                            checkValid: true,
                            validates: [validate.VALIDATE_IS_NUMBER]
                        },
                    ],
                    [ //row 3
                        {
                            col: 6,
                            label: typeIsLink ? "Đường dẫn" : "Thao tác",
                            name: typeIsLink ? "url" : "idChucNang",
                            dataSource: typeIsLink ? main.convertObjectToArray(url) : listActId,
                            fieldType: "autocomplete",
                            placeholder: typeIsLink ? "Đường dẫn" : "Thao tác",
                            checkValid: true,
                            validates: typeIsLink ? [validate.VALIDATE_PERMISSION_URL_REQUIRED] : [validate.VALIDATE_PERMISSION_IDCHUCNANG_REQUIRED],
                            warnings: typeIsLink ? [warn.WARN_PERMISSION_URL_NOT_FOUND] : [WARN_PERMISSION_ACT_ID_NOT_FOUND]
                        },
                        {
                            col: 6,
                            label: "Icon",
                            name: "icon",
                            fieldType: "autocomplete",
                            placeholder: "icon",
                            checkValid: true,
                            addonBefore: <i className={iconClassName} />,
                            dataSource: icon.fontAsomwe.map(item => ({ value: item, text: item, children: item }))
                        }
                    ],
                    [
                        {
                            label: "Ghi chú",
                            placeholder: "Ghi chú",
                            name: "note",
                            fieldType: "textarea",
                        }
                    ],
                    [
                        {
                            col: 6,
                            className: "checkbox-success",
                            label: "Hiển thị trên thanh tiêu đề",
                            name: "menuTop",
                            fieldType: "checkbox",
                            hidden: !(formValue && formValue.type && formValue.type === constants.CONST_PERMISSION_TYPE_URL)
                        },
                        {
                            col: 6,
                            className: "checkbox-success",
                            label: "Hiển thị trên Menu",
                            name: "menuLeft",
                            fieldType: "checkbox",
                            hidden: !(formValue && formValue.type && formValue.type === constants.CONST_PERMISSION_TYPE_URL)
                        },
                        {
                            col: 6,
                            className: "checkbox-success",
                            label: "Ẩn khỏi thanh thao tác",
                            name: "hiddenAction",
                            fieldType: "checkbox",
                            hidden: !(formValue && formValue.type && formValue.type === constants.CONST_PERMISSION_TYPE_ACTION)
                        },
                        {
                            col: 6,
                            className: "checkbox-success",
                            label: "Hiển thị trên App Mobile",
                            name: "isMobile",
                            fieldType: "checkbox",
                        }
                    ],
                ]}
                onSubmit={handleSubmit}
                form={formName.FORM_NAME_PERMISSION}
                initialValues={permission}

            />
        </React.Fragment>
    );
}

export default PermissionForm;