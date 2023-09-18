import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DanhMucTieuChiMenu from "./danhmuctieuchi_menu";
import DanhMucTieuChiList from "./danhmuctieuchi_list";
import DanhMucTieuChiForm from "./danhmuctieuchi_form";
import * as act from "./../../../../actions/index";
import * as actID from "./../../../../constants/action_id";
import * as constants from "./../../../../constants/constants";
import * as main from "./../../../../constants/main";

const DanhMucTieuChi = (props) => {
   const {
      isVisiableList,
      isVisiableForm,
      pageKey,
      handleCreate,
      handleDelete,
      handleBack,
      queryVariable,
   } = props;

   const [width, setWidth] = useState(300);
   const rows_selected = useSelector(state => state.core.rows_selected);
   const selected = main.getItemSelected(rows_selected, pageKey);
   const dispatch = useDispatch();
   const setAction = (arrAction = []) => dispatch(act.setAction(arrAction));

   useEffect(() => {
      let arrAction = [];
      arrAction.push(renderActionBack());
      arrAction.push(renderActionDelete());
      arrAction.push(renderActionCreate());
      arrAction.push(renderActionUpdate());
      setAction(arrAction);
   }, [
      isVisiableList,
      main.getItemSelected(rows_selected, pageKey),
   ])

   const onResize = (e, { size }) => {
      setWidth(size.width);
   }

   const renderActionUpdate = () => {
      let result = {};
      result.key = actID.ACT_DANH_MUC_HANG_SAO.ACT_UPDATE;
      result.disabled = false;
      result.hidden = isVisiableList ? false : true;
      result.type = constants.CONST_TYPE_BTN_EDIT;
      return result;
   }

   const renderActionCreate = () => {
      let result = {};
      result.key = actID.ACT_DANH_MUC_HANG_SAO.ACT_CREATE;
      result.disabled = false;
      result.hidden = isVisiableList ? false : true;
      result.handleClick = handleCreate;
      result.type = constants.CONST_TYPE_BTN_CREATE;
      return result;
   };

   const renderActionDelete = () => {
      let result = {};
      result.key = actID.ACT_DANH_MUC_HANG_SAO.ACT_DELETE;
      result.disabled = selected.length > 0 ? false : true;
      result.hidden = isVisiableList ? false : true;
      result.handleClick = handleDelete;
      result.type = constants.CONST_TYPE_BTN_DELETE;
      result.isConfirm = true;
      result.confirmTitle = "Bạn chắc chắn muốn xóa"
      result.confirmOkText = "Đồng ý"
      result.confirmOkType = "danger"
      result.confirmCancelText = "Hủy"
      result.text = `Xóa ${selected.length > 0 ? `(${selected.length})` : ""}`;
      return result;
   };

   const renderActionBack = () => {
      var result = {};
      result.key = actID.ACT_BACK;
      result.disabled = false;
      result.hidden = !isVisiableList ? false : true;
      result.handleClick = handleBack;
      result.type = constants.CONST_TYPE_BTN_BACK;
      return result;
   };
   return (
      <React.Fragment>
         <DanhMucTieuChiMenu {...props} width={width} setWidth={setWidth} onResize={onResize} />
         {isVisiableList && <DanhMucTieuChiList {...props} width={width} />}
         {isVisiableForm && <DanhMucTieuChiForm
            key={queryVariable.id ? queryVariable.id : "create"}
            {...props}
            width={width}
         />}
      </React.Fragment>
   );
}
export default DanhMucTieuChi;