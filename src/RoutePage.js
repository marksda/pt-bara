import React from 'react';
import { Route, Switch } from "react-router-dom";
import Home from './components/pages/Home';

class RoutePage extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
            </Switch>
        );
    }
}

export default RoutePage;