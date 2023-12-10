import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DiaBanComponent from "./../../../../components/app/danh_muc/dia_ban/dia_ban";
import * as act from "./../../../../actions/index";
import * as actDiaBan from "./../../../../actions/app/danh_muc/dia_ban/dia_ban";
import * as actSyncProcess from "./../../../../actions/core/sync_process";
import * as pageKeys from "./../../../../constants/page_key";
import * as main from "./../../../../constants/main";

const DiaBan = ({ ...props }) => {
  const rows_selected = useSelector((state) => state.core.rows_selected);

  const [pageKey] = useState(pageKeys.PAGE_KEY_DIA_BAN);
  const [isVisiableForm, setIsVisiableForm] = useState(false);
  const [isVisiableList, setIsVisiableList] = useState(true);
  const [dataLoading, setDataLoading] = useState(true);

  const dispatch = useDispatch();
  const onSelectRow = (rows = [], pageKey) => {
    dispatch(act.selectRow(rows, pageKey));
  };
  const createSyncProcess = (job = {}) => {
    dispatch(actSyncProcess.createSyncProcess(job));
    //them du lieu vao dev_1
    //them du lieu vao dev_1 .
  };
  const deleteRequest = (object = {}) => {
    dispatch(actDiaBan.deleteRequest(object));
  };
  const handleGetOne = (object = {}) => {
    dispatch(actDiaBan.handleGetOne(object));
  };
  const getOneRequest = (object = {}) => {
    dispatch(actDiaBan.getOneRequest(object));
  };

  useEffect(() => {
    onSelectRow([], `${pageKey}_0`);
  }, []);

  const handleCreate = (param = {}) => {
    handleGetOne(param);
    setIsVisiableForm(true);
    setIsVisiableList(false);
  };

  const handleEdit = (id, defaultInitValue = {}) => {
    handleStartLoadData();
    getOneRequest({
      data: { id, defaultInitValue },
      requestSuccess: () => {
        setIsVisiableForm(true);
        setIsVisiableList(false);
        handleEndLoadData();
      },
      requestError: () => {
        handleEndLoadData();
      },
    });
  };

  const handleBack = () => {
    setIsVisiableForm(false);
    setIsVisiableList(true);
    handleEndLoadData();
  };

  const handleDelete = (delteAll = true, id) => {
    let dia_ban_delete = [];
    if (delteAll) {
      dia_ban_delete = main.getItemSelected(rows_selected, pageKey);
    } else {
      dia_ban_delete = [id];
    }
    deleteRequest({
      data: dia_ban_delete,
      requestSuccess: handleDeleteSuccess,
    });
  };

  const handleSync = () => {
    createSyncProcess({
      jobCode: "dongbodiaban",
      show: true,
    });
  };

  const handleStartLoadData = () => {
    setDataLoading(true);
  };

  const handleEndLoadData = () => {
    setDataLoading(false);
  };

  const handleDeleteSuccess = () => {
    onSelectRow([]);
  };

  return (
    <React.Fragment>
      <DiaBanComponent
        {...props}
        isVisiableForm={isVisiableForm}
        isVisiableList={isVisiableList}
        dataLoading={dataLoading}
        pageKey={pageKey}
        onSelectRow={onSelectRow}
        handleStartLoadData={handleStartLoadData}
        handleEndLoadData={handleEndLoadData}
        handleEdit={handleEdit}
        handleBack={handleBack}
        handleSync={handleSync}
        handleDelete={handleDelete}
        handleCreate={handleCreate}
      />
    </React.Fragment>
  );
  //qqqqqqqqqqqqqqqqqqqqq
};

export default DiaBan;
