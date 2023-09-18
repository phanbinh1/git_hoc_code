import React, { Fragment } from "react";
import { Route, Switch } from 'react-router-dom';

const NotExtendTemp = ({
    routes = [],
}) => {
    return <Fragment>
        <Switch>
            {routes.map(route => <Route path={route.path} component={route.main} />)}
        </Switch>
    </Fragment>
}

export default NotExtendTemp;