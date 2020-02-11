import React, { useState } from 'react';
import Modal from 'react-modal';
import { FormInput } from '../../index';
import style from './AddClient.module.scss';

Modal.setAppElement('#root');

const AddClient = () => {
    const [modalIsOpen, setIsOpen] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [gender, setGender] = useState('male');

    const genderOptions = [
        {
            value: 'male',
            displayValue: 'Male',
        },
        {
            value: 'female',
            displayValue: 'Female',
        },
    ];

    const openModal = () => {
        console.log(modalIsOpen);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <React.Fragment>
            <button className={'icon-btn'} onClick={openModal}>
                <i className={`las la-plus`} />
            </button>
            <Modal isOpen={modalIsOpen} className={style.modal}>
                <div className={style.header}>
                    <h2>New client</h2>
                    <button className={'icon-btn'} onClick={closeModal}>
                        <i className="la la-times" title="Close" />
                    </button>
                </div>
                <form className="clearfix">
                    <div className={style.formFields}>
                        <h3 className={style.infoSectionHeader}>Personal</h3>
                        <div className={'formGroup'}>
                            <label htmlFor="firstName">First name</label>
                            <FormInput type="text" name="firstName" />
                        </div>
                        <div className={'formGroup'}>
                            <label htmlFor="lastName">Last name</label>
                            <FormInput type="text" name="lastName" />
                        </div>
                        <div className={'formGroup'}>
                            <label htmlFor="DoB">Date of birth</label>
                            <FormInput type="text" name="DoB" />
                        </div>
                        <div className={'formGroup'}>
                            <label htmlFor="gender">Gender</label>
                            <FormInput
                                type="select"
                                options={genderOptions}
                                onChange={e => setGender(e.target.value)}
                                name="gender"
                            />
                        </div>
                        <h3 className={style.infoSectionHeader}>Contact</h3>
                        <div className={'formGroup'}>
                            <label htmlFor="email">E-mail address</label>
                            <FormInput type="email" name="email" />
                        </div>
                        <div className={'formGroup'}>
                            <label htmlFor="phone">Phone number</label>
                            <FormInput type="phone" name="phone" />
                        </div>
                        <div className={'formGroup'}>
                            <label htmlFor="address">Address</label>
                            <FormInput type="textarea" name="address" />
                        </div>
                        <h3 className={style.infoSectionHeader}>
                            Emergency Contact
                        </h3>
                        <div className={'formGroup'}>
                            <label htmlFor="emergencyName">Name</label>
                            <FormInput type="text" name="emergencyName" />
                        </div>
                        <div className={'formGroup'}>
                            <label htmlFor="emergencyPhone">Phone number</label>
                            <FormInput type="phone" name="emergencyPhone" />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className={`primary-btn ${style.saveBtn}`}
                    >
                        Save
                    </button>
                </form>
            </Modal>
        </React.Fragment>
    );
};

export default AddClient;
