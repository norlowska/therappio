import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Layout, Menu } from 'antd';
import { userActions } from '../../_actions';
import styles from './Header.module.scss';

const Header = ({ logout }) => {
    const [selectedMenuItem, setSelectedMenuItem] = useState(
        location.pathname.split('/')[1]
    );

    const handleLogoutClick = e => {
        handleMenuItemClick(e);
        logout();
    };

    const handleMenuItemClick = e => setSelectedMenuItem(e.key);

    return (
        <Layout.Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className={styles.logo}>therapp.io</div>
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={[selectedMenuItem]}
                style={{ float: 'right' }}
            >
                <Menu.Item key="dashboard" onClick={handleMenuItemClick}>
                    <NavLink to="/">Dashboard</NavLink>
                </Menu.Item>
                <Menu.Item key="clients" onClick={handleMenuItemClick}>
                    <NavLink to="/clients">Patients</NavLink>
                </Menu.Item>
                <Menu.Item key="settings" onClick={handleMenuItemClick}>
                    <i className={'la la-cog'} title="Settings" />
                </Menu.Item>
                <Menu.Item key="logout" onClick={handleLogoutClick}>
                    <i className={'las la-sign-out-alt'} title="Sign out" />
                </Menu.Item>
            </Menu>
        </Layout.Header>
    );
};

Header.propTypes = {
    logout: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
    logout: userActions.logout,
};

export default connect(null, mapDispatchToProps)(Header);
