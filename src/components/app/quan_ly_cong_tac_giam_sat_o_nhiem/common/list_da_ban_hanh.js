import React, { Fragment, useEffect, useState } from "react";
import { ConfigProvider, Empty, Spin, Table } from "antd";
import { getFileDongBo } from "./../../../../actions/app/van_ban_dieu_hanh"
import { AntIcon } from "../../../antd";
const TaiLieuDaBanHanh = ({
    entityId,
    entityType
}) => {

    const [item, setItem] = useState({});
    const [loading, setLoading] = useState(false)
    const getData = async () => {
        setLoading(true);
        const res = await getFileDongBo({ entityId, entityType });
        if (res && res.status && res.result) {
            setItem(res.result);
        }
        setLoading(false);
    }

    useEffect(() => {
        if (entityId && entityType) {
            getData();
        }
    }, [entityId, entityType])

    return <Fragment>
        <Spin indicator={<AntIcon type="loading" />} spinning={loading}>
            <ConfigProvider renderEmpty={() => <Empty description="Không có dữ liệu!" />}>
                <Table
                    size="small"
                    pagination={false}
                    rowKey="id"
                    columns={[
                        {
                            title: "STT",
                            width: 50,
                            align: "center",
                            render: (t, r, i) => i + 1
                        },
                        {
                            title: "Tên file",
                            render: (t, r) => {
                                return <a href={r.url} target="_blank" rel="noopener noreferrer" key={r.id}>{r.name}</a>
                            }
                        }
                    ]}
                    dataSource={item && Array.isArray(item.listFile) ? item.listFile : []}
                />
            </ConfigProvider>
        </Spin>
    </Fragment>
}

export default TaiLieuDaBanHanh;