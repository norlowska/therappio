import React, { useState } from 'react';
import { FormInput } from '../../index';
import AnswerFields from './AnswerFields/AnswerFields';
import style from './FormBuilder.module.scss';

const FormBuilder = () => {
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
    // eslint-disable-next-line no-unused-vars
    const [formName, setFormName] = useState('Form name');
    // eslint-disable-next-line no-unused-vars
    const [items, setItems] = useState([
        {
            question: 'What are you worried about?',
            questionType: 'short',
        },
    ]);

    const setQuestion = (index, newQuestion) => {
        const newItems = [...items];
        newItems[index].question = newQuestion;
        setItems(newItems);
    };

    const setQuestionType = (index, newQuestionType) => {
        const newItems = [...items];
        newItems[index].questionType = newQuestionType;
        setItems(newItems);
    };

    const addQuestion = () => {
        const index = items.length + 1;

        setItems([
            ...items,
            {
                question: `Task ${index}`,
                questionType: 'short',
            },
        ]);
    };

    const saveAssignment = () => {
        console.log(items);
    };

    return (
        <div className={style.container}>
            <form className={`clearfix`}>
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
                                        value={field.questionType.value}
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
                                questionType={field.questionType}
                                questionIndex={index}
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
                <button
                    className={`primary-btn ${style.saveAssignmentBtn}`}
                    onClick={saveAssignment}
                    type="submit"
                >
                    Save assignment
                </button>
            </form>
        </div>
    );
};

export default FormBuilder;
