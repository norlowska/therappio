/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Card, Button } from 'antd';
import { format, addDays } from 'date-fns';
import { assignmentActions } from '../../_actions';
import { selectAssignment } from '../../_selectors';
import AnswerFields from './AnswerFields/AnswerFields';
import { FormInput } from '../../components';
import style from './AssignmentFormPage.module.scss';

const AssignmentFormPage = ({
    assignment,
    createAssignment,
    updateAssignment,
    match,
    editMode = false,
}) => {
    const [title, setTitle] = useState('Assignment title');
    const [fields, setFields] = useState([
        {
            question: 'Question (e.g. What are you worried about?)',
            type: 'short',
        },
    ]);
    const [dueDate, setDueDate] = useState(
        format(addDays(new Date(), 7), "yyyy-MM-dd'T'HH:mm")
    );

    const questionTypeOptions = useMemo(
        () => [
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
        ],
        []
    );

    useEffect(() => {
        if (editMode && assignment) {
            setTitle(assignment.title);
            setFields(assignment.fields);
            setDueDate(
                format(new Date(assignment.dueDate), "yyyy-MM-dd'T'HH:mm")
            );
        }
    }, [assignment]);

    const saveAssignment = event => {
        event.preventDefault();
        const newAssignment = {
            title,
            fields,
            dueDate,
        };
        if (editMode) {
            updateAssignment(
                { ...assignment, ...newAssignment },
                match.params.patientId
            );
        } else {
            createAssignment({
                ...newAssignment,
                createdAt: new Date(),
                patient: match.params.patientId,
            });
        }
    };

    const addQuestion = () => {
        const index = fields.length + 1;

        setFields([
            ...fields,
            { question: `Question ${index}`, type: 'short' },
        ]);
    };

    const setQuestion = (index, newQuestion, newQuestionType) => {
        const newFields = [...fields];
        newFields[index].question = newQuestion;
        newFields[index].type = newQuestionType;
        setFields(newFields);
    };

    const addOption = (questionIndex = 0, value = '') => {
        const options = fields[questionIndex].options
            ? [...fields[questionIndex].options, value]
            : [value];

        const newFields = [...fields];
        newFields[questionIndex].options = options;
        setFields(newFields);
    };

    const setOptionValue = (questionIndex, optionIndex, optionValue) => {
        const newFields = [...fields];
        newFields[questionIndex].options[optionIndex] = optionValue;
        setFields(newFields);
    };

    const deleteOption = (questionIndex, optionIndex) => {
        const newFields = [...fields];
        newFields[questionIndex].options.splice(optionIndex, 1);
        setFields(newFields);
    };

    const deleteQuestion = index => {
        setFields(fields.filter((item, idx) => index !== idx));
    };

    const titleInput = (
        <div className={`${style.formName}`}>
            <FormInput
                type="text"
                value={title}
                name="form-name"
                onChange={e => setTitle(e.target.value)}
            />
        </div>
    );

    return (
        <Card title={titleInput} className="center-container">
            <div className="assignment-container">
                <form className={`clearfix`} onSubmit={saveAssignment}>
                    <div className={style.formQuestions}>
                        {fields &&
                            fields.map((field, index) => (
                                <div className={style.formItem} key={index + 1}>
                                    <div className={style.question}>
                                        <div className={'formGroup'}>
                                            <FormInput
                                                type="textarea"
                                                value={field.question}
                                                name={`q${index + 1}`}
                                                onChange={e =>
                                                    setQuestion(
                                                        index,
                                                        e.target.value,
                                                        field.type
                                                    )
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
                                                    setQuestion(
                                                        index,
                                                        field.question,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className={'formGroup'}>
                                            <Button
                                                danger
                                                type="link"
                                                shape="circle"
                                                onClick={() =>
                                                    deleteQuestion(index)
                                                }
                                                icon={
                                                    <i
                                                        className="las la-trash icon"
                                                        title="Delete assignment"
                                                    />
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
                                        deleteOption={deleteOption}
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
                                value={dueDate}
                                name="dueDate"
                                className="input"
                                onChange={e => setDueDate(e.target.value)}
                            />
                        </label>
                        <div className={'buttons-group'}>
                            <NavLink to={`/patients/${match.params.patientId}`}>
                                <Button>Cancel</Button>
                            </NavLink>
                            <Button onClick={saveAssignment} type="primary">
                                Save assignment
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </Card>
    );
};

AssignmentFormPage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            // patientId: PropTypes.string.isRequired,
            assignmentId: PropTypes.string,
        }),
    }),
    createAssignment: PropTypes.func.isRequired,
    updateAssignment: PropTypes.func.isRequired,
    editMode: PropTypes.bool,
};

const mapStateToProps = (state, props) => ({
    assignment: selectAssignment(state, props.match.params.assignmentId),
});

const mapDispatchToProps = {
    createAssignment: assignmentActions.createAssignment,
    updateAssignment: assignmentActions.updateAssignment,
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentFormPage);
