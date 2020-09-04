import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';

export default function Tabs({ children }) {
    const [activeTab, setActiveTab] = useState(children[0].props.label);

    const onClickTabItem = tab => {
        setActiveTab(tab);
    };

    return (
        <div className="tabs">
            <ul className="tab-list">
                {children.map(child => (
                    <Tab
                        activeTab={activeTab}
                        key={child.props.label}
                        label={child.props.label}
                        onClick={onClickTabItem}
                    />
                ))}
            </ul>
            <div className="tab-content">
                {children.map(child => {
                    if (child.props.label !== activeTab) return undefined;
                    return child.props.children;
                })}
            </div>
        </div>
    );
}

Tabs.propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
};
