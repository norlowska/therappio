import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { userActions } from '../../_actions';
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
        // this.setState({ submitted: true });
        const { email, password } = this.state;
        if (email && password) {
            this.props.login(email, password);
        }
    }

    render() {
        return (
            <Card className={styles.loginCard}>
                <h2>Sign in</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="formGroup">
                        <label htmlFor="email">E-mail address</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email address"
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <div className="formGroup">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="primary-btn">
                        Sign in
                    </button>
                    <div className="formFooter">
                        <Link to="#">Forgot password?</Link>
                    </div>
                </form>
            </Card>
        );
    }
}

LoginPage.propTypes = {
    login: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
    login: userActions.login,
};

export default connect(null, mapDispatchToProps)(LoginPage);
