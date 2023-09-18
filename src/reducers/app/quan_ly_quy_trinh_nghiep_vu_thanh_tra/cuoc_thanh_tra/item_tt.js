import * as type from '../../../../constants/type';

export default (state = {}, action) => {
    var { value } = action;
    let coSoKinhDoanhs = state.coSoKinhDoanhs;
    let index = -1, danhSachXepHang = state.danhSachXepHang ? state.danhSachXepHang : [];;
    switch (action.type) {
        case type.TYPE_QTNVTT_CUOC_THANH_TRA_THANH_TRA:
            return { ...value };
        case type.TYPE_QTNVTT_BIEN_BAN_CREATE:
            if (value.idCoSoEntity) {
                index = coSoKinhDoanhs.findIndex(item => item.id === value.idCoSoEntity);
                if (index !== -1) {
                    coSoKinhDoanhs[index].bienBan = value;
                }
            }
            return { ...state, coSoKinhDoanhs };
        case type.TYPE_QTNVTT_BIEN_BAN_UPDATE:
            if (value.idCoSo) {
                index = coSoKinhDoanhs.findIndex(item => item.idCoSo === value.idCoSo);
                if (index !== -1) {
                    coSoKinhDoanhs[index].bienBan = value;
                }
            }
            return { ...state, coSoKinhDoanhs };
        case type.TYPE_QTNVTT_CUOC_THANH_TRA_MAU_UPDATE:
            const { listBienBanThanhKiemTra } = state;
            if (listBienBanThanhKiemTra && Array.isArray(listBienBanThanhKiemTra)) {
                let _listBienBanThanhKiemTra = [...listBienBanThanhKiemTra];
                index = _listBienBanThanhKiemTra.findIndex(item => item.id === value.idBienBan);
                if (index > -1) {
                    _listBienBanThanhKiemTra[index].mauKiemTra = value;
                }
                return { ...state, listBienBanThanhKiemTra: [..._listBienBanThanhKiemTra] };
            }
            return state;
        case type.TYPE_QTNVTT_CUOC_THANH_TRA_XEP_HANG_CREATE:
            return {
                ...state,
                danhSachXepHang: [...danhSachXepHang, { idCoSo: value.idCoSo, danhSachXepHang: [value] }]
            }
        case type.TYPE_QTNVTT_CUOC_THANH_TRA_XEP_HANG_UPDATE:
            return {
                ...state,
                danhSachXepHang: danhSachXepHang.map(dsxh => {
                    if (dsxh.idCoSo === value.idCoSo) {
                        let xepHangs = dsxh.danhSachXepHang || [];
                        index = xepHangs.findIndex(xh => xh.id === value.id);
                        if (index > -1) { xepHangs[index] = value; }
                        return { ...dsxh, danhSachXepHang: [...xepHangs] }
                    }
                    else {
                        return { ...dsxh };
                    }
                })
            }
        case type.TYPE_QTNVTT_CUOC_THANH_TRA_CHILD_UPDATE:
            if (state.id === value.idChaCuocThanhKiemTra) {
                return {
                    ...state,
                    dotThanhKiemTra: state.dotThanhKiemTra.findIndex(dtt => dtt.id === value.id) >= 0 ?
                        state.dotThanhKiemTra.map(dtt => dtt.id === value.id ? value : dtt) :
                        [...state.dotThanhKiemTra, value]
                }
            }
            else {
                return state;
            }
        case type.TYPE_QTNVTT_CUOC_THANH_TRA_CHILD_CREATE:
            if (state.id === value.idChaCuocThanhKiemTra) {
                return {
                    ...state,
                    dotThanhKiemTra: state.dotThanhKiemTra.findIndex(dtt => dtt.id === value.id) >= 0 ?
                        state.dotThanhKiemTra.map(dtt => dtt.id === value.id ? value : dtt) :
                        [...state.dotThanhKiemTra, value]
                }
            }
            else {
                return state;
            }
        case type.TYPE_QTNVTT_DOT_THANH_TRA_UPDATE_THONG_TIN_BAN_HANH:
            if (state && state.id === action.idCuocThanhTra) {
                return {
                    ...state,
                    dotThanhKiemTra: (state.dotThanhKiemTra || []).map(dtt => {
                        if (dtt.id === value.id) {
                            return value;
                        }
                        return dtt;
                    })
                }
            }
            else {
                return state;
            }
        case type.TYPE_QTNVTT_CUOC_THANH_TRA_KETLUAN:
            if (state && state.id === value.id) {
                return { ...state, ...value };
            }
            else {
                return state;
            }
        case type.TYPE_RESET_STORE:
            return {};
        default:
            return state;
    }
}