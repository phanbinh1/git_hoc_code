import * as api from "../../../util/api_call";
import * as apiUrl from '../../../constants/api';
import * as main from "../../../constants/main";

export const getFileDongBo = async (data) => {
    const res = await api.get({
        url: apiUrl.API_VBDH_GET_FILE_DONG_BO,
        data
    });
    return res;
}

export const ThemMoiCongViecVanBanDieuHanh = async (data) => {
    const res = await api.post({
        url: apiUrl.API_VBDH_THEM_MOI_CONG_VIEC,
        data,
        isUpload: true
    });
    return res;
}

export const ThemMoiHoSo = async (object) => {
    var { data, controller } = main.checkValidObjectRequest(object);
    const res = await api.post({
        url: apiUrl.API_VBDH_HOSO,
        data,
        controller
    })
    return res;
}


export const ThemMoiCongViecVanBanDieuHanhByHoSoCapGCN = async (data) => {
    const res = await api.post({
        url: apiUrl.API_VBDH_THEM_MOI_CONG_VIEC_CAP_CGN,
        data,
        isUpload: true
    });
    return res;
}

export const ThemMoiCongViecVanBanDieuHanh_KeHoachThamDinhCapGCN = async (data) => {
    const res = await api.post({
        url: apiUrl.API_VBDH_THEM_MOI_CONG_VIEC_KHTDCGCN,
        data,
    });
    return res;
}

export const ThemMoiCongViecVanBanDieuHanh_HoSoThamDinhBanHanhCongVan = async (data) => {
    const res = await api.post({
        url: apiUrl.API_VBDH_THEM_MOI_CONG_VIEC_HSTDBHCV,
        data,
    });
    return res;
}

export const ThemMoiCongViecVanBanDieuHanh_KeHoachThanhKiemTra = async (data) => {
    const res = await api.post({
        url: apiUrl.API_VBDH_THEM_MOI_CONG_VIEC_KHTKT,
        data,
    });
    return res;
}

export const ThemMoiCongViecVanBanDieuHanh_CuocThanhKiemTra = async (data) => {
    const res = await api.post({
        url: apiUrl.API_VBDH_THEM_MOI_CONG_VIEC_CTKT,
        data,
    });
    return res;
}

export const ThemMoiCongViecVanBanDieuHanh_QuyetDinhThanhLapDoanThanhKiemTra = async (data) => {
    const res = await api.post({
        url: apiUrl.API_VBDH_THEM_MOI_CONG_VIEC_QDTLDTKT,
        data,
    });
    return res;
}

export const ThemMoiCongViecVanBanDieuHanh_KeHoachTienHanhCuocThanhKiemTra = async (data) => {
    const res = await api.post({
        url: apiUrl.API_VBDH_THEM_MOI_CONG_VIEC_KHTHTT,
        data,
    });
    return res;
}

export const ThemMoiCongViecVanBanDieuHanh_KetLuanCuocThanhKiemTra = async (data) => {
    const res = await api.post({
        url: apiUrl.API_VBDH_THEM_MOI_CONG_VIEC_KLCTKT,
        data,
    });
    return res;
}


export const ThemMoiCongViecVanBanDieuHanh_KeHoachGiamSatATTP = async (data) => {
    const res = await api.post({
        url: apiUrl.API_VBDH_THEM_MOI_CONG_VIEC_KHGSATTP,
        data,
    });
    return res;
}


export const ThemMoiCongViecVanBanDieuHanh_KeHoachGiamSatATTP_QuyetDinh = async (data) => {
    const res = await api.post({
        url: apiUrl.API_VBDH_THEM_MOI_CONG_VIEC_KHGSATTP_QUYETDINH,
        data,
    });
    return res;
}

export const ThemMoiCongViecVanBanDieuHanh_KeHoachTaiChinh = async (data) => {
    const res = await api.post({
        url: apiUrl.API_VBDH_THEM_MOI_CONG_VIEC_KHTC,
        data,
    });
    return res;
}

export const ThemMoiCongViecVanBanDieuHanh_QuyetDinhThanhLapDoanGiamSat = async (data) => {
    const res = await api.post({
        url: apiUrl.API_VBDH_THEM_MOI_CONG_VIEC_QDTLDGS,
        data,
    });
    return res;
}

export * from "./mot_cua";