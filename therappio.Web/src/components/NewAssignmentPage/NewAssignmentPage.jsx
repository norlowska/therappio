/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clientActions } from '../../_actions';
import { history } from '../../_helpers';
import FormBuilder from './FormBuilder/FormBuilder';
import style from './NewAssignmentPage.module.scss';

const NewAssignmentPage = ({ match, clients, createAssignment }) => {
    const [selectedClient, setSelectedClient] = useState(undefined);

    useEffect(() => {
        const selectedClient = clients.find(
            client => client.shortId.toString() === match.params.clientId
        );

        setSelectedClient(selectedClient);
    }, [match.params.clientId, clients]);

    const handleCreate = assignment => {
        assignment['client'] = selectedClient._id;
        console.log(assignment);
        createAssignment(assignment);
        history.push(`/clients/${match.params.clientId}`);
    };

    return (
        <main className="center-container">
            <FormBuilder onSubmit={handleCreate} />
        </main>
    );
};

NewAssignmentPage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            clientId: PropTypes.string,
        }),
    }),
    clients: PropTypes.arrayOf(PropTypes.object),
    createAssignment: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ clients: state.clients.items });

const mapDispatchToProps = { createAssignment: clientActions.createAssignment };

export default connect(mapStateToProps, mapDispatchToProps)(NewAssignmentPage);
