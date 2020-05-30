/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { clientActions } from '../../_actions';
import { history } from '../../_helpers';
import AnswerFields from './AnswerFields/AnswerFields';
import FormInput from '../shared/FormInput';
import style from './AssignmentFormPage.module.scss';

const AssignmentFormPage = ({
    match,
    clients,
    createAssignment,
    updateAssignment,
    editMode = false,
}) => {
    const [id, setId] = useState(null);
    const [title, setTitle] = useState('Assignment title');
    const [fields, setFields] = useState([
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
        const selectedClient = clients.find(
            client => client._id === match.params.clientId
        );

        const assignment = selectedClient.assignments.find(
            assignment => assignment._id === match.params.assignmentId
        );

        if (editMode) {
            setId(assignment._id);
            setTitle(assignment.title);
            setFields(assignment.fields);
            setDueDate(moment(assignment.dueDate).format().substr(0, 16));
        }
    }, [match.params.clientId, clients]);

    const saveAssignment = event => {
        event.preventDefault();
        const newAssignment = {
            title,
            fields,
            dueDate,
        };
        if (editMode) {
            updateAssignment(
                { ...newAssignment, _id: id },
                match.params.clientId
            );
        } else {
            createAssignment(newAssignment);
        }

        history.push(`/clients/${match.params.clientId}`);
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

    return (
        <main className="center-container">
            <div className="assignment-container">
                <form className={`clearfix`} onSubmit={saveAssignment}>
                    <div className={`formGroup ${style.formName}`}>
                        <FormInput
                            type="text"
                            value={title}
                            name="form-name"
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                    <div className={style.formQuestions}>
                        {fields.map((field, index) => (
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
        </main>
    );
};

AssignmentFormPage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            clientId: PropTypes.string.isRequired,
            assignmentId: PropTypes.string,
        }),
    }),
    clients: PropTypes.arrayOf(PropTypes.object).isRequired,
    createAssignment: PropTypes.func.isRequired,
    updateAssignment: PropTypes.func.isRequired,
    editMode: PropTypes.bool,
};

const mapStateToProps = state => ({ clients: state.clients.items });

const mapDispatchToProps = {
    createAssignment: clientActions.createAssignment,
    updateAssignment: clientActions.updateAssignment,
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentFormPage);
