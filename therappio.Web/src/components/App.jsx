import React from 'react';
import { Router, Switch, Redirect } from 'react-router-dom';
import { history } from '../_helpers';
import '../styles/main.scss';

import {
    DashboardPage,
    PatientsPage,
    LoginPage,
    NewAssignmentPage,
    PrivateRoute,
    PublicRoute,
} from './index';
import { PageNotFound, Header } from './';
import { connect } from 'react-redux';

const App = ({ isAuthenticated }) => {
    return (
        <Router history={history}>
            <div className="app">
                {isAuthenticated ? <Header /> : null}
                <Switch>
                    <PrivateRoute exact path="/" component={DashboardPage} />
                    <PrivateRoute
                        path="/patients/:id?"
                        component={PatientsPage}
                    />
                    {/* <Route path="/settings" component={SettingsPage} /> */}
                    <PublicRoute
                        restricted
                        path="/login"
                        component={LoginPage}
                    />
                    <PrivateRoute
                        path="/assignments/new"
                        component={NewAssignmentPage}
                    />
                    <PublicRoute component={PageNotFound} />
                    <Redirect from="*" to="/" />
                </Switch>
            </div>
        </Router>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(App);
