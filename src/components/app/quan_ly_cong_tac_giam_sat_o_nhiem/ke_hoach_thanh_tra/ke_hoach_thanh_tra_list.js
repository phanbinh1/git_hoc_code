import React, { Fragment, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tag, Modal, Drawer, Alert } from "antd";
import { dateFormat, FieldDate, FieldInput } from "./../../../../constants/controll";
import {
   VALIDATE_BAN_HANH_SO_KE_HOACH_REQUIRED,
   VALIDATE_BAN_HANH_NGUOI_KY_REQUIRED,
   VALIDATE_BAN_HANH_NGAY_KY_REQUIRED
} from "./../../../../constants/validate"
import KeHoachThanhTraSearch from "./ke_hoach_thanh_tra_search";
import { CommonBanHanh, CommonPheDuyet, CommonTable, CommonTableAction } from "./../../../common";
import moment from "moment";
import { CONST_PHE_DUYET, CONST_BIEUMAU_TYPE, CONST_ATTACH_TYPE } from "./../../../../constants/constants";
import * as actID from "./../../../../constants/action_id";
import * as apiUrl from "./../../../../constants/api";
import * as main from "./../../../../constants/main";
import * as url from "./../../../../constants/url";
import * as actKeHoachThanhTra from "./../../../../actions/app/quan_ly_cong_tac_giam_sat_o_nhiem/ke_hoach_kiem_tra/ke_hoach_kiem_tra";
import * as actHistoryDownload from "./../../../../actions/core/history_download";
import { Link, useHistory } from 'react-router-dom';
import { QuyetDinhBienBan } from '../common';
import { Markup } from "interweave";
import ModalPhongBan from '../../danh_muc/quan_ly_phong_ban/modal/modal_phong_ban';
import ListDotThanhTra from './list_dot_thanh_tra';
import ListFilter from './list_filter';

const KeHoachThanhTraList = ({
   pageKey,
   dataLoading,
   dataSort,
   handleChangeDataSort,
   handleChangeDataSearch,
   handleEdit,
   handleDelete,
   getAllRequest,
   handleEndLoadData,
   handleStartLoadData,
   dataSearch,
   onSelectRow,
   keHoachPhongs,
   isVisiableSearch,
   searchDefault
}) => {
   const history = useHistory();

   const ke_hoach_thanh_tra_list = useSelector(state => state.app.quan_ly_cong_tac_giam_sat_o_nhiem.ke_hoach_kiem_tra.list);
   const [expandedRowKeys, onExpandedRowsChange] = useState([]);
   const [visibleQDBB, setVisibleQDBB] = useState(false);
   const [visibleBanHanh, setVisibleBanHanh] = useState(false);
   const [visiblePheDuyet, setVisiblePheDuyet] = useState(false);
   const [itemActive, setItemActive] = useState(null);
   const [visiblePhongBanPhoiHop, setVisiblePhongBanPhoiHop] = useState(false);
   const account_current = useSelector(state => state.core.account_current);
   const permission_priviliged = useSelector(state => state.core.permission.priviliged);
   const allowBanHanh = permission_priviliged.findIndex(item => item.idChucNang === actID.ACT_ID_O_NHIEM_KIEM_TRA_GIAM_SAT.ACT_VIEW_BAN_HANH) >= 0;

   const { DANGHOANTHIEN, CHOPHEDUYET, DAPHEDUYET, KHONGPHEDUYET } = CONST_PHE_DUYET;
   const { KEHOACHTHANHKIEMTRA } = CONST_BIEUMAU_TYPE;

   const dispatch = useDispatch();
   const banHanhRequest = (object = {}) => dispatch(actKeHoachThanhTra.banHanhRequest(object));
   const createHistoryDownload = (value) => dispatch(actHistoryDownload.handleCreate(value));
   const pheDuyetRequest = (object = {}) => dispatch(actKeHoachThanhTra.pheDuyetRequest(object));
   const updateRequest = (object = {}) => dispatch(actKeHoachThanhTra.updateRequest(object));

   const onDownload = (id) => {
      const item = {
         date: moment(new Date().toISOString()).format(`${dateFormat} hh:mm:ss`),
         title: "Kế hoạch thanh kiểm tra",
         url: apiUrl.API_QTNVTT_KE_HOACH_THANH_TRA_DOWNLOAD(id)
      }
      createHistoryDownload({
         username: account_current.name,
         process: item
      })
   }

   const onChangeDataSort = (key) => {
      let dataSortChange = [];
      let sortMax = Math.max.apply(Math, dataSort.map((val) => { return val.sort; }));
      dataSort.map((item) => {
         if (item.key === key) {
            item.value = !item.value;
            item.sort = sortMax === item.sort ? sortMax : sortMax + 1;
         }
         return dataSortChange.push(item);
      })
      handleGetAllRequest({}, {
         dataSort: main.parseStringDataSort(dataSortChange),
         requestSuccess: () => { handleChangeDataSort(dataSortChange) }
      });
   }
   const columns = () => {
      let tenKeHoachSort = "asc",
         namSort = "asc",
         soKeHoachSort = "asc",
         ngayKySort = "asc",
         trangThaiDuyetSort = "asc";
      dataSort.map((item) => {
         if (item.key === "tenKeHoach" && !item.value) { tenKeHoachSort = "desc"; }
         if (item.key === "nam" && !item.value) { namSort = "desc"; }
         if (item.key === "soKeHoach" && !item.value) { soKeHoachSort = "desc"; }
         if (item.key === "ngayKy" && !item.value) { ngayKySort = "desc"; }
         if (item.key === "trangThaiDuyet" && !item.value) { trangThaiDuyetSort = "desc"; }
         return item;
      })
      return [
         {
            title: 'STT',
            dataIndex: 'stt',
         },
         {
            title: <div onClick={() => onChangeDataSort("nam")} >
               <span> Năm </span>
               <i className={`fa fa-sort-amount-${namSort}`} />
            </div >,
            dataIndex: 'nam',
            align: "center",
            width: 70,
         },
         {
            title: <div onClick={() => onChangeDataSort("tenKeHoach")} >
               <span> Tên kế hoạch </span>
               <i className={`fa fa-sort-amount-${tenKeHoachSort}`} />
            </div >,
            width: 400,
            dataIndex: "tkh",
            render: (_, record) => {
               return <Link
                  to={{
                     pathname: url.URL_QTNVTT_O_NHIEM_GIAM_SAT_DETAIL,
                     search: main.queryString.stringify({ id: record.id })
                  }}>
                  <Markup tagName="span" content={record.tenKeHoach} />
               </Link>
            }
         },
         {
            title: <div onClick={() => onChangeDataSort("trangThaiDuyet")} >
               <span> Trạng thái </span>
               <i className={`fa fa-sort-amount-${trangThaiDuyetSort}`} />
            </div >,
            dataIndex: 'trangThai',
            align: "center",
            width: 160,
         },
         {
            title: <div onClick={() => onChangeDataSort("soKeHoach")} >
               <span> Số kế hoạch </span>
               <i className={`fa fa-sort-amount-${soKeHoachSort}`} />
            </div >,
            dataIndex: 'soKeHoach',
            width: 130
         },
         {
            title: <div onClick={() => onChangeDataSort("ngayKy")} >
               <span> Ngày ký </span>
               <i className={`fa fa-sort-amount-${ngayKySort}`} />
            </div >,
            dataIndex: 'ngayKy',
            align: "center",
            width: 120
         },
         {
            dataIndex: 'actions',
            width: 140,
            align: "center",
            fixed: "right"
         }
      ];
   }

   const data = useCallback(() => {
      let result = [];
      ke_hoach_thanh_tra_list.map((item) => {
         return result.push({
            ...item,
            key: item.id,
            trangThai: renderTrangThai(item),
            actions: renderAction(item),
            disabled: item.trangThaiDuyet === DAPHEDUYET,
            // expanded: <ListDotThanhTra idKeHoachThanhTra={item.id} keHoachPhongs={keHoachPhongs} key={item.id} />
         })
      });
      return result;
   }, [ke_hoach_thanh_tra_list]);

   const renderTrangThai = (item) => {
      const trangThai = CONST_PHE_DUYET.thanhTraOptions.find(val => val.value === item.trangThaiDuyet);
      return trangThai ? <Tag color={trangThai.color} key={trangThai.value}>
         {trangThai.label.toUpperCase()}
      </Tag> : "";
   }

   const renderAction = (item) => {
      return <Fragment>
         <CommonTableAction
            actions={[
               {
                  idChucNang: actID.ACT_ID_O_NHIEM_KIEM_TRA_GIAM_SAT.ACT_DELETE,
                  confirm: true,
                  confirmLabel: "Bạn chắc chắn muốn xóa?",
                  onClick: () => handleDelete(false, item.id),
                  hidden: item.trangThaiDuyet === DAPHEDUYET || item.trangThaiDuyet === KHONGPHEDUYET,
                  type: "danger"
               },
               {
                  idChucNang: actID.ACT_ID_O_NHIEM_KIEM_TRA_GIAM_SAT.ACT_UPDATE,
                  hidden: item.trangThaiDuyet === DAPHEDUYET || item.trangThaiDuyet === KHONGPHEDUYET,
                  onClick: () => handleEdit(item.id)
               },
               {
                  idChucNang: actID.ACT_ID_O_NHIEM_KIEM_TRA_GIAM_SAT.ACT_CREATE_CUOC_THANH_TRA,
                  hidden: true,
                  onClick: () => {
                     history.push(main.formatUrl({
                        pathname: url.URL_QTNVTT_CUOC_THANH_TRA_KE_HOACH,
                        objSearch: {
                           action: actID.ACT_ID_QTNVTT_CUOC_THANH_TRA.ACT_CREATE,
                           idKeHoachThanhTra: item.id
                        }
                     }))
                  }
               },
               {
                  idChucNang: actID.ACT_ID_O_NHIEM_KIEM_TRA_GIAM_SAT.ACT_LIST_CUOC_THANH_TRA,
                  hidden: true,
                  onClick: () => {
                     history.push(main.formatUrl({
                        pathname: url.URL_QTNVTT_CUOC_THANH_TRA_KE_HOACH,
                        objSearch: {
                           action: actID.ACT_ID_QTNVTT_CUOC_THANH_TRA.ACT_LIST,
                           idKeHoachThanhTra: item.id
                        }
                     }))
                  }
               },
               {
                  idChucNang: actID.ACT_ID_O_NHIEM_KIEM_TRA_GIAM_SAT.ACT_TRINHPHEDUYET,
                  hidden: item.trangThaiDuyet !== DANGHOANTHIEN,
                  onClick: () => {
                     Modal.confirm({
                        title: "Xác nhận",
                        content: "Bạn chắc chắn muốn trình phê duyệt?",
                        okText: <Fragment><i className="fa fa-check m-r-10" />Xác nhận</Fragment>,
                        cancelText: <Fragment><i className="fa fa-times m-r-10" />Hủy</Fragment>,
                        onOk: () => {
                           pheDuyetRequest({
                              data: {
                                 ids: [item.id],
                                 trangThaiDuyet: CHOPHEDUYET,
                                 item: { ...item, trangThaiDuyet: CHOPHEDUYET, },
                                 msgSuccess: "Đã trình phê duyệt!",
                                 msgError: "Trình phê duyệt thất bại!",
                              },
                           });
                        }
                     })
                  }
               },
               {
                  idChucNang: actID.ACT_ID_O_NHIEM_KIEM_TRA_GIAM_SAT.ACT_PHE_DUYET,
                  hidden: item.trangThaiDuyet !== CHOPHEDUYET,
                  onClick: () => {
                     setItemActive(item);
                     setVisiblePheDuyet(true);
                  }
               },
               {
                  idChucNang: actID.ACT_ID_O_NHIEM_KIEM_TRA_GIAM_SAT.ACT_DOWNLOAD,
                  hidden: true,
                  onClick: () => {
                     onDownload(item.id);
                  }
               },
               {
                  label: "Quyết định/Biên bản/Biểu mẫu khác",
                  icon: "fa fa-file-text-o",
                  onClick: () => {
                     setItemActive(item);
                     setVisibleQDBB(true);
                  }
               },
               {
                  label: "Phối hợp thực hiện",
                  icon: "fa fa-share-alt",
                  hidden: account_current.name !== item.nguoiTao || item.trangThaiDuyet !== DAPHEDUYET,
                  onClick: () => {
                     setItemActive(item);
                     setVisiblePhongBanPhoiHop(true);
                  }
               },
               {
                  hidden: !allowBanHanh && item.trangThaiDuyet !== DAPHEDUYET,
                  label: "Ban hành",
                  icon: "fa fa-pencil-square-o",
                  onClick: () => {
                     setItemActive(item);
                     setVisibleBanHanh(true);
                  }
               },
            ]}
         />
      </Fragment>
   };

   const handleGetAllRequest = (pagination = {}, data = {}) => {
      handleStartLoadData();
      let requestSuccess = handleEndLoadData;
      const requestError = handleEndLoadData;
      data = { dataSort: main.parseStringDataSort(dataSort), ...data };
      var dataSortStr = "";
      if (data.hasOwnProperty("dataSort") && typeof data.dataSort === "string") {
         dataSortStr = data.dataSort;
      }
      if (data.hasOwnProperty("requestSuccess") && typeof data.requestSuccess === "function") {
         requestSuccess = () => {
            data.requestSuccess();
            handleEndLoadData();
         }
      }
      var value = {
         ...pagination,
         searchData: main.parseObjectToParams({
            ...dataSearch,
            phongBanPhoiHop: keHoachPhongs.toString(),
            keHoachPhong: keHoachPhongs.toString()
         }),
         sortData: dataSortStr
      };
      getAllRequest({
         data: value,
         requestSuccess,
         requestError
      });

   }

   const onPheDuyet = () => {
      const diaBanKeHoachGiamSats = itemActive && itemActive.diaBanKeHoachGiamSats ? itemActive.diaBanKeHoachGiamSats : [];
      // const loaiHinhCoSoKeHoachThanhKiemTras = itemActive && itemActive.loaiHinhCoSoKeHoachThanhKiemTras ? itemActive.loaiHinhCoSoKeHoachThanhKiemTras : [];
      // const canhBaoChuaCoPhamVi = diaBanKeHoachGiamSats.length === 0 && loaiHinhCoSoKeHoachThanhKiemTras.length === 0;
      const canhBaoChuaCoPhamVi = diaBanKeHoachGiamSats.length === 0;
      if (canhBaoChuaCoPhamVi) {
         Modal.confirm({
            width: 500,
            title: "Cảnh báo!",
            content: <Fragment>
               <Alert
                  showIcon
                  type="error"
                  icon={<i className="fa fa-exclamation-circle " />}
                  className="m-b-10"
                  description={<Fragment>
                     {
                        canhBaoChuaCoPhamVi &&
                        <p> - Chưa chọn phạm vi giám sát cho kế hoạch này!</p>
                     }
                  </Fragment>}
               />
            </Fragment>,
            okText: <Fragment><i className="fa fa-check m-r-10" />Tiếp tục</Fragment>,
            cancelText: <Fragment><i className="fa fa-times m-r-10" />Hủy</Fragment>,
            onOk: () => {
               pheDuyetRequest({
                  data: {
                     ids: [itemActive.id],
                     trangThaiDuyet: DAPHEDUYET,
                     item: { ...itemActive, trangThaiDuyet: DAPHEDUYET, },
                     msgSuccess: "Phê duyệt thành công!",
                     msgError: "Phê duyệt thất bại!"
                  },
                  requestSuccess: () => setVisiblePheDuyet(false)
               });
            },
            okType: "primary"
         })
      }
      else {
         pheDuyetRequest({
            data: {
               ids: [itemActive.id],
               trangThaiDuyet: DAPHEDUYET,
               item: { ...itemActive, trangThaiDuyet: DAPHEDUYET, },
               msgSuccess: "Phê duyệt thành công!",
               msgError: "Phê duyệt thất bại!"
            },
            requestSuccess: () => setVisiblePheDuyet(false)
         });
      }
   }

   return (
      <Fragment>
         <ModalPhongBan
            visible={visiblePhongBanPhoiHop}
            onCancel={() => setVisiblePhongBanPhoiHop(false)}
            selected={itemActive && itemActive.phongBanPhoiHop ? itemActive.phongBanPhoiHop.split(",").map(ma => ({ ma })) : []}
            rowKey="ma"
            disabled={[...(itemActive && itemActive.keHoachPhong ? [{ ma: itemActive.keHoachPhong }] : []), ...(itemActive && itemActive.phongBanPhoiHop ? itemActive.phongBanPhoiHop.split(",").map(ma => ({ ma })) : [])]}
            onOk={(phongBans, callback) => {
               updateRequest({
                  data: {
                     ...itemActive,
                     phongBanPhoiHop: phongBans.map(item => item.ma).toString()
                  },
                  requestSuccess: () => {
                     setVisiblePhongBanPhoiHop(false);
                     callback();
                  },
                  requestError: () => {
                     callback();
                  }
               })
            }}
         />
         <Drawer
            width={800}
            visible={visibleQDBB}
            onClose={() => setVisibleQDBB(false)}
            title={<Fragment><i className="fa fa-file-text-o m-r-10" />Quyết định/ Biên bản</Fragment>}
            destroyOnClose
         >
            {
               itemActive && <QuyetDinhBienBan
                  entityId={itemActive.id}
                  bieuMauType={CONST_ATTACH_TYPE.KEHOACHGIAMSATONHIEM}
                  attachEntityType={CONST_ATTACH_TYPE.KEHOACHGIAMSATONHIEM}
                  allowTrinhKy={itemActive && itemActive.trangThaiDuyet === DANGHOANTHIEN}
                  showVanBanTrinhKy
               />
            }
         </Drawer>
         <CommonPheDuyet
            visible={visiblePheDuyet}
            onCancel={() => setVisiblePheDuyet(false)}
            onConfirm={onPheDuyet}
            onNotConfirm={({ lyDo }) => {
               pheDuyetRequest({
                  data: {
                     ids: [itemActive.id],
                     trangThaiDuyet: KHONGPHEDUYET,
                     lyDoKhongPheDuyet: lyDo,
                     item: {
                        ...itemActive,
                        lyDoKhongPheDuyet: lyDo,
                        trangThaiDuyet: KHONGPHEDUYET,
                     },
                     msgSuccess: "Phê duyệt thành công!",
                     msgError: "Phê duyệt thất bại!"
                  },
                  requestSuccess: () => setVisiblePheDuyet(false)
               });
            }}
         />
         <CommonBanHanh
            key={itemActive ? itemActive.id : -1}
            visible={visibleBanHanh}
            onCancel={() => setVisibleBanHanh(false)}
            onBanHanh={banHanhRequest}
            initialValues={itemActive ? {
               trangThaiDuyet: itemActive.trangThaiDuyet,
               soQuyetDinh: itemActive.soQuyetDinh,
               soKeHoach: itemActive.soKeHoach,
               nguoiLapKeHoach: itemActive.nguoiLapKeHoach,
               nguoiKy: itemActive.nguoiKy,
               ngayKy: itemActive.ngayKy,
               id: itemActive.id
            } : {}}
            trangThaiName="trangThaiDuyet"
            permission={actID.ACT_ID_O_NHIEM_KIEM_TRA_GIAM_SAT.ACT_BAN_HANH}
            fields={[
               {
                  label: "Số kế hoạch",
                  placeholder: "Số kế hoạch",
                  name: "soKeHoach",
                  component: FieldInput,
                  checkValid: true,
                  validate: [VALIDATE_BAN_HANH_SO_KE_HOACH_REQUIRED]
               },
               {
                  label: "Người ký",
                  placeholder: "Người ký",
                  name: "nguoiKy",
                  component: FieldInput,
                  checkValid: true,
                  validate: [VALIDATE_BAN_HANH_NGUOI_KY_REQUIRED]
               },
               {
                  label: "Ngày ký",
                  placeholder: "Ngày ký",
                  name: "ngayKy",
                  component: FieldDate,
                  checkValid: true,
                  validate: [VALIDATE_BAN_HANH_NGAY_KY_REQUIRED]
               },
            ]}
         />
         <CommonTable
            firstLoad={false}
            // expandedRowKeys={expandedRowKeys}
            onExpandedRowsChange={rowKeys => onExpandedRowsChange(rowKeys && Array.isArray(rowKeys) ? rowKeys : [])}
            filter={<ListFilter
               getAllRequest={getAllRequest}
               onSelectRow={onSelectRow}
               dataSearch={dataSearch}
               dataSort={dataSort}
               handleChangeDataSearch={handleChangeDataSearch}
               keHoachPhongs={keHoachPhongs}
               handleStartLoadData={handleStartLoadData}
               handleEndLoadData={handleEndLoadData}
            />}
            // expanded
            columns={columns()}
            dataSource={data()}
            loading={dataLoading}
            bordered={true}
            onChange={handleGetAllRequest}
            pageKey={pageKey}
            onSelectRow={onSelectRow}
            controllerKey={main.encode(apiUrl.API_QTNVTT_KE_HOACH_THANH_TRA)}
            search={{
               show: isVisiableSearch,
               component: <KeHoachThanhTraSearch {...{
                  getAllRequest,
                  handleStartLoadData,
                  handleChangeDataSearch,
                  dataSort,
                  handleEndLoadData,
                  onSelectRow,
                  searchDefault,
                  keHoachPhongs,
                  dataSearch
               }}
               />
            }}
         />
      </Fragment >
   );
}

export default KeHoachThanhTraList;