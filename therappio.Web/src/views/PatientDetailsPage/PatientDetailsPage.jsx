import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import { clientActions } from '../../_actions';
import {
    PersonalInfoCard,
    NotesCard,
    SessionsCard,
    AssignmentsCard,
    MoodJournalRecordsCard,
} from '../../components';
import style from './PatientDetailsPage.module.scss';

const PatientDetailsPage = ({ match, patient, getDetails }) => {
    useEffect(() => {
        getDetails(match.params.clientId);
    }, [match.params.clientId]);

    return (
        <>
            <Row>
                <h2 className="page-heading">
                    {patient && `${patient.firstName} ${patient.lastName}`}
                </h2>
            </Row>
            <Row>
                <Col xs={{ span: 24 }} lg={{ span: 16 }}>
                    <PersonalInfoCard patient={patient} />
                    <SessionsCard
                        therapySessions={
                            patient && patient.therapySessions
                                ? patient.therapySessions
                                : null
                        }
                        patientId={patient && patient._id ? patient._id : null}
                    />
                    <AssignmentsCard
                        assignments={
                            patient && patient.assignments
                                ? patient.assignments
                                : null
                        }
                        patientId={patient && patient._id ? patient._id : null}
                    />
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                    <NotesCard patient={patient} />
                    <MoodJournalRecordsCard
                        moodRecords={
                            patient && patient.moodRecords
                                ? patient.moodRecords
                                : null
                        }
                        journalRecords={
                            patient && patient.journalRecords
                                ? patient.journalRecords
                                : null
                        }
                    />
                </Col>
            </Row>
        </>
    );
};

const mapStateToProps = (state, props) => ({
    patient: state.clients.items.find(
        item => item._id === props.match.params.clientId
    ),
});

const mapDispatchToProps = {
    getDetails: clientActions.getDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientDetailsPage);
