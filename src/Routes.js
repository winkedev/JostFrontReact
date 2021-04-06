import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import PrivatePage from './screens/PrivatePage';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={(props) => {
            return true ? <Component {...props} /> : <Redirect to="/" />
        }} />
    )
}

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/Dashboard" component={Dashboard} />
                <PrivateRoute exact path="/PrivatePage" component={PrivatePage} />
                <Route path="*" component={PrivatePage} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;