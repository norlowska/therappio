import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, Col, Row, Alert } from 'antd';
import { userActions } from '../../_actions';
import { FormInput } from '../../components';
import { history } from '../../_utilities';
import styles from './RegisterPage.module.scss';

class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            repeatPassword: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            passwordsDontMatch: false,
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
        const {
            email,
            password,
            repeatPassword,
            phoneNumber,
            firstName,
            lastName,
        } = this.state;
        if (password && repeatPassword && password !== repeatPassword) {
            this.setState({ passwordsDontMatch: true });
        } else {
            if (
                email &&
                password &&
                repeatPassword &&
                password === repeatPassword
            ) {
                this.props.register({
                    email,
                    password,
                    phoneNumber,
                    firstName,
                    lastName,
                    role: 'Therapist',
                });
            }
        }
    }

    render() {
        return (
            <Card className={styles.registerCard}>
                <h2>Sign up</h2>
                <form
                    onSubmit={this.handleSubmit}
                    className={styles.registerForm}
                >
                    {this.state.passwordsDontMatch && (
                        <Row>
                            <Col
                                span={24}
                                className={styles.passwordsDontMatch}
                            >
                                <Alert
                                    message="Passwords don't match. Try again"
                                    type="error"
                                />
                            </Col>
                        </Row>
                    )}
                    <Row gutter={[16, 4]}>
                        <Col span={12}>
                            <div className="formGroup">
                                <label htmlFor="email">E-mail address</label>
                                <FormInput
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Enter your email address"
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="formGroup">
                                <label htmlFor="phoneNumber">
                                    Phone number
                                </label>
                                <FormInput
                                    type="phone"
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    placeholder="Enter your phone number"
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={[16, 4]}>
                        <Col span={12}>
                            <div className="formGroup">
                                <label htmlFor="password">Password</label>
                                <FormInput
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Enter your password"
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="formGroup">
                                <label htmlFor="repeatPassword">
                                    Repeat password
                                </label>
                                <FormInput
                                    type="password"
                                    name="repeatPassword"
                                    id="repeatPassword"
                                    placeholder="Repeat your password"
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={[16, 4]}>
                        <Col span={12}>
                            <div className="formGroup">
                                <label htmlFor="firstName">First name</label>
                                <FormInput
                                    type="short"
                                    name="firstName"
                                    id="firstName"
                                    placeholder="Enter your first name"
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="formGroup">
                                <label htmlFor="lastName">Last name</label>
                                <FormInput
                                    type="short"
                                    name="lastName"
                                    id="lastName"
                                    placeholder="Enter your last name"
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                        </Col>
                    </Row>
                    <button
                        type="submit"
                        className={`${styles.registerBtn} primary-btn`}
                    >
                        Sign up
                    </button>
                    <div className="formFooter">
                        Already have an account?{' '}
                        <Link to="/login">Sign in</Link>
                    </div>
                </form>
            </Card>
        );
    }
}

RegisterPage.propTypes = {
    register: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
    register: userActions.register,
};

export default connect(null, mapDispatchToProps)(RegisterPage);
