import React, { useEffect } from 'react';
import { Router, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { history, routes } from '../_utilities';
import { PRIVATE_ROUTE, PUBLIC_ROUTE, RESTRICTED_ROUTE } from '../_constants';
import { userActions, clientActions } from '../_actions';
import { Header, PrivateRoute, PublicRoute } from './index';
import '../styles/main.scss';

const App = ({ isAuthenticated, clients, getDetails, getClients }) => {
    useEffect(() => {
        if (isAuthenticated) {
            getDetails();
            getClients();
        }
    }, [isAuthenticated]);

    return (
        <Router history={history}>
            <Layout style={{ height: '100vh' }}>
                {isAuthenticated ? <Header /> : null}
                <Layout.Content className="content-container">
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
                            }
                        })}
                        <Redirect from="*" to="/404" />
                    </Switch>
                </Layout.Content>
            </Layout>
        </Router>
    );
};

App.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    getDetails: PropTypes.func.isRequired,
    getClients: PropTypes.func.isRequired,
    clients: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    clients: state.clients.items,
});

const mapDispatchToProps = {
    getDetails: userActions.getDetails,
    getClients: clientActions.getAll,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
