import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import registerServiceWorker from './registerServiceWorker';
import rootReducer from "./reducers";
import { createStore, applyMiddleware } from "redux";
import { compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { ConfigProvider } from "antd";
import vi_VN from "antd/lib/locale-provider/vi_VN";
import moment from 'moment';
import 'moment/locale/vi';

moment.locale('vi');
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    rootReducer,
    // -- hidden redux browser
    // applyMiddleware(thunk),
    // -- show redux browser
    composeEnhancer(
        applyMiddleware(thunk)
    )
);

ReactDOM.render(<Provider store={store}>
    <ConfigProvider locale={vi_VN}><App /></ConfigProvider>
</Provider >, document.getElementById("csdl-attp-root"));


// registerServiceWorker();
