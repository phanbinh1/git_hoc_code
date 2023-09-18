import React, { useCallback } from 'react';
import { CommonFormContent } from "./../../../../common";
import * as validate from "./../../../../../constants/validate"

const KeHoach = ({ keHoachPhongs, keHoachPhongOptions }) => {
    const getKeHoachPhongOptions = useCallback(() => {
        let result = [];
        keHoachPhongOptions.map(item => {
            if (keHoachPhongs.findIndex(v => item.value === v) !== -1) {
                result.push(item);
            }
            return result;
        })
        return result;
    }, [keHoachPhongs]);

    return (
        <React.Fragment>
            <CommonFormContent
                key="f-c-1"
                data={[
                    [//row 1
                        {
                            col: 2,
                            fieldType: "year",
                            label: "Năm",
                            placeholder: "Năm",
                            name: "nam",
                            checkValid: true,
                            validates: [validate.VALIDATE_QTNVTT_KEHOACHTHANHTRA_NAM_REQUIRED]
                        },
                        {
                            col: keHoachPhongs.length === 1 ? 10 : 7,
                            label: "Tên kế hoạch",
                            placeholder: "Tên kế hoạch",
                            name: "tenKeHoach",
                            fieldType: "textarea",
                            autoSize: true,
                            checkValid: true,
                            validates: [validate.VALIDATE_QTNVTT_KEHOACHTHANHTRA_TEN_REQUIRED]
                        },

                        {
                            col: 3,
                            fieldType: "select",
                            label: "Kế hoạch phòng",
                            placeholder: "Kế hoạch phòng",
                            name: "keHoachPhong",
                            allowClear: false,
                            options: getKeHoachPhongOptions(),
                            checkValid: true,
                            validates: [validate.VALIDATE_QTNVTT_KEHOACHTHANHTRA_PHONG_REQUIRED],
                            hidden: keHoachPhongs.length === 1
                        }
                    ],
                    [// row 1
                        {
                            col: 12,
                            fieldType: "textarea",
                            label: "Mục đích, yêu cầu",
                            placeholder: "Mục đích, yêu cầu",
                            name: "mucDichYeuCau"
                        }
                    ],
                    [// row 1
                        {
                            col: 12,
                            fieldType: "textarea",
                            label: "Nội dung kế hoạch giám sát",
                            placeholder: "Nội dung kế hoạch giám sát",
                            name: "noiDungGiamSat"
                        }
                    ],
                    [// row 3
                        {
                            col: 12,
                            fieldType: "textarea",
                            label: "Tổ chức và biện pháp thực hiện",
                            placeholder: "Tổ chức và biện pháp thực hiện",
                            name: "toChucBienPhapThucHien"
                        }
                    ],
                    [
                        {
                            col: 12,
                            fieldType: "textarea",
                            label: "Ghi chú",
                            placeholder: "Ghi chú",
                            name: "ghiChu"
                        }
                    ]
                ]}
            />
        </React.Fragment >
    );
}

export default KeHoach;