import React, { Fragment, useState, useEffect } from "react";
import { Modal, Descriptions, Tag } from "antd";
import { getCauHinh } from "../../../../util/api_call";
import _version from "./../../../../constants/version";
import { AntIcon } from "../../../antd";
import { Markup } from "interweave";

const Version = () => {
    const [loading, setLoading] = useState(true);
    const [version, setVersion] = useState({
        v: _version.current.version,
        date: _version.current.date,
        content: _version.current.description,
        update: true
    });

    const getVersion = async () => {
        setLoading(true);
        const res = await getCauHinh({ ma: "version_info" })
        setLoading(false);
        if (res.status) {
            try {
                const __version = JSON.parse(res.result.giaTri);
                const { description } = __version;
                const { version, date, content } = description;
                if (version === _version.current.version) {
                    setVersion({
                        v: version,
                        date,
                        content,
                        update: false
                    })
                }
            }
            catch (e) {
            }
        }
    };
    useEffect(() => {
        getVersion();
    }, []);

    return <Fragment>
        <Descriptions column={1} size="small">
            <Descriptions.Item label="Phiên bản hiện tại">
                {version.v}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày cập nhật">
                {version.date}
            </Descriptions.Item>
            <Descriptions.Item label="Nội dung thay đổi">
                {
                    loading ? <Fragment><AntIcon type="loading" className="m-r-10" />Loading...</Fragment> :
                        !version.update ? <Markup content={version.content} /> :
                            <Tag color="red" className="c-pointer">Phiên bản đã cũ</Tag>
                }
            </Descriptions.Item>
            <Descriptions.Item>
                {!loading && !version.update && <Tag color="green"><i className="fa fa-check-circle m-r-10" />Phiên bản mới nhất</Tag>}
            </Descriptions.Item>
        </Descriptions>

    </Fragment>
}

export const showVersion = () => {
    Modal.info({
        title: "Phiên bản",
        style: { top: 50 },
        width: 500,
        content: <Version />,
        okButtonProps: { type: "default" },
        okText: <Fragment><i className="fa fa-times m-r-5" />Đóng</Fragment>,
        className: "modal-version-info"
    })
}

export default Version;