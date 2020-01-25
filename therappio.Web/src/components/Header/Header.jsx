import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userActions } from '../../_actions';
import styles from './Header.module.scss';

const Header = props => {
    const logout = () => {
        props.logout();
    };

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.logo}>therapp.io</div>
                <div className={styles.navGroupCenter}>
                    <NavLink
                        exact
                        to="/"
                        className={styles.navLink}
                        activeClassName={styles.navLinkActive}
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        to="/patients"
                        className={styles.navLink}
                        activeClassName={styles.navLinkActive}
                    >
                        Patients
                    </NavLink>
                </div>
                <div className={styles.navGroupRight}>
                    <a className={`${styles.navLink} ${styles.navLinkIcon}`}>
                        <i className={'las la-search'} title="Search" />
                    </a>
                    <NavLink
                        to="/settings"
                        className={`${styles.navLink} ${styles.navLinkIcon}`}
                        activeClassName={styles.navLinkActive}
                    >
                        <i className={'la la-cog'} title="Settings" />
                    </NavLink>
                    <button
                        className={`primary-btn ${styles.navLink} ${styles.navLinkIcon}`}
                        onClick={logout}
                    >
                        <i className={'las la-sign-out-alt'} title="Sign out" />
                    </button>
                </div>
            </nav>
        </header>
    );
};

Header.propTypes = {
    logout: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
    logout: userActions.logout,
};

export default connect(null, mapDispatchToProps)(Header);
