import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clientActions } from '../../_actions';
import ClientsList from './ClientsList/ClientsList';
import ClientDetails from './ClientDetails/ClientDetails';

const ClientsPage = ({ match, clients, getAll, getMoodRecords }) => {
    const [selectedClient, setSelectedClient] = useState({});

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

    // Set selected client
    useEffect(() => {
        const selectedClient = clients.find(
            client => client.shortId.toString() === match.params.id
        );
        if (selectedClient && !selectedClient.hasOwnProperty('moodRecords')) {
            getMoodRecords(selectedClient._id);
        }
        // if (selectedClient && !selectedClient.hasOwnProperty('journalRecords')) {
        //     getJournalRecords(selectedClient._id);
        // }
        // if (selectedClient && !selectedClient.hasOwnProperty('assignments')) {
        //     getAssignments(selectedClient._id);
        // }
        // if (selectedClient && !selectedClient.hasOwnProperty('therapySessions')) {
        //     getTherapySessions(selectedClient._id);
        // }

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
    getMoodRecords: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
    getAll: clientActions.getAll,
    getMoodRecords: clientActions.getMoodRecords,
};

const mapStateToProps = state => ({
    clients: state.clients.items,
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientsPage);
