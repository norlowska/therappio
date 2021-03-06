import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, Col, Alert, Spin } from 'antd';
import { userActions } from '../../_actions';
import { FormInput } from '../../components';
import styles from './LoginPage.module.scss';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { email, password } = this.state;
        if (email && password) {
            this.props.login(email, password);
        }
    }
    render() {
        const queryParamsArr = this.props.location.search
            .replace('?', '')
            .split('=');
        const queryParams = { [queryParamsArr[0]]: queryParamsArr[1] };
        return (
            <Col align="center">
                <Card className={styles.loginCard}>
                    <h2>Sign in</h2>
                    <form
                        onSubmit={this.handleSubmit}
                        className={styles.loginForm}
                    >
                        {queryParams['registration'] === 'true' && (
                            <Alert
                                message="Registration successful. You can login now."
                                type="success"
                            />
                        )}
                        {queryParams['unauthorized'] === 'true' && (
                            <Alert
                                message="You are not authorized to access the resource."
                                type="error"
                            />
                        )}
                        <div className="formGroup">
                            <label htmlFor="email">E-mail address</label>
                            <FormInput
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter your email address"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="password">Password</label>
                            <FormInput
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter your password"
                                onChange={this.handleChange}
                            />
                        </div>
                        <button type="submit" className="primary-btn">
                            {this.props.isFetching ? <Spin /> : 'Sign in'}
                        </button>
                        <div className="formFooter">
                            New user? <Link to="/register">Sign up</Link>
                        </div>
                    </form>
                </Card>
            </Col>
        );
    }
}

LoginPage.propTypes = {
    login: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
    error: state.auth.errorMessage,
    isFetching: state.auth.isFetching,
});

const mapDispatchToProps = {
    login: userActions.login,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
