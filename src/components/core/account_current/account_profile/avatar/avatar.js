import React, { Fragment, useState } from "react";
import { Upload, message, Button, Avatar } from 'antd';
import { CommonCropImage } from "./../../../../common"
import * as constants from "./../../../../../constants/constants";

const AccountAvatar = ({ imageUrl, onUpdate, readOnly }) => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [_imageUrl, _setImageUrl] = useState(imageUrl);
    const [_imageResizeUrl, _setImageResizeUrl] = useState(imageUrl);

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    const beforeUpload = (file) => {
        setLoading(true);
        let error = false;
        const isJpgOrPng = file.type === 'image/x-png' || file.type === 'image/jpeg' || file.type === "image/gif" || file.type === "image/png";
        if (!isJpgOrPng) {
            error = true;
            message.error('Vui lòng chọn file ảnh!');
            setLoading(false);
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            error = true;
            message.error('Kích thước ảnh quá lớn!');
            setLoading(false);
        }

        if (!error) {
            getBase64(file, _imageUrl => {
                setLoading(false);
                _setImageUrl(_imageUrl);
                _setImageResizeUrl(_imageUrl);
            });
        }
        return isJpgOrPng && isLt2M;
    }

    return <Fragment>
        <CommonCropImage
            src={_imageUrl}
            visible={visible}
            onCancel={() => setVisible(false)}
            onOk={(imageUrl) => _setImageResizeUrl(imageUrl)}
            aspect={1}
        />
        {
            readOnly ?
                <Avatar src={_imageResizeUrl || constants.CONST_AVATAR_DEFAULT} size={150} className="profile-avatar-read-only" /> :
                <Fragment>
                    <Upload
                        accept="image/x-png,image/gif,image/jpeg,image/png"
                        name="avatar"
                        listType="picture-card"
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                        className="profile-avatar"
                    >
                        {_imageResizeUrl && <img src={_imageResizeUrl} alt="avatar" style={{ width: 134, height: 134 }} />}
                        <div className={`profile-avatar-action ${_imageResizeUrl ? "has-img" : ""} ${loading ? "loading" : ""}`}>
                            <i className={`fa fa-2x ${loading ? "fa fa-spinner fa-pulse" : _imageResizeUrl ? "fa-pencil m-r-10" : "fa-plus"}`} />
                            <div className="ant-upload-text">
                                {loading ? "Đang tải" : _imageResizeUrl ? "Thay đổi" : "Chọn ảnh"}
                            </div>
                        </div>
                    </Upload>
                    <Button.Group >
                        <Button type="primary" disabled={imageUrl === _imageResizeUrl || loading} onClick={() => onUpdate(_imageResizeUrl)}>
                            <i className="fa fa-save m-r-5" />Lưu
                        </Button>
                        <Button disabled={!_imageResizeUrl || !_imageUrl || loading} onClick={() => setVisible(true)}><i className="fa fa-eye m-r-5" />Xem</Button>
                    </Button.Group>
                </Fragment>
        }
    </Fragment >;
}

export default AccountAvatar;