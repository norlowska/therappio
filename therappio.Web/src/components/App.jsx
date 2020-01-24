import React, { useEffect } from 'react';
import { Router, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { history } from '../_helpers';
import { userActions } from '../_actions';
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

const App = ({ isAuthenticated, getDetails }) => {
    useEffect(() => {
        if (isAuthenticated) {
            getDetails();
        }
    }, [isAuthenticated]);

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

App.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    getDetails: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
    getDetails: userActions.getDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
