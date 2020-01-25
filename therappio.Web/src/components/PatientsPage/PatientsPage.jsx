import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PatientsList from './PatientsList/PatientsList';
import PatientDetails from './PatientDetails/PatientDetails';

const PatientsPage = ({ match }) => {
    const [selectedPatient, setSelectedPatient] = useState(null);

    const patients = [
        {
            UserId: 1,
            Email: 'srobbins@yahoo.com',
            FirstName: 'Sharon',
            LastName: 'Robbins',
            PhoneNumber: '04681 15468',
            PESEL: '82022777317',
            Birthdate: new Date(1972, 10, 5),
            Gender: 'Female',
            Address: '3 Bell Forge, Ianmouth, W14 8AZ',
            EmergencyContact: {
                Name: 'Bruce Robbins',
                PhoneNumber: '(0809) 085 1007',
            },
            MoodChart: {
                Week: [
                    {
                        name: 'High energy,unpleasant',
                        value: 30,
                    },
                    {
                        name: 'High energy, pleasant',
                        value: 35,
                    },
                    {
                        name: 'Low energy, unpleasant',
                        value: 20,
                    },
                    {
                        name: 'Low energy, pleasant',
                        value: 15,
                    },
                ],
                Month: [
                    {
                        name: 'High energy, unpleasant',
                        value: 30,
                    },
                    {
                        name: 'High energy, pleasant',
                        value: 35,
                    },
                    {
                        name: 'Low energy, Unpleasant',
                        value: 20,
                    },
                    {
                        name: 'Low energy, pleasant',
                        value: 15,
                    },
                ],
            },
        },
        {
            UserId: 2,
            Email: 'ruth@roberts.com',
            FirstName: 'Ruth',
            LastName: 'Roberts',
            PhoneNumber: '+44(0)0872 918885',
            PESEL: '82022777317',
            Gender: 'Male',
            EmergencyContact: {
                Name: '',
                PhoneNumber: '',
            },
        },
        {
            UserId: 3,
            Email: 'jan@nowak.pl',
            FirstName: 'Sibyl',
            LastName: 'Blanda',
            PhoneNumber: '+44(0)901265037',
            PESEL: '82022777317',
            Gender: 'Female',
            EmergencyContact: {
                Name: '',
                PhoneNumber: '',
            },
        },
        {
            UserId: 4,
            Email: 'jan@nowak.pl',
            FirstName: 'Sonia',
            LastName: 'Khan',
            PhoneNumber: '(03890) 985965',
            PESEL: '82022777317',
            Gender: 'Female',
            EmergencyContact: {
                Name: '',
                PhoneNumber: '',
            },
        },
        {
            UserId: 5,
            Email: 'jan@nowak.pl',
            FirstName: 'Joel',
            LastName: 'Smith',
            PhoneNumber: '(0531) 220 3025',
            PESEL: '82022777317',
            Gender: 'Female',
            EmergencyContact: {
                Name: '',
                PhoneNumber: '',
            },
        },
        {
            UserId: 6,
            Email: 'jan@nowak.pl',
            FirstName: 'Ken',
            LastName: 'Mason',
            PhoneNumber: '+44(0)523835399',
            PESEL: '82022777317',
            Gender: 'Male',
            EmergencyContact: {
                Name: '',
                PhoneNumber: '',
            },
        },
        {
            UserId: 7,
            Email: 'jan@nowak.pl',
            FirstName: 'Zuzanna',
            LastName: 'Wesołowska',
            PhoneNumber: '725552728',
            PESEL: '82022777317',
            Gender: 'Female',
            EmergencyContact: {
                Name: '',
                PhoneNumber: '',
            },
        },
        {
            UserId: 8,
            Email: 'jan@nowak.pl',
            FirstName: 'Miłosz',
            LastName: 'Ziółkowski',
            PhoneNumber: '725552728',
            PESEL: '82022777317',
            Gender: 'Male',
            EmergencyContact: {
                Name: '',
                PhoneNumber: '',
            },
        },
        {
            UserId: 9,
            Email: 'jan@nowak.pl',
            FirstName: 'Jakub',
            LastName: 'Woźniak',
            PhoneNumber: '725552728',
            PESEL: '82022777317',
            Gender: 'Male',
            EmergencyContact: {
                Name: '',
                PhoneNumber: '',
            },
        },
        {
            UserId: 10,
            Email: 'jan@nowak.pl',
            FirstName: 'Hubert',
            LastName: 'Jabłoński',
            PhoneNumber: '725552728',
            PESEL: '82022777317',
            Gender: 'Male',
            EmergencyContact: {
                Name: '',
                PhoneNumber: '',
            },
        },
        {
            UserId: 11,
            Email: 'jan@nowak.pl',
            FirstName: 'Aleksandra',
            LastName: 'Szczepańska',
            PhoneNumber: '725552728',
            PESEL: '82022777317',
            Gender: 'Female',
            EmergencyContact: {
                Name: '',
                PhoneNumber: '',
            },
        },
        {
            UserId: 12,
            Email: 'jan@nowak.pl',
            FirstName: 'Jakub',
            LastName: 'Szymański',
            PhoneNumber: '725552728',
            PESEL: '82022777317',
            Gender: 'Male',
            EmergencyContact: {
                Name: '',
                PhoneNumber: '',
            },
        },
        {
            UserId: 13,
            Email: 'jan@nowak.pl',
            FirstName: 'Robert',
            LastName: 'Wójcik',
            PhoneNumber: '725552728',
            PESEL: '82022777317',
            Gender: 'Male',
            EmergencyContact: {
                Name: '',
                PhoneNumber: '',
            },
        },
        {
            UserId: 14,
            Email: 'jan@nowak.pl',
            FirstName: 'Weronika',
            LastName: 'Stępień',
            PhoneNumber: '725552728',
            PESEL: '82022777317',
            Gender: 'Female',
            EmergencyContact: {
                Name: '',
                PhoneNumber: '',
            },
        },
        {
            UserId: 15,
            Email: 'jan@nowak.pl',
            FirstName: 'Piotr',
            LastName: 'Jankowski',
            PhoneNumber: '725552728',
            PESEL: '82022777317',
            Gender: 'Male',
            EmergencyContact: {
                Name: '',
                PhoneNumber: '',
            },
        },
        {
            UserId: 16,
            Email: 'jan@nowak.pl',
            FirstName: 'Julia',
            LastName: 'Janicka',
            PhoneNumber: '725552728',
            PESEL: '82022777317',
            Gender: 'Female',
            EmergencyContact: {
                Name: '',
                PhoneNumber: '',
            },
        },
        {
            UserId: 17,
            Email: 'jan@nowak.pl',
            FirstName: 'Julia',
            LastName: 'Urbaniak',
            PhoneNumber: '725552728',
            PESEL: '82022777317',
            Gender: 'Female',
            EmergencyContact: {
                Name: '',
                PhoneNumber: '',
            },
        },
        {
            UserId: 18,
            Email: 'jan@nowak.pl',
            FirstName: 'Maciej',
            LastName: 'Kowalski',
            PhoneNumber: '725552728',
            PESEL: '82022777317',
            Gender: 'Male',
            EmergencyContact: {
                Name: '',
                PhoneNumber: '',
            },
        },
        {
            UserId: 19,
            Email: 'jan@nowak.pl',
            FirstName: 'Weronika',
            LastName: 'Grzybowska',
            PhoneNumber: '725552728',
            PESEL: '82022777317',
            Gender: 'Female',
            EmergencyContact: {
                Name: '',
                PhoneNumber: '',
            },
        },
        {
            UserId: 20,
            Email: 'jan@nowak.pl',
            FirstName: 'Kaja',
            LastName: 'Kozłowska',
            PhoneNumber: '725552728',
            PESEL: '82022777317',
            Gender: 'Female',
            EmergencyContact: {
                Name: '',
                PhoneNumber: '',
            },
        },
    ];

    useEffect(() => {
        const selectedPatient = patients.find(
            patient => patient.UserId.toString() === match.params.id
        );

        setSelectedPatient(selectedPatient);
    }, [match.params.id]);

    return (
        <main className="patients">
            <PatientsList patients={patients} />
            <PatientDetails patient={selectedPatient} />
        </main>
    );
};

PatientsPage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string,
        }),
    }),
};

export default PatientsPage;
