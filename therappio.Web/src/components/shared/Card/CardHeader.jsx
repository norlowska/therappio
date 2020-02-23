import React from 'react';
import PropTypes from 'prop-types';

const CardHeader = ({ className: classes, children, ...rest }) => (
    <div className={['card-header', classes].join(' ')} {...rest}>
        {children}
    </div>
);

CardHeader.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

export default CardHeader;
