import React from 'react';
import PropTypes from 'prop-types';

export default function Tab({ activeTab, label, onClick }) {
    let className = 'tab-list-item';
    if (activeTab === label) {
        className += ' tab-list-active';
    }

    const handleClick = () => {
        onClick(label);
    };

    return (
        <li className={className} onClick={handleClick}>
            {label}
        </li>
    );
}

Tab.propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};
