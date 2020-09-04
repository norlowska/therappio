import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ className: classes, children, ...rest }) => {
    return (
        <div className={['card-section', classes].join(' ')} {...rest}>
            {children}
        </div>
    );
};

Card.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

export default Card;
