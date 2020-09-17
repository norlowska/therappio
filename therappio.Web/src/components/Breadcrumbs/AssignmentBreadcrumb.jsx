import React from 'react';
import { connect } from 'react-redux';
import { selectAssignment } from '../../_selectors';

const AssignmentBreadcrumb = ({ assignment }) => {
    return assignment ? (
        <span>
            Assignment <i>{assignment.title}</i>
        </span>
    ) : (
        <span>Assignment</span>
    );
};

const mapStateToProps = (state, props) => ({
    assignment: selectAssignment(state, props.match.params.assignmentId),
});

export default connect(mapStateToProps)(AssignmentBreadcrumb);
