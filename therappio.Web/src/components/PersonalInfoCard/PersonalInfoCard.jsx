import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import { Row, Col, Card, Button } from 'antd';
import { FormInput } from '../index';
import DiagnosisAutocompleteInput from './DiagnosisAutocompleteInput';
import { clientActions, diagnosisActions } from '../../_actions';
import { genderOptions } from '../../_constants';
import style from './PersonalInfoCard.module.scss';
import { selectDiagnosis } from '../../_selectors';

const PersonalInfoCard = ({
    patient,
    updatePatient,
    fetchDiagnosis,
    createDiagnosis,
    diagnosisObj,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [DOB, setDOB] = useState(null);
    const [address, setAddress] = useState('');
    const [
        emergencyContactPhoneNumber,
        setEmergencyContactPhoneNumber,
    ] = useState('');
    const [emergencyContactName, setEmergencyContactName] = useState('');

    useEffect(() => {
        if (patient) {
            if (!patient.diagnosis) createDiagnosis(patient._id);
            else if (!diagnosisObj) fetchDiagnosis(patient.diagnosis);

            setDOB(patient.dateOfBirth);
            if (isEditing) {
                setFirstName(patient.firstName);
                setLastName(patient.lastName);
                setGender(patient.gender);
                setPhoneNumber(patient.phoneNumber);
                setEmailAddress(patient.email);
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
            };

            updatePatient(newPatient);
        }
        setIsEditing(!isEditing);
    };

    const handleCancelEditing = e => {
        setIsEditing(false);
    };

    return (
        <Card
            title="BASIC INFO"
            extra={
                <div className="buttons-group">
                    {isEditing && (
                        <Button onClick={handleCancelEditing}>Cancel</Button>
                    )}
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
                </div>
            }
        >
            {patient && (
                <Row gutter={15}>
                    <Col span={12}>
                        <div className={style.infoRow}>
                            <div className="label">Gender</div>
                            {isEditing ? (
                                <FormInput
                                    name="gender"
                                    type="select"
                                    options={genderOptions}
                                    onChange={e => setGender(e.target.value)}
                                    value={gender}
                                    title="Select gender"
                                />
                            ) : (
                                <div className={style.info}>
                                    {patient.gender}
                                </div>
                            )}
                        </div>
                        <div className={style.infoRow}>
                            <div className="label">DOB</div>
                            {isEditing ? (
                                <FormInput
                                    name="dateOfBirth"
                                    type="date"
                                    onChange={e => setDOB(e.target.value)}
                                    value={dayjs(DOB).format('YYYY-MM-DD')}
                                    title="Enter date of birth"
                                />
                            ) : (
                                <div className={style.info}>
                                    {dayjs(DOB).format('D MMM YYYY')}
                                </div>
                            )}
                        </div>
                        <div className={style.infoRow}>
                            <div className="label">Age</div>
                            <div className={style.info}>
                                {dayjs().diff(DOB || patient.dateOfBirth, 'y')}
                            </div>
                        </div>
                        <div className={style.infoRow}>
                            <div className="label">Phone</div>
                            {isEditing ? (
                                <FormInput
                                    name="phoneNumber"
                                    type="phone"
                                    onChange={e =>
                                        setPhoneNumber(e.target.value)
                                    }
                                    value={phoneNumber}
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
                            <div className="label">Email</div>
                            {isEditing ? (
                                <FormInput
                                    name="emailAddress"
                                    type="mail"
                                    onChange={e =>
                                        setEmailAddress(e.target.value)
                                    }
                                    value={emailAddress}
                                    title="Enter email address"
                                />
                            ) : (
                                <div className={style.info}>
                                    {patient.email}
                                </div>
                            )}
                        </div>
                        <div className={style.infoRow}>
                            <div className="label">Address</div>
                            {isEditing ? (
                                <FormInput
                                    name="address"
                                    type="textarea"
                                    onChange={e => setAddress(e.target.value)}
                                    value={address}
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
                                <div className="label">Name</div>
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
                                <div className="label">Phone</div>
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
                            <div className="label">Diagnosis</div>
                            <div className={style.info}>
                                {patient.diagnosis && (
                                    <DiagnosisAutocompleteInput
                                        diagnosisId={patient.diagnosis}
                                    />
                                )}
                            </div>
                        </div>
                    </Col>
                </Row>
            )}
        </Card>
    );
};

const mapStateToProps = (state, props) => ({
    diagnosisObj: selectDiagnosis(state, props.patient.diagnosis),
});

const mapDispatchToProps = {
    updatePatient: clientActions.update,
    fetchDiagnosis: diagnosisActions.fetchDiagnosis,
    createDiagnosis: diagnosisActions.createDiagnosis,
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfoCard);
