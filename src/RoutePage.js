import React from 'react';
import { Route, Switch } from "react-router-dom";
import Login from './components/pages/Login';

class RoutePage extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Login} />
            </Switch>
        );
    }
}

export default RoutePage;