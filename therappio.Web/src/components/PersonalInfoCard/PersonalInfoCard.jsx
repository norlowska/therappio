import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import { Row, Col, Card, Button } from 'antd';
import { FormInput } from '../index';
import { clientActions } from '../../_actions';
import { genderOptions } from '../../_constants';
import style from './PersonalInfoCard.module.scss';

const PersonalInfoCard = ({ patient, updatePatient }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [DOB, setDOB] = useState(null);
    const [diagnosis, setDiagnosis] = useState([]);
    const [address, setAddress] = useState('');
    const [
        emergencyContactPhoneNumber,
        setEmergencyContactPhoneNumber,
    ] = useState('');
    const [emergencyContactName, setEmergencyContactName] = useState('');

    useEffect(() => {
        if (patient) {
            setDOB(patient.dateOfBirth);
            if (isEditing) {
                setFirstName(patient.firstName);
                setLastName(patient.lastName);
                setGender(patient.gender);
                setPhoneNumber(patient.phoneNumber);
                setEmailAddress(patient.email);
                setDiagnosis(patient.diagnosis);
                setAddress(patient.address);
                if (patient.emergencyContact) {
                    setEmergencyContactName(
                        patient.emergencyContact.name || ''
                    );
                    setEmergencyContactPhoneNumber(
                        patient.emergencyContact.phoneNumber || ''
                    );
                }
            }
        }
    }, [isEditing, patient]);

    const hasEmergencyContact =
        patient &&
        patient.emergencyContact &&
        (patient.emergencyContact.name || patient.emergencyContact.address);

    const handleSaveEditClick = e => {
        if (isEditing) {
            const newPatient = {
                ...patient,
                firstName,
                lastName,
                gender,
                dateOfBirth: DOB,
                phoneNumber,
                email: emailAddress,
                address,
                emergencyContact: {
                    name: emergencyContactName,
                    phoneNumber: emergencyContactPhoneNumber,
                },
                diagnosis,
            };

            updatePatient(newPatient);
        }
        setIsEditing(!isEditing);
    };

    return (
        <Card
            title="BASIC INFO"
            extra={
                <Button
                    onClick={handleSaveEditClick}
                    type="primary"
                    icon={
                        <i
                            className={`las ${
                                isEditing ? 'la-save' : 'la-pen'
                            } icon`}
                        />
                    }
                >
                    <span>{isEditing ? 'Save' : 'Edit'}</span>
                </Button>
            }
        >
            {patient && (
                <Row gutter={15}>
                    <Col span={12}>
                        <div className={style.infoRow}>
                            <div className={style.label}>Gender</div>
                            {isEditing ? (
                                <FormInput
                                    name="gender"
                                    type="select"
                                    options={genderOptions}
                                    onChange={e => setGender(e.target.value)}
                                    value={gender}
                                    className={style.input}
                                    title="Select gender"
                                />
                            ) : (
                                <div className={style.info}>
                                    {patient.gender}
                                </div>
                            )}
                        </div>
                        <div className={style.infoRow}>
                            <div className={style.label}>DOB</div>
                            {isEditing ? (
                                <FormInput
                                    name="dateOfBirth"
                                    type="date"
                                    onChange={e => setDOB(e.target.value)}
                                    value={dayjs(DOB).format('YYYY-MM-DD')}
                                    className={style.input}
                                    title="Enter date of birth"
                                />
                            ) : (
                                <div className={style.info}>
                                    {dayjs(DOB).format('D MMM YYYY')}
                                </div>
                            )}
                        </div>
                        <div className={style.infoRow}>
                            <div className={style.label}>Age</div>
                            <div className={style.info}>
                                {dayjs().diff(DOB || patient.dateOfBirth, 'y')}
                            </div>
                        </div>
                        <div className={style.infoRow}>
                            <div className={style.label}>Phone</div>
                            {isEditing ? (
                                <FormInput
                                    name="phoneNumber"
                                    type="phone"
                                    onChange={e =>
                                        setPhoneNumber(e.target.value)
                                    }
                                    value={phoneNumber}
                                    className={style.input}
                                    title="Enter phone number"
                                />
                            ) : (
                                <div className={style.info}>
                                    {patient.phoneNumber}
                                </div>
                            )}
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className={style.infoRow}>
                            <div className={style.label}>Email</div>
                            {isEditing ? (
                                <FormInput
                                    name="emailAddress"
                                    type="mail"
                                    onChange={e =>
                                        setEmailAddress(e.target.value)
                                    }
                                    value={emailAddress}
                                    className={style.input}
                                    title="Enter email address"
                                />
                            ) : (
                                <div className={style.info}>
                                    {patient.email}
                                </div>
                            )}
                        </div>
                        <div className={style.infoRow}>
                            <div className={style.label}>Address</div>
                            {isEditing ? (
                                <FormInput
                                    name="address"
                                    type="textarea"
                                    onChange={e => setAddress(e.target.value)}
                                    value={address}
                                    className={style.input}
                                    title="Enter address"
                                />
                            ) : (
                                <div className={style.info}>
                                    {patient.address}
                                </div>
                            )}
                        </div>
                        <div className={style.emergencyContactTitle}>
                            Emergency contact
                        </div>
                        {!hasEmergencyContact && !isEditing && (
                            <div className={style.infoRow}>
                                <i>No emergency contact provided</i>
                            </div>
                        )}
                        {(hasEmergencyContact || isEditing) && (
                            <div className={style.infoRow}>
                                <div className={style.label}>Name</div>
                                {isEditing ? (
                                    <FormInput
                                        name="emergencyContactName"
                                        type="short"
                                        onChange={e =>
                                            setEmergencyContactName(
                                                e.target.value
                                            )
                                        }
                                        value={emergencyContactName}
                                        className={style.input}
                                        title="Enter emergency contact's name"
                                    />
                                ) : (
                                    <div className={style.info}>
                                        {patient.emergencyContact.name}
                                    </div>
                                )}
                            </div>
                        )}

                        {(hasEmergencyContact || isEditing) && (
                            <div className={style.infoRow}>
                                <div className={style.label}>Phone</div>
                                {isEditing ? (
                                    <FormInput
                                        name="emergencyContactPhoneNumber"
                                        type="phone"
                                        onChange={e =>
                                            setEmergencyContactPhoneNumber(
                                                e.target.value
                                            )
                                        }
                                        value={emergencyContactPhoneNumber}
                                        className={style.input}
                                        title="Enter emergency contact's phone number"
                                    />
                                ) : (
                                    <div className={style.info}>
                                        {patient.emergencyContact.phoneNumber}
                                    </div>
                                )}
                            </div>
                        )}
                    </Col>
                    <Col span={24} className={style.diagnosisCol}>
                        <div className={style.infoRow}>
                            <div className={style.label}>Diagnosis</div>
                            <div className={style.info}>
                                {/* {patient.emergencyContact.name} */}
                            </div>
                        </div>
                    </Col>
                </Row>
            )}
        </Card>
    );
};

const mapDispatchToProps = {
    updatePatient: clientActions.update,
};

export default connect(null, mapDispatchToProps)(PersonalInfoCard);
