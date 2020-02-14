import React, { useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { FormInput } from '../../index';
import AnswerFields from './AnswerFields/AnswerFields';
import style from './FormBuilder.module.scss';

const FormBuilder = ({ onSubmit }) => {
    const questionTypeOptions = [
        { displayValue: 'Short text', value: 'short' },
        { displayValue: 'Long text', value: 'long' },
        { displayValue: 'Number', value: 'number' },
        { displayValue: 'Slider', value: 'slider' },
        { displayValue: 'Single choice', value: 'single-choice' },
        { displayValue: 'Multiple choice', value: 'multi-choice' },
        { displayValue: 'Dropdown', value: 'select' },
        { displayValue: 'Date', value: 'date' },
        { displayValue: 'Time', value: 'time' },
        { displayValue: 'Date and time', value: 'datetime' },
    ];
    const [formName, setFormName] = useState('Form name');
    const [items, setItems] = useState([
        {
            question: 'Question (e.g. What are you worried about?)',
            type: 'short',
        },
    ]);
    const [dueDate, setDueDate] = useState(
        moment(new Date())
            .add(7, 'days')
            .format()
            .substr(0, 16)
    );

    const setQuestion = (index, newQuestion) => {
        const newItems = [...items];
        newItems[index].question = newQuestion;
        setItems(newItems);
    };

    const setQuestionType = (index, newQuestionType) => {
        const newItems = [...items];
        newItems[index].type = newQuestionType;
        setItems(newItems);
    };

    const addQuestion = () => {
        const index = items.length + 1;

        setItems([
            ...items,
            {
                question: `Task ${index}`,
                type: 'short',
            },
        ]);
    };

    const addOption = (questionIndex = 0, value = '') => {
        const newItems = [...items];
        const options = newItems[questionIndex].options
            ? newItems[questionIndex].options
            : [];
        options.push(value);
        newItems[questionIndex].options = options;
        setItems(newItems);
    };

    const setOptionValue = (questionIndex, optionIndex, optionValue) => {
        const newItems = [...items];
        console.log(questionIndex, optionIndex);
        console.log(newItems[questionIndex].options);

        newItems[questionIndex].options[optionIndex] = optionValue;
        setItems(newItems);
    };

    const saveAssignment = event => {
        event.preventDefault();
        onSubmit({ title: formName, fields: items, dueDate });
    };

    return (
        <div className="assignment-container">
            <form className={`clearfix`} onSubmit={saveAssignment}>
                <div className={`formGroup ${style.formName}`}>
                    <FormInput
                        type="text"
                        value={formName}
                        name="form-name"
                        onChange={e => setFormName(e.target.value)}
                    />
                </div>
                <div className={style.formQuestions}>
                    {items.map((field, index) => (
                        <div className={style.formItem} key={index + 1}>
                            <div className={style.question}>
                                <div className={'formGroup'}>
                                    <FormInput
                                        type="textarea"
                                        value={field.question}
                                        name={`q${index + 1}`}
                                        onChange={e =>
                                            setQuestion(index, e.target.value)
                                        }
                                    />
                                </div>
                                <div className={'formGroup'}>
                                    <FormInput
                                        type="select"
                                        value={field.type.value}
                                        name={`q${index + 1}Type`}
                                        options={questionTypeOptions}
                                        onChange={e =>
                                            setQuestionType(
                                                index,
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            </div>
                            <AnswerFields
                                questionType={field.type}
                                questionIndex={index}
                                options={field.options}
                                addOption={addOption}
                                setOptionValue={setOptionValue}
                            />
                        </div>
                    ))}
                    <button
                        className={style.addQuestion}
                        onClick={addQuestion}
                        type="button"
                    >
                        <i className="la la-plus" title="Add question" />
                    </button>
                </div>
                <div className={style.formFooter}>
                    <label>
                        Due date
                        <input
                            type="datetime-local"
                            defaultValue={dueDate}
                            name="dueDate"
                            onChange={e => setDueDate(e.target.value)}
                        />
                    </label>
                    <button
                        className={`primary-btn ${style.saveAssignmentBtn}`}
                        type="submit"
                    >
                        Save assignment
                    </button>
                </div>
            </form>
        </div>
    );
};

FormBuilder.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default FormBuilder;
