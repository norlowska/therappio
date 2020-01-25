import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

const Header = () => {
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
                    <a className={`${styles.navLink} ${styles.navLinkIcon}`}>
                        <i className={'las la-sign-out-alt'} title="Sign out" />
                    </a>
                </div>
            </nav>
        </header>
    );
};

export default Header;
