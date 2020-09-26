import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Tag } from 'antd';
import { selectClient, selectClientsTherapy } from '../../_selectors';
import {
    PersonalInfoCard,
    NotesCard,
    SessionsCard,
    AssignmentsCard,
    MoodJournalRecordsCard,
    TherapyFormModal,
} from '../../components';
import style from './PatientDetailsPage.module.scss';

const PatientDetailsPage = ({ patient, therapy }) => {
    const [isTherapyFormVisible, setIsTherapyFormVisible] = useState(false);

    useEffect(() => {
        console.log(therapy);
    }, [therapy]);

    return patient ? (
        <>
            <div className={style.patientDetailsContent}>
                <Row gutter={[8, 8]}>
                    <Col span={16}>
                        {therapy &&
                            therapy.plans &&
                            therapy.plans.length &&
                            !therapy.isInProgress && (
                                <Tag color="#cd201f">Therapy has ended</Tag>
                            )}
                        <h2 className="page-heading">
                            {patient &&
                                `${patient.firstName} ${patient.lastName}`}
                        </h2>
                    </Col>
                    <Col span={8} align="right">
                        {(!therapy || (therapy && therapy.isInProgress)) && (
                            <Button
                                onClick={e => setIsTherapyFormVisible(true)}
                                type={therapy ? 'default' : 'danger'}
                                ghost={therapy ? false : true}
                                size="large"
                                icon={
                                    therapy ? (
                                        <i className={`las la-pen icon`} />
                                    ) : null
                                }
                            >
                                <span>
                                    {therapy
                                        ? 'Edit therapy'
                                        : 'Start new therapy'}
                                </span>
                            </Button>
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col xs={{ span: 24 }} lg={{ span: 16 }}>
                        <PersonalInfoCard patient={patient} />
                        <SessionsCard
                            patientId={
                                patient && patient._id ? patient._id : null
                            }
                            inProgress={therapy && therapy.isInProgress}
                        />
                        <AssignmentsCard
                            patientId={
                                patient && patient._id ? patient._id : null
                            }
                            inProgress={therapy && therapy.isInProgress}
                        />
                    </Col>
                    <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                        <NotesCard
                            patientId={
                                patient && patient._id ? patient._id : null
                            }
                            notes={patient.notes}
                            inProgress={therapy && therapy.isInProgress}
                        />
                        <MoodJournalRecordsCard
                            patientId={
                                patient && patient._id ? patient._id : null
                            }
                            inProgress={therapy && therapy.isInProgress}
                        />
                    </Col>
                </Row>
            </div>
            {isTherapyFormVisible && (
                <TherapyFormModal
                    setVisible={setIsTherapyFormVisible}
                    therapy={therapy}
                    patientId={patient && patient._id ? patient._id : null}
                />
            )}
        </>
    ) : null;
};

const mapStateToProps = (state, props) => ({
    patient: selectClient(state, props.match.params.clientId),
    therapy: selectClientsTherapy(state, props.match.params.clientId),
});

export default connect(mapStateToProps, null)(PatientDetailsPage);
