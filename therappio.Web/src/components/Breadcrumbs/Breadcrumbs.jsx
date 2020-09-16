import React from 'react';
import { NavLink } from 'react-router-dom';
import { Breadcrumb } from 'antd';

import withBreadcrumbs from 'react-router-breadcrumbs-hoc';
import routes from '../../routes';

const Breadcrumbs = ({ breadcrumbs }) => {
    return (
        <div className="breadcrumbs-wrapper">
            <Breadcrumb separator="&#187;">
                {breadcrumbs.map(({ breadcrumb }, index) =>
                    index < breadcrumbs.length - 1 ? (
                        <Breadcrumb.Item key={breadcrumb.key}>
                            <NavLink to={breadcrumb.key}>{breadcrumb}</NavLink>
                        </Breadcrumb.Item>
                    ) : (
                        <Breadcrumb.Item key={breadcrumb.key}>
                            {breadcrumb}
                        </Breadcrumb.Item>
                    )
                )}
            </Breadcrumb>
        </div>
    );
};

export default withBreadcrumbs(routes)(Breadcrumbs);
