import React from 'react';
import PropTypes from 'prop-types';

const FormInput = props => {
    let inputElement = null;
    const {
        type,
        options,
        className,
        error,
        errorMessages,
        ...attributes
    } = props;
    const inputStyle = ['input', className];
    if (errorMessages && errorMessages.length > 0)
        inputStyle.push('invalid-input');
    switch (type) {
        case 'textarea':
            inputElement = (
                <textarea className={inputStyle.join(' ')} {...attributes} />
            );
            break;
        case 'select':
            inputElement = (
                <div className="select-wrapper">
                    <select className={inputStyle.join(' ')} {...attributes}>
                        {options.map((option, index) => (
                            <option
                                key={`option${index}`}
                                value={option.value || option}
                                label={option.displayValue || option}
                            >
                                {option.displayValue || option}
                            </option>
                        ))}
                    </select>
                </div>
            );
            break;
        case 'radio':
            inputElement = (
                <>
                    <input className={inputStyle.join(' ')} type={type} />
                    <label />
                </>
            );
        default:
            inputElement = (
                <input
                    className={inputStyle.join(' ')}
                    type={type}
                    {...attributes}
                />
            );
            break;
    }

    return (
        <React.Fragment>
            {inputElement}
            {errorMessages &&
                errorMessages.length > 0 &&
                errorMessages.map((item, index) => (
                    <div key={`error${index}`} className="error-info">
                        {item}
                    </div>
                ))}
        </React.Fragment>
    );
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
        PropTypes.oneOfType([
            PropTypes.shape({
                value: PropTypes.string,
                displayValue: PropTypes.string,
            }),
            PropTypes.string,
        ])
    ),
    className: PropTypes.string,
};

export default FormInput;
