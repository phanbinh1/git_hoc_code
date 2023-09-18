import React, { useState, Fragment } from 'react';
import { Modal } from 'antd';
import CropImage from "./crop";

const CropModal = ({
    src,
    visible = true,
    onCancel,
    onOk,
    aspect = {
        x: null,
        y: null
    }
}) => {
    const [crop, setCrop] = useState({
        unit: '%',
        width: 30,
        aspect: !isNaN(aspect) ?
            parseFloat(aspect) :
            aspect && !isNaN(aspect.x) && !isNaN(aspect.y) ?
                aspect.x / aspect.y :
                undefined
    });
    const [imageRef, setImageRef] = useState(null);
    const [fileUrl, setFileUrl] = useState(src);
    return <Modal
        width={500}
        visible={visible}
        onCancel={onCancel}
        onOk={() => {
            onOk(fileUrl);
            onCancel();
        }}
        okText={<Fragment><i className="fa fa-save m-r-10" />Cập nhật</Fragment>}
        cancelText={<Fragment><i className="fa fa-times m-r-10" />Đóng</Fragment>}
        style={{ border: "none" }}
        closable={false}
    >
        <CropImage
            src={src}
            crop={crop}
            setCrop={setCrop}
            imageRef={imageRef}
            setImageRef={setImageRef}
            fileUrl={fileUrl}
            setFileUrl={setFileUrl}
        />
    </Modal>
}

export default CropModal;
