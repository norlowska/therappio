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
        if (
            patient &&
            !patient.hasOwnProperty('therapySessions') &&
            !patient.hasOwnProperty('assignments') &&
            !patient.hasOwnProperty('moodRecords') &&
            !patient.hasOwnProperty('journalRecords')
        ) {
            getDetails(patient._id);
        }
    }, [patient]);

    return (
        <>
            <Row>
                <h2 className={style.patientNameHeading}>
                    {patient && `${patient.firstName} ${patient.lastName}`}
                </h2>
            </Row>
            <Row gutter={8}>
                <Col md={{ span: 24 }} lg={{ span: 16 }}>
                    <Row gutter={[8, 8]}>
                        <Col span={24}>
                            <PersonalInfoCard patient={patient} />
                        </Col>
                    </Row>
                    <Row gutter={[8, 8]}>
                        <Col span={24}>
                            <SessionsCard
                                therapySessions={
                                    patient && patient.therapySessions
                                        ? patient.therapySessions
                                        : null
                                }
                                patientId={
                                    patient && patient._id ? patient._id : null
                                }
                            />
                        </Col>
                    </Row>
                    <Row gutter={[8, 8]}>
                        <Col span={24}>
                            <AssignmentsCard
                                assignments={
                                    patient && patient.assignments
                                        ? patient.assignments
                                        : null
                                }
                                patientId={
                                    patient && patient._id ? patient._id : null
                                }
                            />
                        </Col>
                    </Row>
                </Col>
                <Col md={{ span: 24 }} lg={{ span: 8 }}>
                    <Row gutter={[8, 8]}>
                        <Col span={24}>
                            <NotesCard patient={patient} />
                        </Col>
                    </Row>
                    <Row gutter={[8, 8]}>
                        <Col span={24}>
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
                </Col>
                {/* <Col span={24}>
                    
                </Col>
                <Col md={{ span: 24 }} lg={{ span: 16 }}>
                    <PersonalInfoCard patient={patient} />
                </Col>
                <Col md={{ span: 24 }} lg={{ span: 8 }}>
                    
                </Col>
                <Col md={{ span: 24 }} lg={{ span: 16 }}>
                    <SessionsCard
                        therapySessions={
                            patient && patient.therapySessions
                                ? patient.therapySessions
                                : null
                        }
                    />
                </Col> */}
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
