import React, { Fragment, useEffect, useState } from "react";
import { ConfigProvider, Empty, List, Menu } from "antd";
import { getAllRequest, updateRequest } from "./../../../../../actions/app/quan_ly_co_so_san_xuat_kinh_doanh/co_so_san_xuat_kinh_doanh/co_so_du_kien";
import { deduplicate } from "../../../../../constants/main";
import ScrollArea from "react-perfect-scrollbar";

const MenuList = ({ coSoSelected }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({});

    const getData = async (currentPage = 1, pageSize = pagination.pageSize || 10) => {
        setLoading(true);
        const res = await getAllRequest({
            data: { currentPage, pageSize }
        })
        if (res.status && res.result && res.pagination) {
            setData(res.result);
            setPagination(res.pagination);
        }
        setLoading(false);
    }

    useEffect(() => {
        getData();
    }, [])

    const onSelect = async (item) => {
        updateRequest({
            data: {
                ...item,
                listCoSo: deduplicate([...item.listCoSo, ...coSoSelected.map(id => ({ id }))], "id")
            }
        })
    }
    return <Fragment>
        <div style={{ maxHeight: "300px", width: "200px" }}>
            <ScrollArea style={{ maxHeight: "300px", width: "200px", overflow: "auto" }}>
                <ConfigProvider renderEmpty={() => <Empty description="Không có dữ liệu!" />}>
                    <List
                        className="cssxkd-dsdk-list"
                        loading={loading}
                        dataSource={data}
                        size="small"
                        renderItem={(item) => <List.Item className="cssxkd-dsdk-item" onClick={() => onSelect(item)}>{item.tieuDe}</List.Item>}
                    />
                </ConfigProvider>
            </ScrollArea>
        </div>
    </Fragment>
}
export default MenuList;