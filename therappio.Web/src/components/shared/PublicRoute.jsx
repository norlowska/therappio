import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PublicRoute = ({
    component: Component,
    isAuthenticated,
    restricted,
    ...rest
}) => {
    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated && restricted ? (
                    <Redirect to="/" />
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
};

PublicRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    restricted: PropTypes.bool,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(PublicRoute);
