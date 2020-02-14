import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clientActions } from '../../_actions';
import ClientsList from './ClientsList/ClientsList';
import ClientDetails from './ClientDetails/ClientDetails';

const ClientsPage = ({ match, clients, getAll }) => {
    const [selectedClient, setSelectedClient] = useState(undefined);

    // Set selected client
    useEffect(() => {
        const selectedClient = clients.find(
            client => client.shortId.toString() === match.params.clientId
        );

        setSelectedClient(selectedClient);
    }, [match.params.clientId, clients]);

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
            clientId: PropTypes.string,
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
