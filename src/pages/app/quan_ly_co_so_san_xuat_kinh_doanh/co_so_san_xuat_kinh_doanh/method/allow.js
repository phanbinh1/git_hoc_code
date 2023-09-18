import { ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH } from "../../../../../constants/action_id";
import { CONST_PHE_DUYET } from "../../../../../constants/constants";

export default (coSo) => state => {
    let allowEdit = false,
        allowDelete = false,
        allowChuyenXuLy = false,
        allowTrinhPheDuyet = false,
        allowPheDuyet = false;
    const permission_priviliged = state.core.permission.priviliged;
    const account_current = state.core.account_current;

    const trangThaiChuyenHoSo = coSo && coSo.trangThaiChuyenHoSo ? coSo.trangThaiChuyenHoSo : null;
    const trangThaiPheDuyet = coSo && coSo.trangThaiPheDuyet ? coSo.trangThaiPheDuyet : null;

    allowEdit = !trangThaiChuyenHoSo || trangThaiChuyenHoSo.nguoiXuLy === account_current.name;
    allowDelete = !trangThaiChuyenHoSo || trangThaiChuyenHoSo.nguoiXuLy === account_current.name;
    allowChuyenXuLy = permission_priviliged.map(item => item.idChucNang).includes(ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_CHUYENXULY) && (!trangThaiChuyenHoSo || trangThaiChuyenHoSo.nguoiXuLy === account_current.name) && trangThaiPheDuyet === CONST_PHE_DUYET.CHOPHEDUYET;
    allowTrinhPheDuyet = permission_priviliged.map(item => item.idChucNang).includes(ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_TRINHPHEDUYET) && (!trangThaiChuyenHoSo || trangThaiChuyenHoSo.nguoiXuLy === account_current.name) && trangThaiPheDuyet === CONST_PHE_DUYET.CHOPHEDUYET;
    allowPheDuyet = permission_priviliged.map(item => item.idChucNang).includes(ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_PHEDUYET) && (!trangThaiChuyenHoSo || trangThaiChuyenHoSo.nguoiXuLy === account_current.name) && trangThaiPheDuyet === CONST_PHE_DUYET.CHOPHEDUYET;
    return {
        allowEdit,
        allowDelete,
        allowChuyenXuLy,
        allowTrinhPheDuyet,
        allowPheDuyet
    }
}