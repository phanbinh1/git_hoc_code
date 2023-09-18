import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { CommonAddress, CommonForm } from "./../../../common";
import * as actDanhMucCho from "./../../../../actions/app/danh_muc/danh_muc_cho/danh_muc_cho";
import * as constants from "./../../../../constants/constants";
import * as formName from "./../../../../constants/form_name";
import * as validate from "./../../../../constants/validate";

const DanhMucChoForm = ({ handleBack }) => {
  const danh_muc_cho = useSelector(
    (state) => state.app.danh_muc.danh_muc_cho.item
  );
  const dispatch = useDispatch();

  const createRequest = (data) => dispatch(actDanhMucCho.createRequest(data));
  const updateRequest = (data) => dispatch(actDanhMucCho.updateRequest(data));

  const handleSubmit = (values) => {
    if (values.hasOwnProperty("id")) {
      updateRequest({
        data: values,
        requestSuccess: handleBack,
      });
    } else {
      createRequest({
        data: values,
        requestSuccess: handleBack,
      });
    }
  };

  return (
    <React.Fragment>
      <CommonForm
        data={[
          [
            //row 1
            {
              col: 12,
              label: "Tên chợ",
              placeholder: "Tên chợ",
              name: "ten",
              checkValid: true,
              validates: [validate.VALIDATE_DANH_MUC_CHO_TEN_CHO_REQUIRED],
            },
          ],
          [
            {
              col: 12,
              type: "custom",
              renderCustom: (
                <CommonAddress
                  key="address"
                  form={formName.FORM_NAME_DANH_MUC_CHO}
                  tinhThanh={{ name: "tinhThanh.ma" }}
                  quanHuyen={{ name: "quanHuyen.ma" }}
                  xaPhuong={{ name: "xaPhuong.ma" }}
                  diaChi={{ name: "diaChi" }}
                />
              ),
            },
          ],
        ]}
        actions={[
          {
            htmlType: constants.FORM_HTML_TYPE_SUBMIT,
            label: danh_muc_cho.hasOwnProperty("id")
              ? constants.FORM_BUTTON_LABEL_UPDATE
              : constants.FORM_BUTTON_LABEL_CREATE,
            icon: "fa fa-save",
            type: constants.CONST_TYPE_BTN_SUBMIT,
          },
        ]}
        onSubmit={handleSubmit}
        form={formName.FORM_NAME_DANH_MUC_CHO}
        initialValues={{
          tinhThanh: { ma: constants.CONST_DEFAULT_TINHTHANH.ma },
          ...danh_muc_cho,
        }}
      />
    </React.Fragment>
  );
};

export default DanhMucChoForm;
