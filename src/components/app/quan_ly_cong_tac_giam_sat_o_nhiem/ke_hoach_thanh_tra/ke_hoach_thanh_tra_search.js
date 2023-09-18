import React, { } from 'react';
import { CommonForm } from "./../../../common";
import * as constants from "./../../../../constants/constants";
import * as main from "./../../../../constants/main";
import * as formName from "./../../../../constants/form_name";
import moment from "moment";

const KeHoachThanhTraSearch = ({
   getAllRequest,
   handleStartLoadData,
   handleChangeDataSearch,
   dataSort,
   handleEndLoadData,
   onSelectRow,
   searchDefault,
   keHoachPhongs,
   dataSearch
}) => {
   const handleSubmit = (values) => {
      handleStartLoadData();
      var data = { ...searchDefault };
      if (values.soKeHoach && values.soKeHoach.trim() !== "") {
         data.soKeHoach = values.soKeHoach;
      }
      if (values.tenKeHoach && values.tenKeHoach.trim() !== "") {
         data.tenKeHoach = values.tenKeHoach;
      }
      if (values.ngayKy && values.ngayKy.trim() !== "") {
         data.ngayKy = values.ngayKy;
      }
      data.nam = dataSearch.nam || moment().year();
      handleChangeDataSearch(data);
      data = {
         searchData: main.parseObjectToParams({ ...data, phongBanPhoiHop: keHoachPhongs.toString(), keHoachPhong: keHoachPhongs.toString() }),
         sortData: main.parseStringDataSort(dataSort),
         currentPage: 1
      };
      getAllRequest({
         data,
         requestSuccess: () => {
            handleEndLoadData();
            onSelectRow();
         },
         requestError: handleEndLoadData
      });
   }
   return (
      <React.Fragment>
         <CommonForm
            data={[
               [//row 1
                  {
                     col: 12,
                     label: "Số kế hoạch",
                     placeholder: "Số kế hoạch",
                     name: "soKeHoach",
                  },
               ],
               [
                  {
                     col: 12,
                     label: "Tên kế hoạch",
                     placeholder: "Tên kế hoạch",
                     name: "tenKeHoach",
                  },
               ],
               [//row 3
                  {
                     col: 12,
                     label: "Ngày ký ",
                     placeholder: "Ngày ký",
                     name: "ngayKy",
                     fieldType: "date"
                  },
               ],
            ]}
            actions={[
               {
                  htmlType: constants.FORM_HTML_TYPE_SUBMIT,
                  label: "Tìm kiếm",
                  icon: "fa fa-search"
               }
            ]}
            onSubmit={handleSubmit}
            form={formName.FORM_NAME_QTNVTT_DOAN_THANH_TRA_SEARCH}
         />
      </React.Fragment >
   );
}

export default KeHoachThanhTraSearch;