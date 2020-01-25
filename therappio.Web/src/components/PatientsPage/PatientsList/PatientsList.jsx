import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AddPatient from '../AddPatient/AddPatient';
import style from './PatientsList.module.scss';

const PatientsList = ({ patients }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const handleChange = event => {
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        const results = patients.filter(
            person =>
                person.FirstName.toLowerCase().includes(
                    searchQuery.toLowerCase()
                ) ||
                person.LastName.toLowerCase().includes(
                    searchQuery.toLowerCase()
                )
        );
        setSearchResults(results);
    }, [searchQuery]);

    return (
        <div className="sidebar">
            <div className={style.header}>
                <h3>Patients</h3>
                <AddPatient />
            </div>
            <form className={style.searchPatient}>
                <div className={'formGroup'}>
                    <label>
                        <i
                            className={'la la-search'}
                            title="Search patients"
                            aria-hidden
                        />
                    </label>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleChange}
                        placeholder="Search patients"
                    />
                </div>
            </form>
            <ul className={style.patientsList}>
                {searchResults.map(patient => {
                    return (
                        <li key={patient.UserId}>
                            <Link
                                to={`/patients/${patient.UserId}`}
                                className={'patientCard'}
                            >
                                <div className={'patientInfo'}>
                                    <div
                                        className={'name'}
                                    >{`${patient.FirstName} ${patient.LastName}`}</div>
                                    <div
                                        className={'id'}
                                    >{`Patient ID: ${patient.UserId}`}</div>
                                    <div className={'phone'}>
                                        <i className={'la la-phone-alt'} />
                                        <span className={style.phoneNumber}>
                                            {patient.PhoneNumber}
                                        </span>
                                    </div>
                                </div>
                                <div className="checkin-btn">
                                    <button className="primary-btn">
                                        Check in
                                    </button>
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

PatientsList.propTypes = {
    patients: PropTypes.arrayOf(PropTypes.object),
};

export default PatientsList;
