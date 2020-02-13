import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
// import { PieChart, Pie, Cell } from 'recharts';
import { Link } from 'react-router-dom';
import { clientActions } from '../../../_actions';
import Tabs from '../../shared/Tabs';
import Table from '../../shared/Table';
import styles from './ClientDetails.module.scss';

const moodchartKeys = [
    { color: '#f44336', name: 'High energy, unpleasant' },
    { color: '#F7C602', name: 'High energy, pleasant' },
    { color: '#42a5f5', name: 'Low energy, unpleasant' },
    { color: '#66bb6a', name: 'Low energy, pleasant' },
];

const sessionsColumns = [
    {
        Header: '#',
        accessor: 'session_no',
    },
    {
        Header: 'Date',
        accessor: 'date',
        Cell: date => moment(date).format('DD MMM YYYY HH:mm'),
    },
    {
        Header: 'Notes',
        accessor: 'notes',
        style: {
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
        },
    },
    {
        Header: '',
        id: 'read-more-btn',
        Cell: row => <button className="primary-btn">Read more</button>,
    },
];

const assignmentsColumns = [
    {
        Header: 'Title',
        accessor: 'title',
    },
    {
        Header: 'Creation date',
        accessor: 'createdAt',
        Cell: date => moment(date).format('DD MMM YYYY HH:mm'),
    },
    {
        Header: 'Due date',
        accessor: 'dueDate',
        Cell: date => moment(date).format('DD MMM YYYY HH:mm'),
    },
    {
        Header: 'Status',
        accessor: 'status',
    },
    {
        Header: '',
        id: 'review-btn',
        Cell: row => <button className="primary-btn">Review</button>,
    },
];

const moodRecordsColumns = [
    {
        Header: 'Name',
        id: 'mood_name',
        accessor: mood => mood.name,
        // eslint-disable-next-line react/prop-types
        Cell: ({ row: { original } }) => {
            return (
                <span
                    style={{
                        // eslint-disable-next-line react/prop-types
                        color: moodchartKeys[original.mood.quadrant - 1].color,
                    }}
                >
                    {
                        // eslint-disable-next-line react/prop-types
                        original.mood.name
                    }
                </span>
            );
        },
    },
    {
        Header: 'Creation date',
        accessor: 'createdAt',
        Cell: date => moment(date).format('DD MMM YYYY HH:mm'),
    },
    {
        Header: '',
        accessor: 'read-more-btn',
        Cell: row => <button className="primary-btn">Read more</button>,
    },
];

const journalRecordsColumns = [
    {
        Header: 'Type',
        accessor: record =>
            record.type === 'gratitude' ? 'Gratitude Journal' : 'Diary',
    },
    {
        Header: 'Creation date',
        accessor: 'createdAt',
        Cell: date => moment(date).format('DD MMM YYYY HH:mm'),
    },
    {
        Header: '',
        accessor: 'read-more-btn',
        Cell: row => <button className="primary-btn">Read more</button>,
    },
];

// TODO: Self-assessement chart
// TODO: Send message button
const ClientDetails = ({ client, getDetails }) => {
    // const chartLabel = ({ percent, name, index }) => {
    //     return <text>{`${(percent * 100).toFixed(0)}% ${name}`}</text>;
    // };

    useEffect(() => {
        if (
            client &&
            !client.hasOwnProperty('therapySessions') &&
            !client.hasOwnProperty('assignments') &&
            !client.hasOwnProperty('moodRecords') &&
            !client.hasOwnProperty('journalRecords')
        ) {
            getDetails(client._id);
        }
    }, [client]);

    return client == null ? (
        <div className={styles.notSelectedClient}>
            <p>Select client from the list to see details</p>
        </div>
    ) : (
        <div className={styles.clientRecord}>
            <div className={styles.col65}>
                <section>
                    <div className={styles.name}>
                        <h2>{`${client.firstName} ${client.lastName}`}</h2>
                        <h4 className={styles.id}>
                            Client ID: {client.shortId}
                        </h4>
                    </div>
                    <div className={styles.clientDetails}>
                        <div className={styles.sectionHeading}>
                            <h4>Personal details</h4>
                        </div>
                        <div className={`card ${styles.personalInfo}`}>
                            <div className={styles.col}>
                                <div className={styles.row}>
                                    <strong className={styles.title}>
                                        Gender
                                    </strong>
                                    <span className={styles.cont}>
                                        {client.gender}
                                    </span>
                                </div>
                                <div className={styles.row}>
                                    <strong className={styles.title}>
                                        DoB
                                    </strong>
                                    <span className={styles.cont}>
                                        {moment(client.dateOfBirth).format(
                                            'DD MMM YYYY'
                                        )}
                                    </span>
                                </div>
                                <div className={styles.row}>
                                    <strong className={styles.title}>
                                        Age
                                    </strong>
                                    <span className={styles.cont}>
                                        {!!client.dateOfBirth &&
                                            moment().diff(
                                                client.dateOfBirth,
                                                'years'
                                            )}
                                    </span>
                                </div>
                            </div>
                            <div className={styles.col}>
                                <div className={styles.row}>
                                    <strong className={styles.title}>
                                        Phone
                                    </strong>
                                    <span className={styles.cont}>
                                        {client.phoneNumber}
                                    </span>
                                </div>
                                <div className={styles.row}>
                                    <strong className={styles.title}>
                                        E-mail
                                    </strong>
                                    <span className={styles.cont}>
                                        {client.email}
                                    </span>
                                </div>
                                <div className={styles.row}>
                                    <strong className={styles.title}>
                                        Address
                                    </strong>
                                    <span className={styles.cont}>
                                        {client.address}
                                    </span>
                                </div>
                            </div>
                            <div className={styles.emergencyContact}>
                                <strong className={styles.title}>
                                    Emergency Contact
                                </strong>
                                <p>
                                    {!!client.emergencyContact &&
                                        client.emergencyContact.name &&
                                        ' ' && (
                                            <span
                                                className={
                                                    styles.emergencyNumber
                                                }
                                            >
                                                <i className="la la-phone-alt" />
                                                {
                                                    client.emergencyContact
                                                        .phoneNumber
                                                }
                                            </span>
                                        )}
                                </p>
                            </div>
                            <div
                                className={`${styles.row} ${styles.diagnosis}`}
                            >
                                <strong className={styles.title}>
                                    Diagnosis
                                </strong>
                                <ul className={styles.cont}>
                                    {!!client.diagnosis &&
                                    client.diagnosis.length > 0
                                        ? client.diagnosis.map(disorder => (
                                              <li>{disorder}</li>
                                          ))
                                        : 'Not diagnosed'}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={styles.sessionsSection}>
                    <div className={styles.sectionHeading}>
                        <h4>Sessions</h4>
                    </div>
                    <div className={`card ${styles.sessions}`}>
                        <Table
                            columns={sessionsColumns}
                            data={client.therapySessions || []}
                        />
                    </div>
                </section>
                <section className={styles.assignmentsSection}>
                    <div className={styles.sectionHeading}>
                        <h4>Assignments</h4>
                        <Link to="/assignments/new">
                            <button className={`primary-btn`}>
                                <i className={`las la-plus`} /> New
                            </button>
                        </Link>
                    </div>
                    <div className={`card ${styles.assignments}`}>
                        <Table
                            columns={assignmentsColumns}
                            data={client.assignments || []}
                        />
                    </div>
                </section>
            </div>
            <div className={styles.col35}>
                {/* <section className={styles.moodSection}>
                    <div className={styles.sectionHeading}>
                        <h4>Mood Chart</h4>
                    </div>
                    <div className={`card ${styles.moodChart}`}>
                        <div className={styles.selectPeriod}>
                            <button className={`primary-btn`}>Week View</button>
                            <button
                                className={`primary-btn ${styles.invertBtn}`}
                            >
                                Month View
                            </button>
                        </div>
                        <PieChart width={410} height={240}>
                            <Pie
                                data={client.MoodChart.Week}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                            >
                                {moodchartKeys.map((entry, index) => (
                                    <Cell key={index} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                        <div className={styles.legend}>
                            {moodchartKeys.map((entry, index) => (
                                <div className={styles.label} key={index}>
                                    <div
                                        style={{
                                            backgroundColor: entry.color,
                                        }}
                                        className={styles.legendCircle}
                                    />
                                    <span
                                        style={{
                                            color: entry.color,
                                            fontSize: 17,
                                        }}
                                    >
                                        {entry.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section> */}
                <section className={styles.recordsSection}>
                    <div className={`card ${styles.records}`}>
                        <Tabs>
                            <div label="Mood Records">
                                <div className={`${styles.moodRecords}`}>
                                    <Table
                                        columns={moodRecordsColumns}
                                        data={client.moodRecords || []}
                                    />
                                </div>
                            </div>
                            <div label="Journal Records">
                                <div className={`${styles.journalRecords}`}>
                                    <Table
                                        columns={journalRecordsColumns}
                                        data={client.journalRecords || []}
                                    />
                                </div>
                            </div>
                        </Tabs>
                    </div>
                </section>
            </div>
            {/* <section className={styles.assessmentsSection}>
                <div className={styles.sectionHeading}>
                    <h4>Self-assessement</h4>
                </div>
                <div className={`card ${styles.sessions}`}>
                    <table />
                </div>
            </section> */}
        </div>
    );
};

ClientDetails.propTypes = {
    client: PropTypes.object,
    getDetails: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
    getDetails: clientActions.getDetails,
};

export default connect(null, mapDispatchToProps)(ClientDetails);
