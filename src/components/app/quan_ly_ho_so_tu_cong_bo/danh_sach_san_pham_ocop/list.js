import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Tag, Rate } from 'antd';
import DanhSachOcopSearch from "./search";
import { CommonTable, CommonTableAction } from '../../../common';
import * as actID from "./../../../../constants/action_id";
import * as apiUrl from "./../../../../constants/api";
import * as main from "./../../../../constants/main";
import { useHistory, useLocation } from 'react-router-dom';
import { getAllowAction } from "./../../../../pages/app/quan_ly_ho_so_tu_cong_bo/ho_so_tu_cong_bo"

const List = ({
   pageKey,
   dataLoading,
   dataSort,
   onSelectRow,
   loaiCongBo,
   hideRowFake,
   scrollY,
   fixed = true,
   selectedRowKeys = undefined,
   onSelect,
   onSelectAll,
   search = true,
   rowClassName
}) => {
   const history = useHistory();
   const location = useLocation();
   const qs = main.queryString.parse(location.search);
   const state = useSelector(state => state);
   const san_pham_ocop_list = useSelector(state => state.app.quan_ly_ho_so_tu_cong_bo.danh_sach_san_pham_ocop.list);

   const columns = () => {
      let tenCoSoSort = "asc",
         diaDiemKinhDoanhSort = "asc";
      dataSort.map((item) => {
         if (item.key === "tenCoSo" && !item.value) { tenCoSoSort = "desc"; }
         if (item.key === "diaDiemKinhDoanh" && !item.value) { diaDiemKinhDoanhSort = "desc"; }
         return item;
      })
      return [
         {
            title: 'STT',
            dataIndex: 'stt'
         },
         {
            title: "Tên sản phẩm",
            width: 300,
            dataIndex: 'tenSanPham',
            _format: { fixed: "left" },
         },
         {
            title: "Tên cơ sở",
            width: 300,
            dataIndex: 'tenCoSo'
         },
         {
            title: "Địa chỉ cơ sở",
            width: 300,
            dataIndex: 'diaChiCoSo'
         },
         {
            title: "Đại diện cơ sở",
            width: 300,
            dataIndex: 'daiDienCoSo'
         },
         {
            title: "Điện thoại",
            width: 300,
            dataIndex: 'soDienThoai'
         },
         {
            title: "Giấy chứng nhận ATTP",
            width: 300,
            dataIndex: 'soGiayChungNhanVSATTP'
         },
         {
            title: "Ngày cấp",
            width: 300,
            dataIndex: 'ngayCapGiayChungNhanVSATTP'
         },
         {
            title: "Sản phẩm thêm từ",
            width: 200,
            render: (_, item) => {
               return item.type === "hoso" ? <div><Tag color="blue">Hồ sơ tự công bố</Tag></div> : <div><Tag color="green">Danh sách import</Tag></div>
            },
            align: "center"
         },
         {
            title: "Xếp hạng sao OCOP",
            width: 200,
            render: (_, item) => {
               return item.xepHangSao && <div><Rate disabled defaultValue={item.xepHangSao} /></div>
            },
            align: "center",
            disabled: false
         },
         {
            title: "Ghi chú",
            width: 300,
            dataIndex: 'ghiChu'
         },
      ];
   };

   const data = () => {
      let result = [];
      san_pham_ocop_list.map((item) => {
         return result.push({
            ...item,
            key: item.id,
            actions: renderAction(item),
            disabled: item.type == "import" ? false : true
         })
      });
      return result;
   }

   const renderAction = (item) => {
      const allow = getAllowAction(item)(state);
      return <React.Fragment>
         <CommonTableAction
         />
      </React.Fragment>
   };

   return <Fragment>
      <CommonTable
         hasSelectRow={true}
         firstLoad={false}
         rowClassName={rowClassName}
         selectedRowKeys={selectedRowKeys}
         columns={columns()}
         dataSource={data()}
         loading={dataLoading}
         bordered={true}
         onChange={({ currentPage, pageSize }) => history.push({ search: main.queryString.stringify({ ...qs, page: currentPage, page_size: pageSize }) })}
         pageKey={pageKey}
         onSelectRow={onSelectRow}
         controllerKey={main.encode(apiUrl.API_HO_SO_TU_CONG_BO)}
         hasRowFake={!hideRowFake}
         scrollY={scrollY}
         indexFixed={fixed}
         rowSelectionFixed={fixed}
         onSelect={onSelect}
         onSelectAll={onSelectAll}
         search={search ? {
            show: qs.action === actID.ACT_ID_DANH_SAN_PHAM_OCOP.ACT_SEARCH,
            component: <DanhSachOcopSearch loaiCongBo={loaiCongBo} />
         } : undefined}
      />
   </Fragment>
}
export default List;