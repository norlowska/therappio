import React from 'react';
import PropTypes from 'prop-types';

const CardFooter = ({ className: classes, children, ...rest }) => (
    <div className={['card-footer', classes].join(' ')} {...rest}>
        {children}
    </div>
);

CardFooter.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

export default CardFooter;
