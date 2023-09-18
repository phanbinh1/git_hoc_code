import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { Markup } from "interweave";
import { CONST_NGHI_PHEP_BUOI } from "../../../../constants/constants";
import { orderBy } from "lodash"
const PrintElem = (content, title) => {
    const mywindow = window.open('', 'PRINT');
    mywindow.document.write(`<html>`);
    mywindow.document.write(`<head>`);
    mywindow.document.write(`<title>${title}</title>`);
    mywindow.document.write(`</head>`);
    mywindow.document.write(`<body style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif">`);
    // mywindow.document.write(`<div style="font-size: 25px; color: #186b23">${title}</div>`);
    mywindow.document.write(`<div style="text-align:justify;">${content}</div>`);
    mywindow.document.write('</body>');
    mywindow.document.write('</html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;
}

const initialValue = {
    hoTen: "",
    phongBan: "",
    nam: "",
    soNgayNghi: "",
    lyDo: "",
    ngayNghis: "",
    ngayVietDon: "",
    thangVietDon: "",
    namVietDon: ""
}

const countNgayNghi = (ngayNghi = []) => {
    if (ngayNghi && Array.isArray(ngayNghi)) {
        return ngayNghi
            .map(item => {
                switch (item.loaiBuoi) {
                    case CONST_NGHI_PHEP_BUOI.SANG.value:
                    case CONST_NGHI_PHEP_BUOI.CHIEU.value:
                        return 0.5;
                    case CONST_NGHI_PHEP_BUOI.CANGAY.value:
                        return 1;
                    default: return 0;
                }
            })
            .reduce((a, b) => a + b, 0)
    }
    return 0;
};

export default ({
    visible = false,
    onClose,
    nghiPhep
}) => {
    const [state, setState] = useState(initialValue)
    useEffect(() => {
        if (nghiPhep) {
            console.log(nghiPhep);
            setState({
                hoTen: nghiPhep.nhanSu && nghiPhep.nhanSu.hoTen ? nghiPhep.nhanSu.hoTen : "",
                phongBan: nghiPhep.nhanSu && nghiPhep.nhanSu.phongBan && nghiPhep.nhanSu.phongBan.ten ? nghiPhep.nhanSu.phongBan.ten : "",
                lyDo: nghiPhep.lyDo || "",
                nam: nghiPhep.nam || "",
                soNgayNghi: countNgayNghi(nghiPhep.thongTinNghiPhepChiTiets),
                ngayNghis: orderBy((nghiPhep.thongTinNghiPhepChiTiets || []), "ngayNghi", "asc")
                    .map(item => NgayNghiHTML
                        .replaceAll("{{NGAY}}", item.ngayNghi)
                        .replaceAll("{{BUOI}}", CONST_NGHI_PHEP_BUOI[item.loaiBuoi].label)
                    )
                    .join(""),
                ngayVietDon: "",
                thangVietDon: "",
                namVietDon: nghiPhep.nam || ""
            })
        }
        else {
            setState(initialValue)
        }
    }, [nghiPhep])

    const contentPhieuTrinh = DonXinNghiPhepHTML
        .replaceAll("{{HO_VA_TEN}}", state.hoTen)
        .replaceAll("{{PHONG_BAN}}", state.phongBan)
        .replaceAll("{{NAM}}", state.nam)
        .replaceAll("{{SO_NGAY_NGHI}}", state.soNgayNghi)
        .replaceAll("{{LY_DO}}", state.lyDo)
        .replaceAll("{{NGAY_NGHIS}}", state.ngayNghis)
        .replaceAll("{{NGAY_VIET_DON}}", state.ngayVietDon)
        .replaceAll("{{THANG_VIET_DON}}", state.thangVietDon)
        .replaceAll("{{NAM_VIET_DON}}", state.namVietDon)

    return <Modal
        width={800}
        visible={visible}
        title="Phiếu trình"
        onCancel={onClose}
        destroyOnClose
        className="drawer-nghiphep-phieutrinh"
        footer={[
            <Button type="primary" onClick={() => PrintElem(contentPhieuTrinh, "Phiếu trình")}><i className="fa fa-print m-r-5" />In phiếu trình</Button>,
            <Button onClick={onClose}><i className="fa fa-times m-r-5" />Đóng</Button>
        ]}
        style={{ top: 50 }}
    >
        <Markup content={contentPhieuTrinh} />
    </Modal>
}

export const NgayNghiHTML = `<p style="margin: 6.0pt 0cm 6.0pt 0cm; font-size: 19px; font-family: 'Times New Roman','serif'; text-align: justify;"><span style="background: white;"><em>&nbsp;&nbsp;&nbsp; - Ng&agrave;y {{NGAY}} - {{BUOI}}</em></span></p>`;
export const DonXinNghiPhepHTML = `<p style="margin: 0cm; margin-bottom: .0001pt; font-size: 19px; font-family: 'Times New Roman','serif'; text-align: center;"><strong>CỘNG H&Ograve;A X&Atilde; HỘI CHỦ NGHĨA VIỆT NAM</strong></p>
<p style="margin: 0cm; margin-bottom: .0001pt; font-size: 19px; font-family: 'Times New Roman','serif'; text-align: center; text-indent: 36.0pt;"><strong>Độc lập &ndash; Tự do &ndash; Hạnh ph&uacute;c</strong></p>
<p style="margin: 0cm; margin-bottom: .0001pt; font-size: 19px; font-family: 'Times New Roman','serif'; text-align: center;"><strong>&nbsp;</strong></p>
<p style="margin: 6.0pt 0cm 6.0pt 0cm; font-size: 19px; font-family: 'Times New Roman','serif'; text-align: center;"><strong><span style="background: white;">ĐƠN XIN NGHỈ PH&Eacute;P</span></strong></p>
<p style="margin: 6.0pt 0cm 6.0pt 0cm; font-size: 19px; font-family: 'Times New Roman','serif'; text-align: center;"><span style="background: white;">K&iacute;nh gửi: Trưởng ban Ban quản l&yacute; An to&agrave;n thực phẩm</span></p>
<p style="margin: 6.0pt 0cm 6.0pt 0cm; font-size: 19px; font-family: 'Times New Roman','serif'; text-align: center;"><span style="background: white;">&nbsp;</span></p>
<p style="margin: 6.0pt 0cm 6.0pt 0cm; font-size: 19px; font-family: 'Times New Roman','serif'; text-align: justify;"><span style="background: white;">T&ocirc;i t&ecirc;n l&agrave;: <em>{{HO_VA_TEN}}</em></span></p>
<p style="margin: 6.0pt 0cm 6.0pt 0cm; font-size: 19px; font-family: 'Times New Roman','serif'; text-align: justify;"><span style="background: white;">Bộ phận c&ocirc;ng t&aacute;c:&nbsp;<em>{{PHONG_BAN}}</em></span></p>
<p style="margin: 6.0pt 0cm 6.0pt 0cm; font-size: 19px; font-family: 'Times New Roman','serif'; text-align: justify;"><span style="background: white;">T&ocirc;i viết đơn n&agrave;y k&iacute;nh tr&igrave;nh l&ecirc;n Trưởng ban cho t&ocirc;i được nghỉ ph&eacute;p theo chế độ nghỉ ph&eacute;p năm&nbsp;<em>{{NAM}}</em></span></p>
<p style="margin: 6.0pt 0cm 6.0pt 0cm; font-size: 19px; font-family: 'Times New Roman','serif'; text-align: justify;"><span style="background: white;">Thời gian nghỉ:&nbsp;<em>{{SO_NGAY_NGHI}} ng&agrave;y</em></span></p>
{{NGAY_NGHIS}}
<p style="margin: 6.0pt 0cm 6.0pt 0cm; font-size: 19px; font-family: 'Times New Roman','serif'; text-align: justify;"><span style="background: white;">L&yacute; do:&nbsp;<em>{{LY_DO}}</em></span></p>
<p style="margin: 6.0pt 0cm 6.0pt 0cm; font-size: 19px; font-family: 'Times New Roman','serif'; text-align: justify;"><span style="background: white;">T&ocirc;i cam kết ho&agrave;n th&agrave;nh c&ocirc;ng việc trước v&agrave; sau khi nghỉ ph&eacute;p</span></p>
<p style="margin: 6.0pt 0cm 6.0pt 0cm; font-size: 19px; font-family: 'Times New Roman','serif'; text-align: justify;"><span style="background: white;">K&iacute;nh đề nghị Trưởng ban xem x&eacute;t, giải quyết./.</span></p>
<p style="margin: 6.0pt 0cm 6.0pt 0cm; font-size: 19px; font-family: 'Times New Roman','serif'; text-align: right;"><em>Đ&agrave; Nẵng, ng&agrave;y <em>{{NGAY_VIET_DON}}</em> th&aacute;ng <em>{{THANG_VIET_DON}}</em> năm {{NAM_VIET_DON}}</em></p>
<p style="margin: 6.0pt 0cm 6.0pt 0cm; font-size: 19px; font-family: 'Times New Roman','serif'; text-align: right;">&nbsp;</p>
`