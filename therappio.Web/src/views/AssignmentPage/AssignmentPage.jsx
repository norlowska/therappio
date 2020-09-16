import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { clientActions } from '../../_actions';
import style from './AssignmentPage.module.scss';

const AssignmentPage = ({ match, client, assignment, getDetails }) => {
    useEffect(() => {
        if (client && !client.hasOwnProperty('assignments'))
            getDetails(client._id);
    }, [client]);

    return (
        <>
            <h2 className="page-heading">
                {assignment && !!assignment.title && assignment.title.length > 0
                    ? assignment.title
                    : ''}
            </h2>
            <div className={style.tasks}>
                {assignment &&
                    assignment.fields.map((field, index) => (
                        <Card title={field.question} key={`q${index + 1}`}>
                            <div className={style.answer}>
                                {field.options && field.options.length ? (
                                    field.options.map((option, index) =>
                                        option === field.answer ? (
                                            <div
                                                key={`op${index}`}
                                                className={style.optionSelected}
                                            >
                                                {option}
                                            </div>
                                        ) : (
                                            <div key={`op${index}`}>
                                                {option}
                                            </div>
                                        )
                                    )
                                ) : (
                                    <div>
                                        {field.answer && field.answer.length
                                            ? field.answer.map(answer => answer)
                                            : 'No answer given'}
                                    </div>
                                )}
                            </div>
                        </Card>
                    ))}
            </div>
        </>
    );
};

const mapStateToProps = (state, props) => {
    const client = state.clients.items.length
        ? state.clients.items.find(
              client => client._id === props.match.params.clientId
          )
        : null;
    return {
        client,
        assignment:
            client && client.assignments
                ? client.assignments.find(
                      a => a._id === props.match.params.assignmentId
                  )
                : null,
    };
};

const mapDispatchToProps = {
    getDetails: clientActions.getDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentPage);
