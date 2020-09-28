import React from 'react';
import { connect } from 'react-redux';
import { selectPatient } from '../../_selectors';

const PatientDetailsBreadcrumb = ({ patient, match }) => {
    if (!match.params.patientId) return <span>Patients list</span>;
    return patient ? (
        <span>
            {patient.firstName} {patient.lastName}
        </span>
    ) : (
        <span>Patient details</span>
    );
};

const mapStateToProps = (state, props) => ({
    patient: selectPatient(state, props.match.params.patientId),
});

export default connect(mapStateToProps)(PatientDetailsBreadcrumb);
