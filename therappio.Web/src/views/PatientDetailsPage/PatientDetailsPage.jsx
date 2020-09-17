import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import { selectClient } from '../../_selectors';
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
        <div className={style.patientDetailsContent}>
            <Row>
                <h2 className="page-heading">
                    {patient && `${patient.firstName} ${patient.lastName}`}
                </h2>
            </Row>
            <Row>
                <Col xs={{ span: 24 }} lg={{ span: 16 }}>
                    <PersonalInfoCard patient={patient} />
                    <SessionsCard
                        patientId={patient && patient._id ? patient._id : null}
                    />
                    <AssignmentsCard
                        patientId={patient && patient._id ? patient._id : null}
                    />
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                    <NotesCard patient={patient} />
                    <MoodJournalRecordsCard
                        patientId={patient && patient._id ? patient._id : null}
                    />
                </Col>
            </Row>
        </div>
    ) : null;
};

const mapStateToProps = (state, props) => ({
    patient: selectClient(state, props.match.params.clientId),
});

export default connect(mapStateToProps, null)(PatientDetailsPage);
