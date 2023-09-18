import React, { useEffect } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { Field, reduxForm, change, formValueSelector } from "redux-form";
import SearchResult from "./../../components/core/search/search_result";
import * as field from "./../../constants/controll";
import * as main from "./../../constants/main";
import * as url from "./../../constants/url";

const TimKiem = ({
    handleSubmit
}) => {
    const history = useHistory();
    const location = useLocation();
    const qs = main.queryString.parse(location.search);

    const q = useSelector(state => formValueSelector("SEARCH_COMMON")(state, "q"));
    const dispatch = useDispatch();
    const changeValue = (field, value) => dispatch(change("SEARCH_COMMON", field, value));

    useEffect(() => {
        if (qs.q) {
            qs.q !== q && changeValue("q", decodeURIComponent(qs.q || ""));
        }
        else {
            changeValue("q", "");
        }
    }, [qs.q])

    const onSubmit = value => {
        if (value.q) {
            history.push({
                pathname: url.URL_SEARCH,
                search: main.queryString.stringify({ ...qs, q: encodeURIComponent(value.q) })
            });
        }
    };

    const changeType = (type) => {
        history.push({
            pathname: url.URL_SEARCH,
            search: main.queryString.stringify({ ...qs, type })
        });
    };

    return <React.Fragment>
        <div className={`home-page clearfix search `}>
            <div className="title">CSDL BAN AN TOÀN THỰC PHẨM</div>
            <form onSubmit={handleSubmit(onSubmit)} className="clearfix">
                <div className={`input col-md-8`} style={{ marginTop: 5 }} key="input">
                    <Field
                        className="input-search"
                        name="q"
                        component={field.FieldInput}
                        placeholder="Tìm kiếm"
                        size="large"
                        loading
                        allowClear={true}
                        suffix={<React.Fragment>
                            <i
                                className="fa fa-search m-r-5 c-pointer"
                                onClick={handleSubmit(onSubmit)}
                            />
                        </React.Fragment>}
                    />
                </div>
                <div className="col-md-4" style={{ marginTop: 5, paddingTop: 7 }}>
                    {
                        qs.type === "grid" ?
                            <i className="fa fa-list fa-2x c-pointer" onClick={() => changeType("list")} /> :
                            <i className="fa fa-th fa-2x c-pointer m-r-10" onClick={() => changeType("grid")} />
                    }
                </div>
            </form>
        </div>
        <SearchResult />
    </React.Fragment >;
}
export default connect(() => {
    return {
        form: "SEARCH_COMMON"
    }
})(reduxForm()(TimKiem));