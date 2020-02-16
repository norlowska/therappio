import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import style from './AssignmentPage.module.scss';

const AssignmentPage = ({ match, clients }) => {
    const [assignment, setAssignment] = useState(undefined);

    // Set selected client
    useEffect(() => {
        const selectedClient = clients.find(
            client => client.shortId.toString() === match.params.clientId
        );
        const selectedAssignment =
            selectedClient && selectedClient.assignments
                ? selectedClient.assignments.find(
                      assignment =>
                          assignment.shortId.toString() ===
                          match.params.assignmentId
                  )
                : undefined;

        setAssignment(selectedAssignment);
    }, [match.params.assignmentId, clients]);

    return (
        <main className="center-container">
            <div className="assignment-container">
                <div className={style.assignmentHeader}>
                    <h2>
                        {assignment &&
                        !!assignment.title &&
                        assignment.title.length > 0
                            ? assignment.title
                            : 'Untitled'}
                    </h2>{' '}
                    {assignment && assignment.status === 'Not submitted' ? (
                        <Link
                            className={`primary-btn ${style.editLink}`}
                            to={`/clients/${match.params.clientId}/assignments/${match.params.assignmentId}/edit`}
                        >
                            Edit
                        </Link>
                    ) : null}
                </div>
                <div className={style.tasks}>
                    {assignment &&
                        assignment.fields.map((field, index) => (
                            <div className={style.task} key={index + 1}>
                                <h4 className={style.question}>
                                    {field.question}
                                </h4>
                                <div className={style.answer}>
                                    {field.options && field.options.length ? (
                                        field.options.map(option =>
                                            option === field.answer ? (
                                                <div
                                                    className={
                                                        style.optionSelected
                                                    }
                                                >
                                                    {option}
                                                </div>
                                            ) : (
                                                <div>{option}</div>
                                            )
                                        )
                                    ) : (
                                        <div>
                                            {field.answer && field.answer.length
                                                ? field.answer.map(
                                                      answer => answer
                                                  )
                                                : 'No answer given'}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </main>
    );
};

const mapStateToProps = state => ({
    clients: state.clients.items,
});

AssignmentPage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            clientId: PropTypes.string,
            assignmentId: PropTypes.string,
        }),
    }),
    clients: PropTypes.arrayOf(PropTypes.object),
};

export default connect(mapStateToProps)(AssignmentPage);
