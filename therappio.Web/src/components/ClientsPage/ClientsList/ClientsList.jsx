import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AddClient from '../AddClient/AddClient';
import style from './ClientsList.module.scss';

const ClientsList = ({ clients }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const handleChange = event => {
        setSearchQuery(event.target.value);
    };

    // Filter list of clients
    useEffect(() => {
        const results = clients.filter(
            person =>
                person.firstName
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                person.lastName
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
        );
        setSearchResults(results);
    }, [searchQuery, clients]);

    return (
        <div className="sidebar">
            <div className={style.header}>
                <h3>Clients</h3>
                <AddClient />
            </div>
            <form className={style.searchClient}>
                <div className={'formGroup'}>
                    <label>
                        <i
                            className={'la la-search'}
                            title="Search clients"
                            aria-hidden
                        />
                    </label>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleChange}
                        placeholder="Search clients"
                    />
                </div>
            </form>
            <ul className={style.clientsList}>
                {searchResults.map(client => {
                    return (
                        <li key={client._id}>
                            <Link
                                to={`/clients/${client._id}`}
                                className={'clientCard'}
                            >
                                <div className={'clientInfo'}>
                                    <div
                                        className={'name'}
                                    >{`${client.firstName} ${client.lastName}`}</div>
                                    <div className={'phone'}>
                                        <i className={'la la-phone-alt'} />
                                        <span className={style.phoneNumber}>
                                            {client.phoneNumber}
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

ClientsList.propTypes = {
    clients: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ClientsList;
