import React, { Fragment, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import { Avatar } from 'antd';

const CropImage = ({
    src,
    crop, setCrop,
    imageRef, setImageRef,
    fileUrl, setFileUrl,
}) => {
    useEffect(() => {
        if (imageRef && crop.width && crop.height) {
            getCroppedImg(imageRef, crop);
        }
    }, [crop])

    const getCroppedImg = (image, crop) => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
        canvas.toBlob(blob => {
            if (blob) {
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => setFileUrl(reader.result)
            }
        }, 'image/png');
    }

    return <Fragment>
        {fileUrl && <Avatar src={fileUrl} style={{ width: 100, height: 100, marginRight: "10px", float: "left", border: "2px solid green" }}>Crop</Avatar>}
        {src && <ReactCrop
            src={src}
            crop={crop}
            ruleOfThirds
            onImageLoaded={imageRef => setImageRef(imageRef)}
            onChange={crop => setCrop(crop)}
            style={{ width: "calc(100% - 112px)", border: "1px solid" }}
            imageStyle={{ width: "100%" }}
        />}
    </Fragment>
}
export default CropImage;