import React, { } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CommonForm } from "./../../common";
import * as actService from "./../../../actions/core/service";
import * as constants from "./../../../constants/constants";
import * as validate from "./../../../constants/validate";
import * as formName from "./../../../constants/form_name";


const ServiceForm = ({ handleBack }) => {

    const service = useSelector(state => state.core.service.item);

    const dispatch = useDispatch();
    const createRequest = (object = {}) => dispatch(actService.createRequest(object));
    const updateRequest = (object = {}) => dispatch(actService.updateRequest(object));

    const handleSubmit = (values) => {
        if (values.authorizedGrantTypes && Array.isArray(values.authorizedGrantTypes)) {
            values.authorizedGrantTypes = values.authorizedGrantTypes.toString();
        }
        if (service.hasOwnProperty("clientId")) {
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
                            label: "CLIENT ID",
                            placeholder: "CLIENT ID",
                            name: "clientId",
                            checkValid: true,
                            validates: [validate.VALIDATE_SERVICE_CLIENT_ID_REQUIRED]
                        },
                        {
                            col: 4,
                            label: "RESUORCE ID",
                            placeholder: "RESUORCE ID",
                            name: "resourceIds",
                        },
                        {
                            col: 4,
                            label: "CLIENT SECRET",
                            placeholder: "CLIENT SECRET",
                            name: "clientSecret",
                            checkValid: true,
                            validates: [validate.VALIDATE_SERVICE_CLIENT_SECRET_REQUIRED]
                        },
                    ],
                    [//row 2
                        {
                            col: 4,
                            label: "SCOPE",
                            placeholder: "SCOPE",
                            name: "scope",
                            checkValid: true,
                            validates: [validate.VALIDATE_SERVICE_SCOPE_REQUIRED]
                        },
                        {
                            col: 4,
                            label: "AUTHORIZED GRANT TYPES",
                            placeholder: "AUTHORIZED GRANT TYPES",
                            fieldType: "select",
                            mode: "multiple",
                            name: "authorizedGrantTypes",
                            options: constants.CONST_OPTIONS_AUTH_GRAND_TYPE,
                            checkValid: true,
                            validates: [validate.VALIDATE_SERVICE_AUTHORIZED_GRANT_TYPES_REQUIRED]
                        },
                        {
                            col: 4,
                            label: "WEB SERVER REDIRECT URI",
                            placeholder: "WEB SERVER REDIRECT URI",
                            name: "webServerRedirectUri"
                        },
                    ],
                    [//row 3
                        {
                            col: 4,
                            label: "AUTHORITIES",
                            placeholder: "AUTHORITIES",
                            name: "authorities",
                        },
                        {
                            col: 4,
                            label: "ACCESS_TOKEN_VALIDITY",
                            placeholder: "ACCESS_TOKEN_VALIDITY",
                            name: "accessTokenValidity",
                            checkValid: true,
                            validates: [validate.VALIDATE_SERVICE_ACCESS_TOKEN_VALIDITY_REQUIRED]
                        },
                        {
                            col: 4,
                            label: "REFRESH_TOKEN_VALIDITY",
                            placeholder: "REFRESH_TOKEN_VALIDITY",
                            name: "refreshTokenValidity",
                            checkValid: true,
                            validates: [validate.VALIDATE_SERVICE_REFRESH_TOKEN_VALIDITY_REQUIRED]
                        },
                    ],
                    [//row 3
                        {
                            col: 4,
                            label: "ADDITIONAL_INFORMATION",
                            placeholder: "ADDITIONAL_INFORMATION",
                            name: "additionalInformation"
                        },
                        {
                            col: 4,
                            label: "AUTOAPPTOVE",
                            placeholder: "AUTOAPPTOVE",
                            name: "autoApprove",
                            fieldType: "select",
                            valueKey: "value",
                            labelKey: "value",
                            options: [{ value: "TRUE" }, { value: "FALSE" }],
                            checkValid: true,
                            validates: [validate.VALIDATE_SERVICE_AUTOAPPTOVE_REQUIRED]
                        },
                    ]
                ]}
                actions={[
                    {
                        htmlType: constants.FORM_HTML_TYPE_SUBMIT,
                        label: service.hasOwnProperty("clientId") ? constants.FORM_BUTTON_LABEL_UPDATE : constants.FORM_BUTTON_LABEL_CREATE,
                        icon: "fa fa-save",
                        type: constants.CONST_TYPE_BTN_SUBMIT,
                    }
                ]}
                onSubmit={handleSubmit}
                form={formName.FORM_NAME_SERVICE}
                initialValues={service}
            />
        </React.Fragment >
    );
}
export default ServiceForm;