import React, { useEffect } from 'react';
import { Router, Switch, Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Layout, Row } from 'antd';
import { history } from '../_utilities';
import { PRIVATE_ROUTE, PUBLIC_ROUTE, RESTRICTED_ROUTE } from '../_constants';
import {
    userActions,
    clientActions,
    assignmentActions,
    therapySessionActions,
    journalRecordActions,
    moodRecordActions,
} from '../_actions';
import { Header, PrivateRoute, PublicRoute, Breadcrumbs } from './index';
import routes from '../routes';
import '../styles/main.scss';

const App = ({
    isAuthenticated,
    getDetails,
    fetchClients,
    fetchAssignments,
    fetchTherapySessions,
    fetchJournalRecords,
    fetchMoodRecords,
}) => {
    useEffect(() => {
        if (isAuthenticated) {
            getDetails();
            fetchClients();
            fetchAssignments();
            fetchTherapySessions();
            fetchJournalRecords();
            fetchMoodRecords();
        }
    }, [isAuthenticated]);

    return (
        <Router history={history}>
            <Layout style={{ height: '100%' }}>
                {isAuthenticated ? <Header /> : null}
                <Layout.Content className="content-container">
                    <Row>{isAuthenticated ? <Breadcrumbs /> : null}</Row>
                    <Switch>
                        {routes.map(route => {
                            switch (route.type) {
                                case PRIVATE_ROUTE:
                                    return (
                                        <PrivateRoute
                                            key={route.path}
                                            exact={route.exact}
                                            path={route.path}
                                            component={route.component}
                                        />
                                    );
                                case PUBLIC_ROUTE:
                                    return (
                                        <PublicRoute
                                            key={route.path}
                                            exact={route.exact}
                                            path={route.path}
                                            component={route.component}
                                        />
                                    );
                                case RESTRICTED_ROUTE:
                                    return (
                                        <PublicRoute
                                            key={route.path}
                                            restricted
                                            exact={route.exact}
                                            path={route.path}
                                            component={route.component}
                                        />
                                    );
                                default:
                                    return (
                                        <Route
                                            key={route.path}
                                            path={route.path}
                                            component={route.component}
                                        />
                                    );
                            }
                        })}
                        <Redirect from="*" to="/404" />
                    </Switch>
                </Layout.Content>
                <Layout.Footer style={{ textAlign: 'center' }}>
                    <div>therapp.io ©2020 Created by Natalia Orłowska</div>
                </Layout.Footer>
            </Layout>
        </Router>
    );
};

App.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    getDetails: PropTypes.func.isRequired,
    fetchClients: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
    getDetails: userActions.getDetails,
    fetchClients: clientActions.fetchClients,
    fetchAssignments: assignmentActions.fetchAssignments,
    fetchTherapySessions: therapySessionActions.fetchTherapySessions,
    fetchJournalRecords: journalRecordActions.fetchJournalRecords,
    fetchMoodRecords: moodRecordActions.fetchMoodRecords,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
