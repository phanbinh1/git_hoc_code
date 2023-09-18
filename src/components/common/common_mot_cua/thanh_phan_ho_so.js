import React, { useEffect, useState } from "react";
import { Modal, Table, Button, Drawer } from "antd";
import { layThanhPhanHoSoMotCua } from "../../../actions/mot_cua";

const ThanhPhanHoSoMotCua = ({
    maHoSoMotCua,
    visible,
    onCancel,
    viewType = "modal",
    title = "Thành phần hồ sơ một cửa"
}) => {
    const [thanhPhans, setThanhPhans] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setThanhPhans([]);
    }, [maHoSoMotCua])

    useEffect(() => {
        if (visible && maHoSoMotCua) {
            setLoading(true);
            layThanhPhanHoSoMotCua({
                data: { maHoSoMotCua },
                requestSuccess: (res) => {
                    setThanhPhans(res.result);
                    setLoading(false);
                },
                requestError: () => {
                    setLoading(false);
                }
            })
        }
    }, [maHoSoMotCua, visible]);

    switch (viewType) {
        case "drawer":
            return <Drawer
                title={title}
                visible={visible}
                onClose={onCancel}
                width={800}
            >
                <ListThanhPhanHoSo loading={loading} thanhPhans={thanhPhans} />
            </Drawer>;
        default:
            return <Modal
                visible={visible}
                onCancel={onCancel}
                title={title}
                style={{ top: 50 }}
                width={800}
                footer={[
                    <Button onClick={onCancel}>
                        <i className="fa fa-times m-r-5" />Đóng
                </Button>
                ]}
            >
                <ListThanhPhanHoSo loading={loading} thanhPhans={thanhPhans} />
            </Modal>
    }
}


const ListThanhPhanHoSo = ({ loading, thanhPhans }) => {
    return <Table
        loading={loading}
        dataSource={thanhPhans}
        size="middle"
        columns={[
            {
                title: "STT",
                width: 50,
                align: "center",
                render: (t, r, i) => i + 1
            },
            {
                title: "Tên thành phần",
                dataIndex: "tenThanhPhan"
            },
            {
                title: "Thao tác",
                width: 100,
                render: (t, r) => {
                    return <Button type="success" disabled={!r.fileDinhKem || !r.fileDinhKem.url} onClick={() => r.fileDinhKem && r.fileDinhKem.url && window.open(r.fileDinhKem.url)}>
                        <i className="fa fa-cloud-download m-r-5" /> Tải xuống
                </Button>
                }
            }
        ]}
        pagination={false}
    />
}

export default ThanhPhanHoSoMotCua;