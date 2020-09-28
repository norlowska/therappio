import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import validator from 'validator';
import { Card, Col, Row, Alert } from 'antd';
import { userActions } from '../../_actions';
import { FormInput } from '../../components';
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
            errorMessages: {
                email: [],
                password: [],
                repeatPassword: [],
                firstName: [],
                lastName: [],
                phoneNumber: [],
            },
            validForm: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    }

    handleBlur(event) {
        const { value, name } = event.target;
        const newErrorMessages = { ...this.state.errorMessages, [name]: [] };
        if (value) {
            switch (name) {
                case 'email':
                    if (!validator.isEmail(value))
                        newErrorMessages[name].push(
                            'E-mail address is invalid'
                        );
                    break;
                case 'phoneNumber':
                    if (!validator.isMobilePhone(value))
                        newErrorMessages[name].push('Phone number is invalid');
                    break;
                case 'repeatPassword':
                    const { password, repeatPassword } = this.state;
                    if (
                        !password ||
                        !repeatPassword ||
                        !validator.equals(password, repeatPassword)
                    ) {
                        newErrorMessages.password.push(
                            "Passwords don't match. Try again."
                        );
                    }
                    break;
                case 'firstName':
                    if (!validator.isAlpha(value))
                        newErrorMessages[name].push(
                            'First name should contain only letters'
                        );
                    break;
                case 'lastName':
                    if (!validator.matches(value, /^[a-z-]+$/i))
                        newErrorMessages[name].push(
                            "Last name should contain only letters and '-'"
                        );
                    break;
            }
        }

        let newValidForm = true;

        Object.keys(newErrorMessages).forEach(item => {
            if (
                (item === name && !value) ||
                !this.state[item] ||
                newErrorMessages[item].length > 0
            )
                newValidForm = false;
        });

        this.setState({
            errorMessages: newErrorMessages,
            validForm: newValidForm,
        });
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
            errorMessages,
        } = this.state;
        if (
            !email ||
            !password ||
            !repeatPassword ||
            !phoneNumber ||
            !firstName ||
            !lastName
        ) {
            const newErrorMessages = { ...errorMessages };
            Object.keys(this.state).map(item => {
                if (
                    item !== 'errorMessages' &&
                    item !== 'validForm' &&
                    !this.state[item]
                ) {
                    let propertyName = item.replace(
                        /([a-z\d])([A-Z])/g,
                        `${1} ${2}`
                    );
                    propertyName =
                        propertyName.charAt(0).toUpperCase() +
                        propertyName.slice(1);
                    newErrorMessages[item].push(`${propertyName} is required`);

                    this.setState({ errorMessages: newErrorMessages });
                }
            });
        } else {
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

    render() {
        const { errorMessages, validForm } = this.state;
        return (
            <Card className={styles.registerCard}>
                <h2>Sign up</h2>
                <form
                    onSubmit={this.handleSubmit}
                    className={styles.registerForm}
                >
                    <Row gutter={[16, 4]}>
                        <Col span={12}>
                            <div className="formGroup">
                                <label htmlFor="email">
                                    E-mail address
                                    <span
                                        className="required-icon"
                                        title="Field required"
                                    >
                                        {' '}
                                        *
                                    </span>
                                </label>
                                <FormInput
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Enter your email address"
                                    onChange={this.handleChange}
                                    onBlur={this.handleBlur}
                                    errorMessages={errorMessages['email']}
                                    required
                                />
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="formGroup">
                                <label htmlFor="phoneNumber">
                                    Phone number
                                    <span
                                        className="required-icon"
                                        title="Field required"
                                    >
                                        {' '}
                                        *
                                    </span>
                                </label>
                                <FormInput
                                    type="phone"
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    placeholder="Enter your phone number"
                                    onChange={this.handleChange}
                                    onBlur={this.handleBlur}
                                    errorMessages={errorMessages['phoneNumber']}
                                    required
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={[16, 4]}>
                        <Col span={12}>
                            <div className="formGroup">
                                <label htmlFor="password">
                                    Password{' '}
                                    <span
                                        className="required-icon"
                                        title="Field required"
                                    >
                                        {' '}
                                        *
                                    </span>
                                </label>
                                <FormInput
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Enter your password"
                                    onBlur={this.handleBlur}
                                    onChange={this.handleChange}
                                    errorMessages={errorMessages['password']}
                                    required
                                />
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="formGroup">
                                <label htmlFor="repeatPassword">
                                    Repeat password{' '}
                                    <span
                                        className="required-icon"
                                        title="Field required"
                                    >
                                        {' '}
                                        *
                                    </span>
                                </label>
                                <FormInput
                                    type="password"
                                    name="repeatPassword"
                                    id="repeatPassword"
                                    placeholder="Repeat your password"
                                    onBlur={this.handleBlur}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={[16, 4]}>
                        <Col span={12}>
                            <div className="formGroup">
                                <label htmlFor="firstName">
                                    First name{' '}
                                    <span
                                        className="required-icon"
                                        title="Field required"
                                    >
                                        {' '}
                                        *
                                    </span>
                                </label>
                                <FormInput
                                    type="short"
                                    name="firstName"
                                    id="firstName"
                                    placeholder="Enter your first name"
                                    onChange={this.handleChange}
                                    errorMessages={errorMessages['firstName']}
                                    onBlur={this.handleBlur}
                                    required
                                />
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="formGroup">
                                <label htmlFor="lastName">
                                    Last name{' '}
                                    <span
                                        className="required-icon"
                                        title="Field required"
                                    >
                                        {' '}
                                        *
                                    </span>
                                </label>
                                <FormInput
                                    type="short"
                                    name="lastName"
                                    id="lastName"
                                    placeholder="Enter your last name"
                                    onChange={this.handleChange}
                                    onBlur={this.handleBlur}
                                    errorMessages={errorMessages['lastName']}
                                    required
                                />
                            </div>
                        </Col>
                    </Row>
                    <button
                        type="submit"
                        className={`primary-btn${
                            !validForm ? ' primary-btn-disabled' : ''
                        }`}
                        disabled={!this.state.validForm}
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
