import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './LoginPage.module.scss';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };

        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    onChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    onSave(event) {
        event.preventDefault();

        // this.setState({ submitted: true });
        const { email, password } = this.state;
        if (email && password) {
            this.props.login(email, password);
        }
    }

    render() {
        return (
            <main>
                <div className={`card ${styles.loginCard}`}>
                    <h2>Sign in</h2>
                    <form>
                        <div className="formGroup">
                            <label htmlFor="email">E-mail address</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter your email address"
                                onChange={this.onChange}
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
                                onChange={this.onChange}
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
                </div>
            </main>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login,
        logout,
    };
};

export default connect(null, mapDispatchToProps)(LoginPage);
