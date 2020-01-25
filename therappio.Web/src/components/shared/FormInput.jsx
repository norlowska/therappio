import React from 'react';
import PropTypes from 'prop-types';

const FormInput = props => {
    let inputElement = null;
    const inputStyle = props.className + ' input';
    const { type, options, ...attributes } = props;

    switch (type) {
        case 'textarea':
            inputElement = <textarea className={inputStyle} {...attributes} />;
            break;
        case 'select':
            inputElement = (
                <div className="select-wrapper">
                    <select className={inputStyle} {...attributes}>
                        {options.map(option => (
                            <option
                                key={option.value}
                                value={option.value}
                                label={option.displayValue}
                            >
                                {option.displayValue}
                            </option>
                        ))}
                    </select>
                </div>
            );
            break;
        case 'radio':
            inputElement = (
                <>
                    <input className={inputStyle} type={type} />
                    <label />
                </>
            );
        default:
            inputElement = (
                <input className={inputStyle} type={type} {...attributes} />
            );
            break;
    }

    return <React.Fragment>{inputElement}</React.Fragment>;
};

FormInput.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.number.isRequired,
        PropTypes.object.isRequired,
    ]),
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string,
            displayValue: PropTypes.string,
        })
    ),
    className: PropTypes.string,
};

export default FormInput;
