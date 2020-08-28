/* eslint-disable react/prop-types */
import React, { useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
// import { PieChart, Pie, Cell } from 'recharts';
import { Link } from 'react-router-dom';
import { clientActions } from '../../../_actions';
import { Tabs, Table, Card, CardHeader, CardBody } from '../../../components';
import styles from './ClientDetails.module.scss';

const moodchartKeys = [
    { color: '#f44336', name: 'High energy, unpleasant' },
    { color: '#F7C602', name: 'High energy, pleasant' },
    { color: '#42a5f5', name: 'Low energy, unpleasant' },
    { color: '#66bb6a', name: 'Low energy, pleasant' },
];

// TODO: Self-assessement chart
// TODO: Send message button
const ClientDetails = ({ client, getDetails, deleteAssignment }) => {
    // const chartLabel = ({ percent, name, index }) => {
    //     return <text>{`${(percent * 100).toFixed(0)}% ${name}`}</text>;
    // };

    const sessionsColumns = useMemo(
        () => [
            {
                Header: '#',
                accessor: 'session_no',
            },
            {
                Header: 'Date',
                accessor: 'date',
                Cell: ({ row }) =>
                    moment(row.values.date).format('DD MMM YYYY HH:mm'),
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
                Header: 'Actions',
                id: 'actions',
                className: styles.actions,
                Cell: row => (
                    <button className="icon-btn">
                        <i
                            className="las la-chevron-circle-right"
                            title="Read more"
                        />
                    </button>
                ),
            },
        ],
        []
    );

    const assignmentsColumns = useMemo(
        () => [
            {
                Header: 'Title',
                accessor: 'title',
            },
            {
                Header: 'Creation date',
                accessor: 'createdAt',
                Cell: ({ row }) =>
                    moment(row.values.createdAt).format('DD MMM YYYY HH:mm'),
            },
            {
                Header: 'Due date',
                accessor: 'dueDate',
                Cell: ({ row }) =>
                    moment(row.values.dueDate).format('DD MMM YYYY HH:mm'),
            },
            {
                Header: 'Status',
                accessor: 'status',
            },
            {
                Header: 'Actions',
                id: 'actions',
                className: styles.actions,
                Cell: ({ row }) => {
                    if (row.original.client && row.original.client._id) {
                        if (
                            row.original.status === 'On time' ||
                            row.original.status === 'Late'
                        ) {
                            return (
                                <Link
                                    to={`/clients/${row.original.client._id}/assignment/${row.original._id}`}
                                    className="icon-btn"
                                >
                                    <i
                                        className="las la-chevron-circle-right"
                                        title="Review"
                                    />
                                </Link>
                            );
                        } else if (row.original.status === 'Not submitted') {
                            return (
                                <>
                                    <Link
                                        to={`/clients/${row.original.client._id}/assignment/${row.original._id}/edit`}
                                        className="icon-btn"
                                    >
                                        <i
                                            className="las la-pen"
                                            title="Edit assignment"
                                        />
                                    </Link>
                                    <button
                                        className="icon-btn"
                                        onClick={() =>
                                            deleteAssignment(row.original._id)
                                        }
                                    >
                                        <i
                                            className="las la-trash"
                                            title="Delete assignment"
                                        />
                                    </button>
                                </>
                            );
                        } else return null;
                    }
                },
            },
        ],
        []
    );

    const moodRecordsColumns = useMemo(
        () => [
            {
                Header: 'Name',
                id: 'mood_name',
                accessor: mood => mood.name,
                Cell: ({ row: { original } }) => {
                    return (
                        <span
                            style={{
                                color:
                                    moodchartKeys[original.mood.quadrant - 1]
                                        .color,
                            }}
                        >
                            {original.mood.name}
                        </span>
                    );
                },
            },
            {
                Header: 'Creation date',
                accessor: 'createdAt',
                Cell: ({ row }) =>
                    moment(row.values.createdAt).format('DD MMM YYYY HH:mm'),
            },
            {
                Header: 'Actions',
                accessor: 'actions',
                className: styles.actions,
                Cell: ({ row }) => (
                    <button
                        className="icon-btn"
                        {...row.getExpandedToggleProps()}
                    >
                        {row.isExpanded ? (
                            <i
                                className="las la-chevron-circle-up"
                                title="Read less"
                            />
                        ) : (
                            <i
                                className="las la-chevron-circle-right"
                                title="Read more"
                            />
                        )}
                    </button>
                ),
            },
        ],
        []
    );

    const journalRecordsColumns = useMemo(
        () => [
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
                Header: 'Actions',
                accessor: 'actions',
                className: styles.actions,
                Cell: ({ row }) => (
                    <button
                        className="icon-btn"
                        {...row.getExpandedToggleProps()}
                    >
                        {row.isExpanded ? (
                            <i
                                className="las la-chevron-circle-up"
                                title="Read less"
                            />
                        ) : (
                            <i
                                className="las la-chevron-circle-right"
                                title="Read more"
                            />
                        )}
                    </button>
                ),
            },
        ],
        []
    );

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

    const renderMoodComment = useCallback(
        ({ row }) => (
            <div {...row.getExpandedToggleProps()}>
                <span className={styles.commentHeader}>Comment:</span>
                {row.original.comment || 'No comment added'}
            </div>
        ),
        []
    );

    const renderJournalContent = useCallback(
        ({ row }) => (
            <div {...row.getExpandedToggleProps()}>
                <span className={styles.commentHeader}>Content:</span>
                {row.original.content || 'Empty'}
            </div>
        ),
        []
    );

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
                        <h4 className={styles.id}>Client ID: {client._id}</h4>
                    </div>
                    <Card className={styles.clientDetails}>
                        <CardBody className={styles.personalInfo}>
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
                                        {!!client.dateOfBirth &&
                                            moment(client.dateOfBirth).format(
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
                        </CardBody>
                    </Card>
                </section>
                <section className={styles.sessionsSection}>
                    <Card>
                        <CardHeader style={{ justifyContent: 'space-between' }}>
                            <h3>Sessions</h3>
                            <Link
                                to={`/clients/${client._id}/assignments/new`}
                                className={`primary-btn`}
                            >
                                <i className={`las la-plus`} /> New
                            </Link>
                        </CardHeader>
                        <CardBody>
                            <Table
                                columns={sessionsColumns}
                                data={client.therapySessions || []}
                            />
                        </CardBody>
                    </Card>
                </section>
                <section className={styles.assignmentsSection}>
                    <Card>
                        <CardHeader style={{ justifyContent: 'space-between' }}>
                            <h3>Assignments</h3>
                            <Link
                                to={`/clients/${client._id}/assignments/new`}
                                className={`primary-btn`}
                            >
                                <i className={`las la-plus`} /> New
                            </Link>
                        </CardHeader>
                        <CardBody>
                            <Table
                                columns={assignmentsColumns}
                                data={client.assignments || []}
                            />
                        </CardBody>
                    </Card>
                </section>
            </div>
            <div className={styles.col35}>
                {/* <section className={styles.moodSection}>
                    <div className={styles.sectionHeading}>
                        <h3>Mood Chart</h3>
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
                    <Card>
                        <CardBody>
                            <Tabs>
                                <div label="Mood Records">
                                    <div className={`${styles.moodRecords}`}>
                                        <Table
                                            columns={moodRecordsColumns}
                                            data={client.moodRecords || []}
                                            renderRowSubComponent={
                                                renderMoodComment
                                            }
                                        />
                                    </div>
                                </div>
                                <div label="Journal Records">
                                    <div className={`${styles.journalRecords}`}>
                                        <Table
                                            columns={journalRecordsColumns}
                                            data={client.journalRecords || []}
                                            renderRowSubComponent={
                                                renderJournalContent
                                            }
                                        />
                                    </div>
                                </div>
                            </Tabs>
                        </CardBody>
                    </Card>
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
    deleteAssignment: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
    getDetails: clientActions.getDetails,
    deleteAssignment: clientActions.deleteAssignment,
};

export default connect(null, mapDispatchToProps)(ClientDetails);
