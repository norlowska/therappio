import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clientActions } from '../../_actions';
import ClientsList from './ClientsList/ClientsList';
import ClientDetails from './ClientDetails/ClientDetails';

const ClientsPage = ({ match, clients, getAll }) => {
    const [selectedClient, setSelectedClient] = useState(null);

    // const clients = [
    //     {
    //         UserId: 1,
    //         "email": 'srobbins@yahoo.com',
    //         "firstName": 'Sharon',
    //         "lastName": 'Robbins',
    //         phoneNumber: '04681 15468',
    //         PESEL: '82022777317',
    //         Birthdate: new Date(1972, 10, 5),
    //         gender: 'Female',
    //         address: '3 Bell Forge, Ianmouth, W14 8AZ',
    //         emergencyContact: {
    //            name: 'Bruce Robbins',
    //             phoneNumber: '(0809) 085 1007',
    //         },
    //         MoodChart: {
    //             Week: [
    //                 {
    //                    name: 'High energy,unpleasant',
    //                     value: 30,
    //                 },
    //                 {
    //                    name: 'High energy, pleasant',
    //                     value: 35,
    //                 },
    //                 {
    //                    name: 'Low energy, unpleasant',
    //                     value: 20,
    //                 },
    //                 {
    //                    name: 'Low energy, pleasant',
    //                     value: 15,
    //                 },
    //             ],
    //             Month: [
    //                 {
    //                    name: 'High energy, unpleasant',
    //                     value: 30,
    //                 },
    //                 {
    //                    name: 'High energy, pleasant',
    //                     value: 35,
    //                 },
    //                 {
    //                    name: 'Low energy, Unpleasant',
    //                     value: 20,
    //                 },
    //                 {
    //                    name: 'Low energy, pleasant',
    //                     value: 15,
    //                 },
    //             ],
    //         },
    //     },
    //     {
    //         "firstName": 'Sibyl',
    //         "lastName": 'Blanda',
    //         phoneNumber: '+44(0)901265037',
    //         PESEL: '82022777317',
    //         gender: 'Female',
    //         emergencyContact: {
    //            name: '',
    //             phoneNumber: '',
    //         },
    //     },
    //     {
    //         "firstName": 'Sonia',
    //         "lastName": 'Khan',
    //         phoneNumber: '(03890) 985965',
    //         gender: 'Female',
    //         emergencyContact: {
    //            name: '',
    //             phoneNumber: '',
    //         },
    //     },
    //     {
    //         "firstName": 'Joel',
    //         "lastName": 'Smith',
    //         phoneNumber: '(0531) 220 3025',
    //         gender: 'Female',
    //         emergencyContact: {
    //            name: '',
    //             phoneNumber: '',
    //         },
    //     },
    //     {
    //         "firstName": 'Ken',
    //         "lastName": 'Mason',
    //         phoneNumber: '+44(0)523835399',
    //         gender: 'Male',
    //         emergencyContact: {
    //            name: '',
    //             phoneNumber: '',
    //         },
    //     },
    //     {
    //         "firstName": 'Zuzanna',
    //         "lastName": 'Wesołowska',
    //         phoneNumber: '725552728',
    //         gender: 'Female',
    //         emergencyContact: {
    //            name: '',
    //             phoneNumber: '',
    //         },
    //     },
    //     {
    //         "firstName": 'Miłosz',
    //         "lastName": 'Ziółkowski',
    //         phoneNumber: '725552728',
    //         gender: 'Male',
    //         emergencyContact: {
    //            name: '',
    //             phoneNumber: '',
    //         },
    //     },
    //     {
    //         "firstName": 'Jakub',
    //         "lastName": 'Woźniak',
    //         phoneNumber: '725552728',
    //         gender: 'Male',
    //         emergencyContact: {
    //            name: '',
    //             phoneNumber: '',
    //         },
    //     },
    //     {
    //         "firstName": 'Hubert',
    //         "lastName": 'Jabłoński',
    //         phoneNumber: '725552728',
    //         gender: 'Male',
    //         emergencyContact: {
    //            name: '',
    //             phoneNumber: '',
    //         },
    //     },
    //     {
    //         UserId: 11,
    //         "email": 'jan@nowak.pl',
    //         "firstName": 'Aleksandra',
    //         "lastName": 'Szczepańska',
    //         phoneNumber: '725552728',
    //         PESEL: '82022777317',
    //         gender: 'Female',
    //         emergencyContact: {
    //            name: '',
    //             phoneNumber: '',
    //         },
    //     },
    //     {
    //         UserId: 12,
    //         "email": 'jan@nowak.pl',
    //         "firstName": 'Jakub',
    //         "lastName": 'Szymański',
    //         phoneNumber: '725552728',
    //         PESEL: '82022777317',
    //         gender: 'Male',
    //         emergencyContact: {
    //            name: '',
    //             phoneNumber: '',
    //         },
    //     },
    //     {
    //         UserId: 13,
    //         "email": 'jan@nowak.pl',
    //         "firstName": 'Robert',
    //         "lastName": 'Wójcik',
    //         phoneNumber: '725552728',
    //         PESEL: '82022777317',
    //         gender: 'Male',
    //         emergencyContact: {
    //            name: '',
    //             phoneNumber: '',
    //         },
    //     },
    //     {
    //         UserId: 14,
    //         "email": 'jan@nowak.pl',
    //         "firstName": 'Weronika',
    //         "lastName": 'Stępień',
    //         phoneNumber: '725552728',
    //         PESEL: '82022777317',
    //         gender: 'Female',
    //         emergencyContact: {
    //            name: '',
    //             phoneNumber: '',
    //         },
    //     },
    //     {
    //         UserId: 15,
    //         "email": 'jan@nowak.pl',
    //         "firstName": 'Piotr',
    //         "lastName": 'Jankowski',
    //         phoneNumber: '725552728',
    //         PESEL: '82022777317',
    //         gender: 'Male',
    //         emergencyContact: {
    //            name: '',
    //             phoneNumber: '',
    //         },
    //     },
    //     {
    //         UserId: 16,
    //         "email": 'jan@nowak.pl',
    //         "firstName": 'Julia',
    //         "lastName": 'Janicka',
    //         phoneNumber: '725552728',
    //         PESEL: '82022777317',
    //         gender: 'Female',
    //         emergencyContact: {
    //            name: '',
    //             phoneNumber: '',
    //         },
    //     },
    //     {
    //         UserId: 17,
    //         "email": 'jan@nowak.pl',
    //         "firstName": 'Julia',
    //         "lastName": 'Urbaniak',
    //         phoneNumber: '725552728',
    //         PESEL: '82022777317',
    //         gender: 'Female',
    //         emergencyContact: {
    //            name: '',
    //             phoneNumber: '',
    //         },
    //     },
    //     {
    //         UserId: 18,
    //         "email": 'jan@nowak.pl',
    //         "firstName": 'Maciej',
    //         "lastName": 'Kowalski',
    //         phoneNumber: '725552728',
    //         PESEL: '82022777317',
    //         gender: 'Male',
    //         emergencyContact: {
    //            name: '',
    //             phoneNumber: '',
    //         },
    //     },
    //     {
    //         UserId: 19,
    //         "email": 'jan@nowak.pl',
    //         "firstName": 'Weronika',
    //         "lastName": 'Grzybowska',
    //         phoneNumber: '725552728',
    //         PESEL: '82022777317',
    //         gender: 'Female',
    //         emergencyContact: {
    //            name: '',
    //             phoneNumber: '',
    //         },
    //     },
    //     {
    //         UserId: 20,
    //         "email": 'jan@nowak.pl',
    //         "firstName": 'Kaja',
    //         "lastName": 'Kozłowska',
    //         phoneNumber: '725552728',
    //         PESEL: '82022777317',
    //         gender: 'Female',
    //         emergencyContact: {
    //            name: '',
    //             phoneNumber: '',
    //         },
    //     },
    // ];

    // Set selected client
    useEffect(() => {
        const selectedClient = clients.find(
            client => client.shortId.toString() === match.params.id
        );

        setSelectedClient(selectedClient);
    }, [match.params.id]);

    // Fetch clients
    useEffect(() => {
        getAll();
    }, []);

    return (
        <main className="clients">
            <ClientsList clients={clients} />
            <ClientDetails client={selectedClient} />
        </main>
    );
};

ClientsPage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string,
        }),
    }),
    clients: PropTypes.arrayOf(PropTypes.object),
    getAll: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
    getAll: clientActions.getAll,
};

const mapStateToProps = state => ({
    clients: state.clients.items,
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientsPage);
