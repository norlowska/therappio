// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormInput } from '../../../components';
import style from './AnswerFields.module.scss';

const AnswerFields = ({
    questionType,
    questionIndex,
    options,
    addOption,
    setOptionValue,
    deleteOption,
}) => {
    const [numberBounds, setNumberBounds] = useState([0, 100]);
    // eslint-disable-next-line no-unused-vars

    useEffect(() => {
        if (
            (questionType === 'single-choice' ||
                questionType === 'multi-choice' ||
                questionType === 'select') &&
            (!options || !options.length)
        ) {
            addOption(questionIndex, 'Option 1');
            addOption(questionIndex, 'Option 2');
        }
    }, [questionType]);

    const answerFields = () => {
        switch (questionType) {
            case 'short':
                return (
                    <div className={'formGroup'}>
                        <FormInput
                            key={questionIndex + 1}
                            name={`q${questionIndex + 1}a0`}
                            type="text"
                            value="Short-answer text"
                            disabled
                        />
                    </div>
                );
            case 'long':
                return (
                    <div className={'formGroup'}>
                        <FormInput
                            key={questionIndex + 1}
                            name={`q${questionIndex + 1}a0`}
                            type="textarea"
                            value="Long-answer text"
                            rows={4}
                            disabled
                        />
                    </div>
                );
            case 'number':
                return (
                    <div className={`${style.withConfigInput} ${style.number}`}>
                        <div className={`formGroup`}>
                            <FormInput
                                key={questionIndex + 1}
                                name={`q${questionIndex + 1}a0`}
                                type="number"
                                value={numberBounds[0]}
                                min={numberBounds[0]}
                                max={numberBounds[1]}
                                disabled
                            />
                        </div>
                        <div className={'formGroup'}>
                            <label>Min</label>

                            <FormInput
                                key={questionIndex + 1}
                                name={`q${questionIndex + 1}min`}
                                type="number"
                                value={numberBounds[0]}
                                min={numberBounds[0]}
                                max={numberBounds[1]}
                                onChange={e =>
                                    setNumberBounds([
                                        e.target.value,
                                        numberBounds[1],
                                    ])
                                }
                            />
                        </div>
                        <div className={'formGroup'}>
                            <label>Max</label>
                            <FormInput
                                key={questionIndex + 1}
                                name={`q${questionIndex + 1}max`}
                                type="number"
                                value={numberBounds[1]}
                                onChange={e =>
                                    setNumberBounds([
                                        numberBounds[0],
                                        e.target.value,
                                    ])
                                }
                            />
                        </div>
                    </div>
                );
            case 'single-choice':
                return (
                    <div className={`formGroup`}>
                        {options &&
                            options.map((option, index) => (
                                <div className={style.option} key={index + 1}>
                                    <div className={style.optionValueInput}>
                                        <FormInput
                                            name={`q${questionIndex + 1}a0`}
                                            type="radio"
                                            disabled
                                        />
                                        <FormInput
                                            type="text"
                                            name={`q${questionIndex + 1}a0opt${
                                                index + 1
                                            }`}
                                            value={option}
                                            onChange={e =>
                                                setOptionValue(
                                                    questionIndex,
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    {options.length > 1 ? (
                                        <button
                                            className="icon-btn"
                                            onClick={() =>
                                                deleteOption(
                                                    questionIndex,
                                                    index
                                                )
                                            }
                                        >
                                            <i
                                                className="la la-times"
                                                title="Delete option"
                                            />
                                        </button>
                                    ) : null}
                                </div>
                            ))}
                        <button
                            type="button"
                            className={style.addOption}
                            onClick={() =>
                                addOption(
                                    questionIndex,
                                    `Option ${options.length + 1}`
                                )
                            }
                        >
                            <i className="la la-plus" title="Add option" />
                            Add option
                        </button>
                    </div>
                );
            case 'multi-choice':
                return (
                    <div className={'formGroup'}>
                        {options &&
                            options.map((option, index) => (
                                <div className={style.option} key={index + 1}>
                                    <div className={style.optionValueInput}>
                                        <FormInput
                                            name={`q${questionIndex + 1}a0`}
                                            type="checkbox"
                                            disabled
                                        />
                                        <FormInput
                                            type="text"
                                            name={`q${questionIndex + 1}a0opt${
                                                index + 1
                                            }`}
                                            value={option}
                                            onChange={e =>
                                                setOptionValue(
                                                    questionIndex,
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    {options.length > 1 ? (
                                        <button
                                            className="icon-btn"
                                            onClick={() =>
                                                deleteOption(
                                                    questionIndex,
                                                    index
                                                )
                                            }
                                        >
                                            <i
                                                className="la la-times"
                                                title="Delete option"
                                            />
                                        </button>
                                    ) : null}
                                </div>
                            ))}
                        <button
                            type="button"
                            className={style.addOption}
                            onClick={() =>
                                addOption(
                                    questionIndex,
                                    `Option ${options.length + 1}`
                                )
                            }
                        >
                            <i className="la la-plus" title="Add option" />
                            Add option
                        </button>
                    </div>
                );
                break;
            case 'select':
                return (
                    <ul className={'formGroup'}>
                        {options &&
                            options.map((option, index) => (
                                <li
                                    className={`${style.option}`}
                                    key={index + 1}
                                >
                                    <div className={style.optionValueInput}>
                                        <FormInput
                                            type="text"
                                            name={`q${questionIndex + 1}a0opt${
                                                index + 1
                                            }`}
                                            value={option}
                                            onChange={e =>
                                                setOptionValue(
                                                    questionIndex,
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    {options.length > 1 ? (
                                        <button
                                            className="icon-btn"
                                            onClick={() =>
                                                deleteOption(
                                                    questionIndex,
                                                    index
                                                )
                                            }
                                        >
                                            <i
                                                className="la la-times"
                                                title="Delete option"
                                            />
                                        </button>
                                    ) : null}
                                </li>
                            ))}
                        <button
                            type="button"
                            className={style.addOption}
                            onClick={() =>
                                addOption(
                                    questionIndex,
                                    `Option ${options.length + 1}`
                                )
                            }
                        >
                            <i className="la la-plus" title="Add option" />
                            Add option
                        </button>
                    </ul>
                );
            case 'date':
                return (
                    <div className={'formGroup'}>
                        <FormInput
                            key={questionIndex + 1}
                            name={`q${questionIndex + 1}a0`}
                            type="date"
                            value={new Date().toISOString().slice(0, 10)}
                            disabled
                        />
                    </div>
                );
            case 'datetime':
                return (
                    <div className={'formGroup'}>
                        <FormInput
                            key={questionIndex + 1}
                            name={`q${questionIndex + 1}a0`}
                            type="datetime-local"
                            value={`${new Date()
                                .toISOString()
                                .slice(0, 10)}T00:00`}
                            disabled
                        />
                    </div>
                );
            case 'time':
                return (
                    <div className={'formGroup'}>
                        <FormInput
                            key={questionIndex + 1}
                            name={`q${questionIndex + 1}a0`}
                            type="time"
                            value="00:00"
                            disabled
                        />
                    </div>
                );
            case 'slider':
                return (
                    <div className={`${style.withConfigInput} ${style.slider}`}>
                        <div className={'formGroup'}>
                            <FormInput
                                key={questionIndex + 1}
                                name={`q${questionIndex + 1}a0`}
                                type="range"
                                value={(numberBounds[0] + numberBounds[1]) / 2}
                                disabled
                            />
                        </div>
                        <div className={'formGroup'}>
                            <label>Min</label>
                            <FormInput
                                key={questionIndex + 1}
                                name={`q${questionIndex + 1}min`}
                                type="number"
                                value={numberBounds[0]}
                                min={numberBounds[0]}
                                max={numberBounds[1]}
                                onChange={e =>
                                    setNumberBounds([
                                        e.target.value,
                                        numberBounds[1],
                                    ])
                                }
                            />
                        </div>
                        <div className={'formGroup'}>
                            <label>Max</label>
                            <FormInput
                                key={questionIndex + 1}
                                name={`q${questionIndex + 1}max`}
                                type="number"
                                value={numberBounds[1]}
                                onChange={e =>
                                    setNumberBounds([
                                        numberBounds[0],
                                        e.target.value,
                                    ])
                                }
                            />
                        </div>
                    </div>
                );
        }
    };

    return <div className={style.answer}>{answerFields()}</div>;
};

AnswerFields.propTypes = {
    questionType: PropTypes.string.isRequired,
    questionIndex: PropTypes.number.isRequired,
    options: PropTypes.array,
    addOption: PropTypes.func,
    setOptionValue: PropTypes.func,
    deleteOption: PropTypes.func,
};

export default AnswerFields;
