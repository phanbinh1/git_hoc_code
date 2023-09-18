import React, { useState } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import { CommonTable, CommonTableAction } from "./../../../common";
import * as actID from "./../../../../constants/action_id";

const DanhMucTieuChi_List = ({
   handleEdit,
   handleDelete,
   onSelectRow,
   dataLoading,
   pageKey,
   width
}) => {
   const [loading, setLoading] = useState(false);
   const [itemActive, setItemActive] = useState({});
   const listData = useSelector(state => state.app.quan_ly_danh_muc_danh_gia_hang_sao.danhmuctieuchi.list);
   const columns = [
      {
         title: "STT",
         dataIndex: "stt",
      },
      {
         title: "Nội dung",
         dataIndex: "noiDung",
         width: 150,
      },
      {
         title: "Mức độ đánh giá",
         dataIndex: "mucDoDanhGia",
         width: 200,
      },
      {
         title: "Thao tác",
         dataIndex: "actions",
         align: "center",
         width: 140,
         fixed: "right"
      }
   ]

   const changeSort = (e) => {
      if (e.target.value && (!isNaN(e.target.value) || e.target.value === "")) {
         setItemActive({ ...itemActive, sort: e.target.value });
      }
   }

   const keyDown = (e, item) => {
      if (e.keyCode === 13) {
         e.target.blur();
      }
   }

   const renderAction = (item) => {
      return <React.Fragment>
         <CommonTableAction
            actions={[
               {
                  idChucNang: actID.ACT_DANH_MUC_HANG_SAO.ACT_DELETE,
                  onClick: () => handleDelete(false, item.id),
                  confirm: true,
                  confirmLabel: "Bạn chắc chắn muốn xóa?",
                  type: "danger"
               },
               {
                  idChucNang: actID.ACT_DANH_MUC_HANG_SAO.ACT_UPDATE,
                  onClick: () => handleEdit(item.id),
                  type: "success"
               },
            ]}
         />
      </React.Fragment>
   };

   const data = _.orderBy(listData, ["sort"], ["asc"]).map((item, index) => {
      return {
         ...item,
         key: item.id,
         sort: <input
            className={`form-control input-sm input-sort-permission ${item.id === itemActive.id ? "active" : ""}`}
            required
            readOnly={!itemActive.id === item.id}
            value={item.id === itemActive.id ? itemActive.sort : item.sort}
            onChange={changeSort}
            onKeyDown={(e) => keyDown(e, item)}
         />,
         icon: <i className={`${item.icon}`} />,
         actions: renderAction(item)
      }
   });

   return (
      <React.Fragment>
         <CommonTable
            style={{ width: `calc(100 % - ${width}px)`, left: width }}
            wrapperClassName="wrapper-list"
            columns={columns}
            dataSource={data}
            loading={dataLoading || loading}
            bordered={true}
            isPagination={false}
            onSelectRow={onSelectRow}
            pageKey={pageKey}
         />
      </React.Fragment>
   );
}

export default DanhMucTieuChi_List;