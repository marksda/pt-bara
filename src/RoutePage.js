import React from 'react';
import { Route, Switch } from "react-router-dom";
import Login from './components/pages/Login';
import Main from './components/pages/main';

class RoutePage extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/main" component={Login} />
            </Switch>
        );
    }
}

export default RoutePage;