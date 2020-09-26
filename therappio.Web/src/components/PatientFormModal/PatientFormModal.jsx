import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Row, Col } from 'antd';
import { clientActions } from '../../_actions';
import { selectCurrentUser } from '../../_selectors';
import { FormInput } from '../index';
import { genderOptions } from '../../_constants';

const PatientFormModal = ({ setVisible, create, therapistId, ...props }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('male');
    const [DOB, setDOB] = useState();
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [emergencyContactName, setEmergencyContactName] = useState('');
    const [
        emergencyContactPhoneNumber,
        setEmergencyContactPhoneNumber,
    ] = useState('');

    const handleCancel = e => setVisible(false);
    const handleSave = e => {
        create({
            firstName,
            lastName,
            gender,
            dateOfBirth: DOB,
            phoneNumber: phone,
            email,
            address,
            emergencyContact: {
                name: emergencyContactName,
                phoneNumber: emergencyContactPhoneNumber,
            },
            therapist: therapistId,
        });
        setVisible(false);
    };

    return (
        <Modal
            title="New patient"
            visible={true}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleSave}>
                    Submit
                </Button>,
            ]}
            onCancel={handleCancel}
            width={700}
        >
            <Row gutter={[16, 8]}>
                <Col span={12}>
                    <div className={'formGroup'}>
                        <label htmlFor="firstName" className="label">
                            First name
                        </label>
                        <FormInput
                            name="firstName"
                            title="First name"
                            type="short"
                            onChange={e => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <div className={'formGroup'}>
                        <label htmlFor="lastName" className="label">
                            Last name{' '}
                        </label>
                        <FormInput
                            name="lastName"
                            onChange={e => setLastName(e.target.value)}
                            title="Last name"
                            type="short"
                            required
                        />
                    </div>
                </Col>
            </Row>
            <Row gutter={[16, 8]}>
                <Col span={12}>
                    <div className={'formGroup'}>
                        <label htmlFor="gender" className="label">
                            Gender
                        </label>
                        <FormInput
                            name="gender"
                            onChange={e => setGender(e.target.value)}
                            title="Gender"
                            type="select"
                            options={genderOptions}
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <div className={'formGroup'}>
                        <label htmlFor="dateOfBirth" className="label">
                            Date of Birth
                        </label>
                        <FormInput
                            name="dateOfBirth"
                            onChange={e => setDOB(e.target.value)}
                            title="Date of Birth"
                            type="date"
                        />
                    </div>
                </Col>
            </Row>
            <Row gutter={[16, 8]}>
                <Col span={12}>
                    <div className={'formGroup'}>
                        <label htmlFor="email" className="label">
                            E-mail address
                        </label>
                        <FormInput
                            name="email"
                            onChange={e => setEmail(e.target.value)}
                            title="E-mail address"
                            type="email"
                            required
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <div className={'formGroup'}>
                        <label htmlFor="phone" className="label">
                            Phone number
                        </label>
                        <FormInput
                            name="phone"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            title="Phone number"
                            type="phone"
                            required
                        />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <div className={'formGroup'}>
                        <label htmlFor="address" className="label">
                            Address
                        </label>
                        <FormInput
                            name="address"
                            onChange={e => setAddress(e.target.value)}
                            title="Address"
                            type="short"
                        />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <div
                        className={'emergency-contact-title'}
                        style={{
                            fontSize: '15px',
                            borderTop: '1px solid #d0d0d0',
                            paddingTop: '10px',
                            marginTop: '16px',
                        }}
                    >
                        Emergency contact
                    </div>
                    <div className={'formGroup'}>
                        <label htmlFor="emergencyContactName" className="label">
                            Name
                        </label>
                        <FormInput
                            name="emergencyContactName"
                            onChange={e =>
                                setEmergencyContactName(e.target.value)
                            }
                            titypetle="short"
                            type="Enter emergency contact's name"
                        />
                    </div>
                    <div className={'formGroup'}>
                        <label
                            htmlFor="emergencyContactPhoneNumber"
                            className="label"
                        >
                            Address
                        </label>
                        <FormInput
                            name="emergencyContactPhoneNumber"
                            onChange={e =>
                                setEmergencyContactPhoneNumber(e.target.value)
                            }
                            type="phone"
                            title="Enter emergency contact's phone number"
                        />
                    </div>
                </Col>
            </Row>
        </Modal>
    );
};

const mapStateToProps = (state, props) => ({
    therapistId: selectCurrentUser(state)._id,
});

const mapDispatchToProps = {
    create: clientActions.create,
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientFormModal);
