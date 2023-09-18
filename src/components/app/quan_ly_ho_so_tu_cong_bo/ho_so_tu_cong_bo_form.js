import React from 'react';
import * as constants from "./../../../constants/constants";
import FormTuCongBo from "./ho_so_tu_cong_bo_form_tcb";
import FormBanCongBo from "./ho_so_tu_cong_bo_form_bcb";

const HoSoTuCongBoForm = ({ handleBack, loaiCongBo, handleAllRequest }) => {
    return loaiCongBo === constants.CONST_LOAI_CONG_BO_SAN_PHAM.TUCONGBO ? <FormTuCongBo handleBack={handleBack} handleAllRequest={handleAllRequest} /> : <FormBanCongBo handleBack={handleBack} />;
}
export default HoSoTuCongBoForm;