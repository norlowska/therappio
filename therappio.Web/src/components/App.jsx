import React, { useEffect } from 'react';
import { Router, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { history } from '../_helpers';
import { userActions, clientActions } from '../_actions';
import '../styles/main.scss';

import {
    DashboardPage,
    ClientsPage,
    LoginPage,
    AssignmentPage,
    NewAssignmentPage,
    PrivateRoute,
    PublicRoute,
} from './index';
import { PageNotFound, Header } from './';

const App = ({ isAuthenticated, getDetails, getClients }) => {
    useEffect(() => {
        if (isAuthenticated) {
            getDetails();
        }
    }, [isAuthenticated]);

    // Fetch clients
    useEffect(() => {
        getClients();
    }, []);

    return (
        <Router history={history}>
            <div className="app">
                {isAuthenticated ? <Header /> : null}
                <Switch>
                    <PrivateRoute exact path="/" component={DashboardPage} />
                    <PrivateRoute
                        exact
                        path="/clients/:clientId?"
                        component={ClientsPage}
                    />
                    <PrivateRoute
                        exact
                        path="/clients/:clientId/assignments/new"
                        component={NewAssignmentPage}
                    />
                    <PrivateRoute
                        exact
                        path="/clients/:clientId/assignment/:assignmentId"
                        component={AssignmentPage}
                    />
                    {/* <Route path="/settings" component={SettingsPage} /> */}
                    <PublicRoute
                        restricted
                        path="/login"
                        component={LoginPage}
                    />

                    <PublicRoute component={PageNotFound} />
                    <Redirect from="*" to="/" />
                </Switch>
            </div>
        </Router>
    );
};

App.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    getDetails: PropTypes.func.isRequired,
    getClients: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
    getDetails: userActions.getDetails,
    getClients: clientActions.getAll,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
