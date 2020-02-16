import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import { clientActions } from '../../_actions';
import ClientsList from './ClientsList/ClientsList';
import ClientDetails from './ClientDetails/ClientDetails';
import 'react-toastify/dist/ReactToastify.css';

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
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange
                draggable
                pauseOnHover
            />
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
