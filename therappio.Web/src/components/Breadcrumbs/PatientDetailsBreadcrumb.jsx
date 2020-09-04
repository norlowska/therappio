import React from 'react';
import { connect } from 'react-redux';

const PatientDetailsBreadcrumb = ({ patient, match }) => {
    if (!match.params.clientId) return <span>Patients list</span>;
    return patient ? (
        <span>
            {patient.firstName} {patient.lastName}
        </span>
    ) : (
        <span>Patient details</span>
    );
};

const mapStateToProps = (state, props) => ({
    patient: state.clients.items.find(
        item => item._id === props.match.params.clientId
    ),
});

export default connect(mapStateToProps)(PatientDetailsBreadcrumb);
