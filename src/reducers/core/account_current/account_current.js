import * as type from './../../../constants/type';

export default (state = {}, action) => {
    let { value } = action;

    switch (action.type) {
        case type.TYPE_GET_ACCOUNT_CURRENT:
            const avatar = value.avatar;
            const phoneNumber = value.phoneNumber;
            const desktopPhoneNumber = value.desktopPhoneNumber;
            const managementDepartment = value.managementDepartment;
            const regency = value.regency;
            let complete = 0;
            complete += avatar ? 20 : 0;
            complete += phoneNumber ? 20 : 0;
            complete += desktopPhoneNumber ? 20 : 0;
            complete += managementDepartment ? 20 : 0;
            complete += regency ? 20 : 0;
            return {
                ...value,
                complete
            };

        case type.TYPE_UNAUTHENTICATED:
            return {};
        case type.TYPE_RESET_STORE:
            return {};
        default:
            return state;
    }
}