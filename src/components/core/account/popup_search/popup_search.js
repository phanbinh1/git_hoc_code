import React, { Fragment, useEffect, useState } from "react";
import { Modal, Button, Popover, Badge } from "antd";
import * as constants from "./../../../../constants/constants";
import { deepDiffMapper } from "./../../../../constants/main";
import List from "./list";

let timeout = null;
const changeTimeout = (_timeout) => { timeout = _timeout };

const AccountPopupSearch = ({
    visible,
    onCancel,
    onOk,
    accountSelected = [],
    searchKey,
    rowKey = "id",
    maxItemSelect,
    phongBans
}) => {
    const [selected, setSelected] = useState([]);
    const _maxItemSelect = maxItemSelect >= 0 ? maxItemSelect : undefined;
    const [visiblePopover, setVisiblePopover] = useState(false);

    useEffect(() => {
        setVisiblePopover(true);
        changeTimeout(setTimeout(() => {
            setVisiblePopover(false);
        }, 3000))
        return () => { timeout && clearTimeout(timeout) }
    }, [])

    return <Fragment>
        <Modal
            title={<Fragment>
                <span className="m-r-10">Danh sách người dùng</span>
                {_maxItemSelect ? <Popover
                    overlayClassName="popover-tutorial-overlay danger"
                    content={`Chỉ được phép chọn tối đa ${_maxItemSelect} người dùng`}
                    visible={visiblePopover}
                    onVisibleChange={visible => {
                        timeout && clearTimeout(timeout);
                        setVisiblePopover(visible)
                    }}
                    placement="bottom"
                >
                    <Badge color="red" status="processing" className="c-pointer" />
                </Popover> : null}
            </Fragment>}
            visible={visible}
            onCancel={onCancel}
            width={1000}
            style={{ maxWidth: "100vw", top: 50 }}
            destroyOnClose
            footer={[
                <Button size={constants.CONST_BTN_SIZE_DEFAULT} type="default" key="cancel" onClick={onCancel}>
                    <i className="fa fa-times m-r-10" />Đóng
                </Button>,
                <Button size={constants.CONST_BTN_SIZE_DEFAULT} disabled={deepDiffMapper.equal(selected.map(item => item[rowKey]).sort(), accountSelected.map(item => item[rowKey]).sort())} type="primary" key="ok" onClick={() => onOk(selected)}>
                    <i className="fa fa-check m-r-10" />Chọn ({selected.length})
                </Button>
            ]}
            bodyStyle={{ paddingBottom: 0 }}
        >
            <List
                timeout={timeout}
                changeTimeout={changeTimeout}
                accountSelected={accountSelected}
                selected={selected}
                setSelected={setSelected}
                searchKey={searchKey}
                rowKey={rowKey}
                maxItemSelect={_maxItemSelect}
                setVisiblePopover={setVisiblePopover}
                onOk={onOk}
                phongBans={phongBans}
            />
        </Modal>
    </Fragment>
}

export default AccountPopupSearch;