import * as type from '../../../../../constants/type';
import { CONST_NGHI_PHEP_BUOI } from '../../../../../constants/constants';
export default (state = [], action) => {
    var { values } = action;
    let result = state;
    switch (action.type) {
        case type.TYPE_THONG_KE_BAO_CAO_NGHI_PHEP_LIST:
            result = [...values];
            break;
        default:
            break;
    }
    return result.map(item => ({ ...item, soNgayNghis : ngaynghi(item.thongTinNghiPhepChiTiets) }));
}


const ngaynghi = (ngayNghi) => {
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
