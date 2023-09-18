import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import { createID } from "../constants/main";
import core from "./core";
import app from "./app";
import * as _constants from "./../constants/constants"
import root_css from "./root_css";

const screenID = createID();
const constants = (state = _constants, action) => {
    return {
        ...state,
        CONST_REACT_JSON_CONFIG: {
            style: { marginBottom: 20 }
        }
    };
}

export default combineReducers({
    screenID: () => screenID,
    form,
    core,
    app,
    constants,
    root_css
})