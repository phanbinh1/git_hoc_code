import React, { Fragment } from "react";
import { CommonFieldset } from "../../../common";
import { Input, Button } from "antd";

const ActionBar = ({
    search,
    onChange,
    readOnly,
    setVisible,
}) => {
    return <Fragment>
        <CommonFieldset className="m-b-10">
            <div className="row">
                <div className="col-md-6">
                    <Input.Search
                        value={search}
                        onChange={e => onChange(e.target.value)}
                        placeholder="Tìm kiếm ..."
                        allowClear
                        className="input-round"
                    />
                </div>
                {
                    !readOnly &&
                    <div className="col-md-6 t-right">
                        {/* {
                            allowTrinhKy && <BtnTrinhKy
                                className="m-r-5"
                                entityId={entityId}
                                attachEntityType={attachEntityType}
                                trinhKyCallback={trinhKyCallback}
                            />
                        } */}
                        <Button onClick={() => setVisible(true)} type="primary">
                            <i className="fa fa-file-text-o m-r-5" />Chọn mẫu
                        </Button>
                    </div>
                }
            </div>
        </CommonFieldset>
    </Fragment>
}

export default ActionBar;