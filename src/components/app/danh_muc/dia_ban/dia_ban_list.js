import React, { useState, } from 'react';
import { useSelector } from 'react-redux';
import { CommonTable, CommonTableAction } from "./../../../common";
import DiaBanListChild from "./dia_ban_list";
import * as apiUrl from "./../../../../constants/api";
import * as main from "./../../../../constants/main";
import * as constants from "./../../../../constants/constants";
import * as actID from "./../../../../constants/action_id";

const DiaBanList = ({ ...props }) => {

    const {
        parentSelected,
        defaultInitValue,
        level,
        pageKey,
        handleEdit,
        handleDelete,
        defaultExpandedRowKeys,
        setDefaultExpandedRowKeys,
        listIdParent,
        parentCode,
        getAllRequest,
        onSelectRow,
    } = props;

    const rows_selected = useSelector(state => state.core.rows_selected);

    const [data, setData] = useState([]);
    const [dataLoading, setDataLoading] = useState(false);

    const columns = () => {
        return [
            {
                title: 'STT',
                dataIndex: 'stt',
            },
            {
                title: 'Mã',
                dataIndex: 'ma',
                width: 80
            },
            {
                title: 'Tên',
                dataIndex: 'ten',
                width: 200
            },
            {
                title: 'Tên tiếng anh',
                dataIndex: 'tenTiengAnh',
                width: 200
            },
            {
                title: 'Cấp',
                dataIndex: 'cap',
                width: 200
            },
            {
                title: 'Thao tác',
                dataIndex: 'action',
                align: "center",
                width: 140
            }
        ];
    };

    const getData = () => {
        return data.map((item) => {
            return {
                ...item,
                key: item.id,
                expanded: renderExpanded(item),
                action: renderAction(item),
                disabled: parentSelected ? true : false
            };
        });
    };

    const getDefaultInitValue = () => {
        let result = defaultInitValue;
        if (level === 0) {
            delete result.tinhThanh;
            delete result.quanHuyen;
            delete result.dsQuanHuyen;
            delete result.xaPhuong;
            delete result.dsXaPhuong;
            result.dsCap = constants.CONST_DIA_BAN_CAP_1;
        }
        else if (level === 1) {
            delete result.quanHuyen;
            delete result.xaPhuong;
            delete result.dsXaPhuong;
            delete result.dsTo;
            delete result.to;
            result.dsCap = constants.CONST_DIA_BAN_CAP_2;
        }
        else if (level === 2) {
            delete result.to;
            result.dsCap = constants.CONST_DIA_BAN_CAP_3;
        }
        else if (level === 3) {
            delete result.to;
            result.dsCap = constants.CONST_DIA_BAN_CAP_4;
        }
        return result;
    };

    const renderAction = (item) => {
        return <React.Fragment>
            <CommonTableAction
                actions={[
                    {
                        idChucNang: actID.ACT_ID_DIA_BAN.ACT_DELETE,
                        confirm: true,
                        confirmLabel: "Bạn chắc chắn muốn xóa?",
                        type: "danger",
                        onClick: () => handleDelete(false, item.id)
                    },
                    {
                        idChucNang: actID.ACT_ID_DIA_BAN.ACT_UPDATE,
                        onClick: () => {
                            setDefaultExpandedRowKeys(listIdParent);
                            handleEdit(item.id, getDefaultInitValue());
                        },
                        type: "success"
                    }
                ]}
            />
        </React.Fragment>
    };

    const setDefaultInitValue = (item) => {
        let result = defaultInitValue;
        if (level === 0) {
            result.tinhThanh = item.ma;
        }
        else if (level === 1) {
            result.quanHuyen = item.ma;
            result.dsQuanHuyen = data;
        }
        else if (level === 2) {
            result.xaPhuong = item.ma;
            result.dsXaPhuong = data;
        }
        else if (level === 3) {
            result.to = item.ma;
            result.dsTo = data;
        }
        return { ...result };
    };

    const renderExpanded = (item) => {
        return <DiaBanListChild
            {...props}
            parentSelected={checkItemSelected(item)}
            level={level + 1}
            key={`${item.ma}_expand`}
            parentCode={item.ma}
            parentId={item.id}
            parentItem={item}
            defaultInitValue={setDefaultInitValue(item)}
            listIdParent={[...listIdParent, item.id]}
        />;
    };

    const checkItemSelected = (item) => {
        return main.getItemSelected(rows_selected, `${pageKey}_${parentCode}`).indexOf(item.id) !== -1;
    };

    const handleGetAllRequest = () => {
        setDataLoading(true);
        getAllRequest({
            data: { parentCode },
            pageKey: `${pageKey}_${parentCode}`,
            requestSuccess: (res) => {
                if (res && res.status && res.result && Array.isArray(res.result)) {
                    setData(res.result);
                }
                setDataLoading(false);
            },
            requestError: () => {
                setDataLoading(false);
            }
        })
    };

    return (
        <React.Fragment>
            <CommonTable
                key={parentCode}
                wrapperClassName={parentCode === "0" ? "wrapper-list" : "dia-ban-children-wrapper-list"}
                columns={columns()}
                loading={dataLoading}
                dataSource={getData()}
                bordered={true}
                isPagination={false}
                onChange={handleGetAllRequest}
                pageKey={`${pageKey}_${parentCode}`}
                onSelectRow={(rows) => { onSelectRow(rows, `${pageKey}_${parentCode}`) }}
                controllerKey={main.encode(apiUrl.API_LOCALITY_GET_CHILDREN(parentCode))}
                expanded={level < 3}
                scrollY={parentCode === "0" ? true : false}
                countLabelExtend={constants.CONST_DIA_BAN_LABEL[level]}
                defaultExpandedRowKeys={defaultExpandedRowKeys}
                hasRowFake={parentCode === "0" ? true : false}
            />
        </React.Fragment >
    );
}
export default DiaBanList;