import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import {
    selectClient,
    selectClientAssignments,
    selectClientTherapySessions,
} from '../../_selectors';
import {
    PersonalInfoCard,
    NotesCard,
    SessionsCard,
    AssignmentsCard,
    MoodJournalRecordsCard,
} from '../../components';
import style from './PatientDetailsPage.module.scss';

const PatientDetailsPage = ({ patient }) => {
    return patient ? (
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
    ) : null;
};

const mapStateToProps = (state, props) => ({
    patient: selectClient(state, props.match.params.clientId),
});

export default connect(mapStateToProps, null)(PatientDetailsPage);
