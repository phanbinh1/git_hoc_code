import React from 'react';
import { Tabs } from "antd";
import { CommonFormContent } from "./../../../../common";
import * as formName from "./../../../../../constants/form_name";
import TabLoaiHinhCoSo from "./tab_loai_hinh_co_so";
import TabDiaBan from './tab_dia_ban';


const TabPhamVi = () => {
    return (
        <React.Fragment>
            <CommonFormContent
                key="f-c-2"
                data={[
                    [
                        {
                            type: "custom",
                            renderCustom: <React.Fragment key="list-pv">
                                <Tabs tabPosition="left">
                                    <Tabs.TabPane tab="Địa bàn" key="db">
                                        <TabDiaBan
                                            form={formName.FORM_NAME_QTNVTT_KE_HOACH_THANH_TRA}
                                        />
                                    </Tabs.TabPane>
                                    {/* <Tabs.TabPane tab="Loại hình cơ sở" key="lhcs">
                                        <TabLoaiHinhCoSo
                                            form={formName.FORM_NAME_QTNVTT_KE_HOACH_THANH_TRA}
                                        />
                                    </Tabs.TabPane> */}
                                </Tabs>
                            </React.Fragment>
                        }
                    ]
                ]}
            />
        </React.Fragment >
    );
}

export default TabPhamVi;