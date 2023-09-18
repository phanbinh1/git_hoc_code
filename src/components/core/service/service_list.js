import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CommonTable, CommonTableAction } from "./../../common";
import * as apiUrl from "./../../../constants/api";
import * as actID from "./../../../constants/action_id";
import * as main from "./../../../constants/main";

const ServiceList = ({ ...props }) => {

    const {
        getAllRequest,
        isVisiableSearch,
        handleEdit,
        handleDelete,
        handleEndLoadData,
        handleStartLoadData,
        dataSearch,
        dataLoading,
        pageKey,
        onSelectRow
    } = props;

    const service_list = useSelector(state => state.core.service.list);

    useEffect(() => {
        handleGetAllRequest();
    }, [isVisiableSearch]);

    const columns = () => {
        return [
            {
                title: 'STT',
                dataIndex: 'stt'
            },
            {
                title: 'CLIENT ID',
                dataIndex: 'clientId',
                width: 100
            },
            {
                title: 'AUTHORIZED GRANT TYPES',
                dataIndex: 'authorizedGrantTypes',
                width: 150
            },
            {
                title: 'SCOPE',
                dataIndex: 'scope',
                width: 100
            },
            {
                title: 'AUUTOAPPROVE',
                dataIndex: 'autoApprove',
                width: 120
            },
            {
                title: 'ACCESS TOKEN VALIDITY',
                dataIndex: 'accessTokenValidity',
                width: 200
            },
            {
                title: 'REFRESH TOKEN VALIDITY',
                dataIndex: 'refreshTokenValidity',
                width: 200
            },
            {
                title: 'THAO TÁC',
                dataIndex: 'actions',
                align: "center",
                width: 140,
                fixed: "right"
            }
        ];
    };

    const data = () => {
        let result = [];
        service_list.map((item, index) => {
            return result.push({
                ...item,
                key: index,
                stt: index + 1,
                actions: renderAction(item)
            })
        });
        return result;
    };

    const renderAction = (service) => {
        return <React.Fragment>
            <CommonTableAction
                actions={[
                    {
                        idChucNang: actID.ACT_ID_SERVICE.ACT_DELETE,
                        confirm: true,
                        confirmLabel: "Bạn chắc chắn muốn xóa?",
                        onClick: () => handleDelete(false, service.clientId),
                        type: "danger"
                    },
                    {
                        idChucNang: actID.ACT_ID_SERVICE.ACT_UPDATE,
                        onClick: () => handleEdit(service.clientId),
                        type: "success"
                    }
                ]}
            />
        </React.Fragment>
    };

    const handleGetAllRequest = (value = {}) => {
        handleStartLoadData();
        value = { ...value, ...dataSearch };
        getAllRequest({
            data: value,
            requestSuccess: handleEndLoadData,
            requestError: handleEndLoadData
        });
    }

    return (
        <React.Fragment>
            <CommonTable
                columns={columns()}
                dataSource={data()}
                loading={dataLoading}
                bordered={true}
                isPagination={false}
                onChange={handleGetAllRequest}
                pageKey={pageKey}
                onSelectRow={onSelectRow}
                controllerKey={main.encode(apiUrl.API_SERVICE)}
            />
        </React.Fragment >
    );
}

export default ServiceList;