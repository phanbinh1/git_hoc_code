import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CommonForm } from "./../../../common";
import * as actDanhMucTieuChi from "./../../../../actions/app/quan_ly_danh_muc_chi_tieu_danh_gia_sao/danhmuctieuchi";
import * as validate from "./../../../../constants/validate"

const PermissionForm = ({
   queryVariable,
   handleBack,
   width,
   getMenuRequest,
   setIsLoadingSkeleton,
}) => {
   const active_id_ = (queryVariable && queryVariable.active_id) ? parseInt(queryVariable.active_id, 0) : 0;
   const permission = useSelector(state => state.app.quan_ly_danh_muc_danh_gia_hang_sao.danhmuctieuchi.item);
   const dispatch = useDispatch();
   const createRequest = (object = {}) => dispatch(actDanhMucTieuChi.createRequest(object));
   const updateRequest = (object = {}) => dispatch(actDanhMucTieuChi.updateRequest(object));
   const handleGetOne = (idParent = 0) => dispatch(actDanhMucTieuChi.handleGetOne({ idParent }));

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

   const handleSubmit = (values) => {
      if (values.hasOwnProperty("id")) {
         let data = {
            ...values,
            stt: values.stt
         };
         updateRequest({
            data,
            requestSuccess: () => handleSubmitSuccess(data.idCha)
         });
      }
      else {
         let data = {
            ghiChu: "",
            mucDoDanhGia: values.mucDoDanhGia || null,
            noiDung: values.noiDung,
            stt: values.stt
         };
         data.idCha = (queryVariable && queryVariable.active_id) ? parseInt(queryVariable.active_id, 0) : 0;
         createRequest({
            data,
            requestSuccess: () => handleSubmitSuccess(data.idCha)
         });
      }
   };

   const handleSubmitSuccess = (idParent) => {
      getMenuRequest({
         requestSuccess: () => { setIsLoadingSkeleton(false) },
         requestError: () => { setIsLoadingSkeleton(false) }
      })
      handleGetOne(idParent);
      handleBack();
   }

   return (
      <React.Fragment>
         {active_id_ == 0 ? <CommonForm
            style={{ width: `calc(100% - ${width}px)`, left: width, position: "absolute" }}
            wrapperClassName="wrapper-form permission-form"
            data={[
               [
                  {
                     col: 6,
                     label: "Số chỉ mục",
                     placeholder: "Số chỉ mục",
                     name: "stt",
                     fieldType: "input",
                     checkValid: true,
                     validates: [validate.VALIDATE_DANH_MUC_TIEU_CHI]
                  },
                  {
                     col: 6,
                     label: "Nội dung",
                     placeholder: "Nội dung",
                     name: "noiDung",
                     fieldType: "input",
                  }
               ],
            ]}
            onSubmit={handleSubmit}
            form="FORM_NAME_DANH_MUC_TIEU_CHI"
            initialValues={permission}

         />
            :
            <CommonForm
               style={{ width: `calc(100% - ${width}px)`, left: width, position: "absolute" }}
               wrapperClassName="wrapper-form permission-form"
               data={[
                  [
                     {
                        col: 6,
                        label: "Số chỉ mục",
                        placeholder: "Số chỉ mục",
                        name: "stt",
                        fieldType: "input",
                        checkValid: true,
                        validates: [validate.VALIDATE_DANH_MUC_TIEU_CHI]
                     },
                     {
                        col: 6,
                        fieldType: "select",
                        label: "Mức độ đánh giá",
                        placeholder: "Mức độ đánh giá",
                        name: "mucDoDanhGia",
                        allowClear: false,
                        options: [
                           {
                              value: "A",
                              label: "A"
                           },
                           {
                              value: "B",
                              label: "B"
                           }
                        ],
                     }
                  ],
                  [
                     {
                        label: "Nội dung",
                        placeholder: "Nội dung",
                        name: "noiDung",
                        fieldType: "textarea",
                     }
                  ],
               ]}
               onSubmit={handleSubmit}
               form="FORM_NAME_DANH_MUC_TIEU_CHI"
               initialValues={permission}
            />
         }
      </React.Fragment>
   );
}
export default PermissionForm;