import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Card } from 'antd';
import { selectAssignment } from '../../_selectors';
import style from './AssignmentPage.module.scss';

const AssignmentPage = ({ match, assignment }) => {
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

const mapStateToProps = (state, props) => ({
    assignment: selectAssignment(state, props.match.params.assignmentId),
});

export default connect(mapStateToProps)(AssignmentPage);
