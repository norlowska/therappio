import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '../styles/main.scss';

import {
    DashboardPage,
    PatientsPage,
    LoginPage,
    NewAssignmentPage,
} from './index';
import { PageNotFound, Header } from './';

export default class App extends React.Component {
    render () {
        return (
            <Router>
                <div className="app">
                    <Header />
                    <Switch>
                        <Route exact path="/" component={DashboardPage} />
                        {/* TODO: Access only after login -- PrivateRoute */}
                        <Route path="/patients/:id?" component={PatientsPage} />
                        {/* <Route path="/settings" component={SettingsPage} /> */}
                        <Route path="/login" component={LoginPage} />
                        <Route
                            path="/assignments/new"
                            component={NewAssignmentPage}
                        />
                        <Route component={PageNotFound} />
                    </Switch>
                </div>
            </Router>
        );
    }
}
