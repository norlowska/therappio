import React from 'react';
import PropTypes from 'prop-types';

const CardFooter = ({ imageSrc, alt, className: classes, ...rest }) => (
    <div className={['card-header-img', classes].join(' ')} {...rest}>
        <img src={imageSrc} alt={alt} />
    </div>
);

CardFooter.propTypes = {
    imageSrc: PropTypes.string.isRequired,
    alt: PropTypes.string,
    className: PropTypes.string,
};

export default CardFooter;
