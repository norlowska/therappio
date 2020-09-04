import React from 'react';
import PropTypes from 'prop-types';

const CardBody = ({ className: classes, children, ...rest }) => (
    <div className={['card-body', classes].join(' ')} {...rest}>
        {children}
    </div>
);

CardBody.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

export default CardBody;
