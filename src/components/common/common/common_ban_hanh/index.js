import React, { Fragment, useState } from "react";
import { Modal, Button, Form, Spin, Divider } from "antd";
import CommonForm from "./../common_form";
import { useDispatch, useSelector } from "react-redux";
import { submit, Field } from "redux-form";
import {
    VALIDATE_BAN_HANH_SO_KE_HOACH_REQUIRED,
    VALIDATE_BAN_HANH_SO_QUYET_DINH_REQUIRED,
    VALIDATE_BAN_HANH_NGUOI_LAP_KE_HOACH_REQUIRED,
    VALIDATE_BAN_HANH_NGUOI_KY_REQUIRED,
    VALIDATE_BAN_HANH_NGAY_KY_REQUIRED
} from "./../../../constants/validate"
import { FieldDate, FieldInput } from "./../../../constants/controll";
import CommonAttachments from "./../common_attachments";

const fieldsInit = [
    {
        label: "Số kế hoạch",
        placeholder: "Số kế hoạch",
        name: "soKeHoach",
        component: FieldInput,
        checkValid: true,
        validate: [VALIDATE_BAN_HANH_SO_KE_HOACH_REQUIRED]
    },
    {
        label: "Số quyết định",
        placeholder: "Số quyết định",
        name: "soQuyetDinh",
        component: FieldInput,
        checkValid: true,
        validate: [VALIDATE_BAN_HANH_SO_QUYET_DINH_REQUIRED]
    },
    {
        label: "Người lập kế hoạch",
        placeholder: "Người lập kế hoạch",
        name: "nguoiLapKeHoach",
        component: FieldInput,
        checkValid: true,
        validate: [VALIDATE_BAN_HANH_NGUOI_LAP_KE_HOACH_REQUIRED]
    },
    {
        label: "Người ký",
        placeholder: "Người ký",
        name: "nguoiKy",
        component: FieldInput,
        checkValid: true,
        validate: [VALIDATE_BAN_HANH_NGUOI_KY_REQUIRED]
    },
    {
        label: "Ngày ký",
        placeholder: "Ngày ký",
        name: "ngayKy",
        component: FieldDate,
        checkValid: true,
        validate: [VALIDATE_BAN_HANH_NGAY_KY_REQUIRED]
    },
]
const CommonBanHanh = ({
    form = "FORM_BAN_HANH",
    onBanHanh,
    visible,
    onCancel,
    initialValues,
    fields = fieldsInit,
    attach,
    readOnly,
    permission
}) => {
    const dispatch = useDispatch();
    const submitForm = () => dispatch(submit(form));
    const [loading, setLoading] = useState(false);
    const permission_priviliged = useSelector(state => state.core.permission.priviliged);
    const allowBanHanh = !permission || permission_priviliged.findIndex(item => item.idChucNang === permission) >= 0;
    return <Fragment>
        <Modal
            bodyStyle={{ paddingBottom: 0 }}
            title={<Fragment><i className="fa fa-share-square-o m-r-10" />Thông tin ban hành</Fragment>}
            visible={visible}
            onCancel={onCancel}
            destroyOnClose
            style={{ top: 50 }}
            footer={[
                <Button disabled={loading} onClick={onCancel}>
                    <i className="fa fa-times m-r-10" />Hủy
                </Button>,
                <Button
                    disabled={loading || readOnly || !allowBanHanh}
                    type="primary"
                    onClick={submitForm}
                >
                    <i className="fa fa-pencil-square-o m-r-10" />Ban hành
                </Button>
            ]}
        >
            <CommonForm
                actionAlign="right"
                actions={false}
                data={[
                    [
                        {
                            type: "custom",
                            renderCustom: <BanHanh
                                key="form-ban-hanh"
                                loading={loading}
                                fields={fields}
                            />
                        }
                    ]
                ]}
                initialValues={initialValues}
                onSubmit={(values) => {
                    Modal.confirm({
                        title: `Bạn chắc chắn muốn ban hành`,
                        onOk: () => {
                            setLoading(true);
                            onBanHanh({
                                data: values,
                                requestSuccess: () => {
                                    setLoading(false);
                                    onCancel();
                                },
                                requestError: () => {
                                    setLoading(false);
                                }
                            })
                        },
                        okText: <Fragment><i className="fa fa-check-circle m-r-10" />Đồng ý</Fragment>,
                        cancelText: <Fragment><i className="fa fa-times m-r-10" />Hủy</Fragment>,
                        mask: true
                    })

                }}
                form={form}
            />
            {
                attach &&
                <div className="row" style={{ marginBottom: 20 }}>
                    <div className="col-md-12">
                        <Divider orientation="left">Tài liệu đính kèm:</Divider>
                        <CommonAttachments
                            entityId={attach.entityId}
                            attachEntityType={attach.attachEntityType}
                        />
                    </div>
                </div>
            }
        </Modal>
    </Fragment>
}

const BanHanh = ({
    loading,
    fields
}) => {
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    return <Fragment>
        <Spin spinning={loading}>
            <div className="clearfix">
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-12">
                            <Form {...layout}>
                                {
                                    fields.map((field, index) => {
                                        return <Form.Item label={<span className={field.checkValid ? "ant-form-item-required" : ""} > {field.label}</span>} key={index}>
                                            <Field {...field} label={undefined} />
                                        </Form.Item>
                                    })
                                }
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </Spin>
    </Fragment>
}

export default CommonBanHanh;