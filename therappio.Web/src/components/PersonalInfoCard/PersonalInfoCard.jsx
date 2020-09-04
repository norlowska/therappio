import React from 'react';
import dayjs from 'dayjs';
import { Row, Col, Card, Button } from 'antd';
import style from './PersonalInfoCard.module.scss';

const PersonalInfoCard = ({ patient }) => {
    const hasEmergencyContact =
        patient &&
        patient.emergencyContact &&
        (patient.emergencyContact.name || patient.emergencyContact.address);

    const handleAdd = e => {};

    return (
        <Card
            title="BASIC INFO"
            extra={
                <Button
                    onClick={handleAdd}
                    type="primary"
                    icon={<i className="las la-pen icon" />}
                >
                    <span>Edit</span>
                </Button>
            }
        >
            {patient && (
                <Row>
                    <Col span={hasEmergencyContact ? 8 : 12}>
                        <div className={style.infoRow}>
                            <div className={style.label}>Gender</div>
                            <div className={style.info}>{patient.gender}</div>
                        </div>
                        <div className={style.infoRow}>
                            <div className={style.label}>DOB</div>
                            <div className={style.info}>
                                {dayjs(patient.dateOfBirth).format(
                                    'D MMM YYYY'
                                )}
                            </div>
                        </div>
                        <div className={style.infoRow}>
                            <div className={style.label}>Age</div>
                            <div className={style.info}>
                                {dayjs().diff(patient.dateOfBirth, 'y')}
                            </div>
                        </div>
                    </Col>
                    <Col span={hasEmergencyContact ? 8 : 12}>
                        <div className={style.infoRow}>
                            <div className={style.label}>Phone</div>
                            <div className={style.info}>
                                {patient.phoneNumber}
                            </div>
                        </div>
                        <div className={style.infoRow}>
                            <div className={style.label}>Email</div>
                            <div className={style.info}>{patient.email}</div>
                        </div>
                        <div className={style.infoRow}>
                            <div className={style.label}>Address</div>
                            <div className={style.info}>{patient.address}</div>
                        </div>
                    </Col>
                    <Col span={8}>
                        {hasEmergencyContact && (
                            <div className={style.emergencyContactTitle}>
                                Emergency contact
                            </div>
                        )}
                        {hasEmergencyContact && patient.emergencyContact.name && (
                            <div className={style.infoRow}>
                                <div className={style.label}>Name</div>
                                <div className={style.info}>
                                    {patient.emergencyContact.name}
                                </div>
                            </div>
                        )}

                        {hasEmergencyContact &&
                            patient.emergencyContact.address && (
                                <div className={style.infoRow}>
                                    <div className={style.label}>Phone</div>
                                    <div className={style.info}>
                                        {patient.emergencyContact.phoneNumber}
                                    </div>
                                </div>
                            )}
                    </Col>
                </Row>
            )}
        </Card>
    );
};

export default PersonalInfoCard;
