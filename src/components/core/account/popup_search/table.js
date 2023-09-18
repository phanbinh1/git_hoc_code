import React, { Fragment } from "react";
import { Table as AntTable } from "antd";
import * as constants from "./../../../../constants/constants";

const Table = ({
    selected,
    setSelected,
    rowKey,
    maxItemSelect,
    setVisiblePopover,
    timeout,
    changeTimeout,

    dataSource = [],

    pagination
}) => {
    return <Fragment>
        <AntTable
            rowSelection={{
                align: "center",
                columnWidth: 30,
                selectedRowKeys: selected.map(item => item[rowKey]),
                onChange: (_, selectedRows) => {
                    const newSelectedRows = [
                        ...selectedRows,
                        ...selected.filter(item => !dataSource.find(v => v[rowKey] === item[rowKey]))
                    ];
                    if (typeof maxItemSelect === "number") {
                        const _selectedRows = newSelectedRows.filter((item, i) => maxItemSelect ? i < maxItemSelect : true)
                        setSelected(_selectedRows);
                        if (_selectedRows.length === maxItemSelect) {
                            timeout && clearTimeout(timeout);
                            setVisiblePopover(true);
                            changeTimeout(setTimeout(() => {
                                setVisiblePopover(false);
                            }, 3000))
                        }
                    }
                    else {
                        setSelected(newSelectedRows);
                    }

                },
                getCheckboxProps: (record) => {
                    const disabled = typeof maxItemSelect === "number" ? selected.findIndex(item => item[rowKey] === record[rowKey]) === -1 && selected.length === maxItemSelect : false;
                    return {
                        disabled: disabled || record.disabled
                    }
                }
            }}
            pagination={pagination ? false : {
                pageSizeOptions: constants.CONST_PAGE_SIZE_OPTIONS,
                size: "default",
                showSizeChanger: true
            }}
            size="small"
            bordered
            rowKey={rowKey}
            columns={[
                {
                    title: "STT",
                    dataIndex: "stt",
                    width: 50,
                    align: "center"
                },
                { title: "Họ và tên", dataIndex: "fullName" },
                {
                    title: "Phòng ban",
                    render: (_, record) => {
                        const phongBan = constants.CONST_PHONG_BAN.options.find(item => item.value === record.managementDepartment);
                        return phongBan ? phongBan.label : "";
                    }
                },
                {
                    title: "Chức vụ",
                    render: (_, record) => {
                        const chucVu = constants.CONST_CHUC_VU.options.find(item => item.value === record.regency);
                        return chucVu ? chucVu.label : "";
                    }
                },
                { title: "Email", dataIndex: "email" },
                { title: "Di động", dataIndex: "phoneNumber" },
                { title: "Điện thoại cơ quan", dataIndex: "desktopPhoneNumber" },
            ]}
            dataSource={dataSource.map((item, i) => {
                let stt = i + 1;
                if (pagination) {
                    const { currentPage, pageSize } = pagination;
                    stt = (currentPage - 1) * pageSize + i + 1;
                }
                return { ...item, stt };
            })}
        />
    </Fragment >
}

export default Table;