import { Base64 } from '../../constants/main';
import { TYPE_GET_ACCOUNT_CURRENT_CONFIG } from './../../constants/type';
import _button from "./_button";
import _checkbox from "./_checkbox";
import _layout from "./_layout";
import _menu from "./_menu";
import _navigation from "./_navigation";
import _pagination from "./_pagination";
import _switch from "./_switch";
import _table from "./_table";

export const stateDefault = [
    {
        code: "navigation",
        name: "Navigation",
        data: _navigation
    },
    {
        code: "menu",
        name: "Menu",
        data: _menu
    },
    {
        code: "table",
        name: "Table",
        data: _table
    },
    {
        code: "pagination",
        name: "Pagination",
        data: _pagination
    },
    {
        code: "button",
        name: "Button",
        data: _button
    },
    {
        code: "layout",
        name: "Layout",
        data: _layout
    },
    {
        code: "checkbox",
        name: "Checkbox",
        data: _checkbox
    },
    {
        code: "switch",
        name: "Switch",
        data: _switch
    }
]

export default (state = stateDefault.map(item => ({ ...item, data: item.data.map(_item => ({ ..._item, default: _item.value })) })), { type, value, group_code, code, payload }) => {
    switch (type) {
        case "LAYOUT_CSS_CHANGE":
            return state.map(item => {
                if (item.code === group_code) {
                    return {
                        ...item,
                        data: item.data.map(_item => ({ ..._item, value: _item.code === code ? payload : _item.value }))
                    }
                }
                return item;
            });
        case TYPE_GET_ACCOUNT_CURRENT_CONFIG:
            try {
                const _config = value.config ? JSON.parse(Base64.decode(value.config)) : {};
                if (_config.root_css) {
                    return { ...state, ..._config.root_css }
                }
            }
            catch (e) { }
            return state;
        default:
            return state;
    }
}