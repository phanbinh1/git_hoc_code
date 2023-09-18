import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFormValues, arrayPush, arrayRemove, Field } from "redux-form";
import { Table, Button, Divider } from "antd";
import { FieldInput, FieldCurrency } from "./../../../../../constants/controll";
import { CommonFormContent } from "./../../../../common";
import * as formName from "./../../../../../constants/form_name";
import * as validate from "./../../../../../constants/validate"
import * as main from "./../../../../../constants/main";

const TabKinhPhi = () => {
   const formValues = useSelector(state => getFormValues(formName.FORM_NAME_QTNVTT_KE_HOACH_THANH_TRA)(state));

   const dispatch = useDispatch();
   const onAddKinhPhi = () => dispatch(arrayPush(formName.FORM_NAME_QTNVTT_KE_HOACH_THANH_TRA, "duToanKinhPhis", {}))
   const onRemoveKinhPhi = (index) => dispatch(arrayRemove(formName.FORM_NAME_QTNVTT_KE_HOACH_THANH_TRA, "duToanKinhPhis", index))

   return (
      <React.Fragment>
         <CommonFormContent
            key="f-c-2"
            data={[
               [
                  {
                     type: "custom",
                     renderCustom: <React.Fragment key="list-kp">
                        <KinhPhi
                           list={formValues && formValues.duToanKinhPhis && Array.isArray(formValues.duToanKinhPhis) ? formValues.duToanKinhPhis : []}
                           onAdd={onAddKinhPhi}
                           onRemove={onRemoveKinhPhi}
                        />
                     </React.Fragment>
                  }
               ]
            ]}
         />
      </React.Fragment >
   );
}

const KinhPhi = ({
   onAdd,
   onRemove,
   list = []
}) => {

   const sumTongTien = useCallback(() => {
      let res = 0;
      if (list && Array.isArray(list)) {
         list.map((item, i) => {
            if (item.kinhPhi && !isNaN(item.kinhPhi)) {
               res += parseInt(item.kinhPhi, 0);
            }
            return res;
         })
      }
      return {
         number: res,
         currency: main.convertNumberToCurrency(res)
      };
   }, [list])

   return <React.Fragment>
      <div className="col-md-12">
         <Table
            size="small"
            pagination={false}
            bordered
            dataSource={list.map((item, i) => { return { ...item, key: i } })}
            columns={[
               {
                  title: "STT",
                  width: 50,
                  align: "center",
                  render: (_, r, index) => (index + 1)
               },
               {
                  title: "Nội dung",
                  render: (_, r, index) => {
                     return <React.Fragment>
                        <Field
                           component={FieldInput}
                           name={`duToanKinhPhis[${index}].noiDung`}
                           placeholder="Nội dung"
                           checkValid={true}
                           validate={validate.VALIDATE_QTNVTT_KEHOACHTHANHTRA_KINHPHI_NOIDUNG_REQUIRED}
                        />
                     </React.Fragment>
                  }
               },
               {
                  title: "Kinh phí (VNĐ)",
                  render: (_, r, index) => {
                     return <React.Fragment>
                        <Field
                           component={FieldCurrency}
                           name={`duToanKinhPhis[${index}].kinhPhi`}
                           placeholder="Kinh phí"
                           checkValid={true}
                           validate={validate.VALIDATE_QTNVTT_KEHOACHTHANHTRA_KINHPHI_KINHPHI_REQUIRED}
                        />
                     </React.Fragment>
                  }
               },
               {
                  title: "Thao tác",
                  width: 80,
                  align: "center",
                  render: (_, r, index) => {
                     return <React.Fragment>
                        <Button onClick={() => onRemove(index)} className="ant-btn-dangerous">
                           <i className="fa fa-trash m-r-10" />Xóa
                        </Button>
                     </React.Fragment>
                  }
               }
            ]}
            title={() => {
               return <React.Fragment>
                  <Button type="primary" onClick={onAdd} >
                     <i className="fa fa-plus m-r-10" /> Thêm
                  </Button>
               </React.Fragment>
            }}
         />
         <Divider orientation="right">Tổng kinh phí: <b>{sumTongTien().currency} VNĐ</b></Divider>
      </div>
   </React.Fragment>
}
export default TabKinhPhi;