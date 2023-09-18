import * as type from './../../../constants/type';

export default (state = {}, action) => {
    var { value } = action;
    switch (action.type) {
        case type.TYPE_SERVICE_EDIT:
            if (value.authorizedGrantTypes) {
                var { authorizedGrantTypes } = value;
                var listAuthorizedGrantTypes = authorizedGrantTypes.split(",");
                return { ...value, authorizedGrantTypes: listAuthorizedGrantTypes };
            }
            else {
                return { ...value };
            }
        case type.TYPE_SERVICE_CREATE:
            return {};
        case type.TYPE_SERVICE_UPDATE:
            return {};
        case type.TYPE_RESET_STORE:
            return {};
        default:
            return state;
    }
}