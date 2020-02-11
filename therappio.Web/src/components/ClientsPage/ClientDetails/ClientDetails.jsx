/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { PieChart, Pie, Cell } from 'recharts';
import { Link } from 'react-router-dom';
import styles from './ClientDetails.module.scss';

// TODO: Id as props
// TODO: Get Client by Id from store
// TODO: Self-assessement chart
// TODO: Assignements list
// TODO: Session notes
// TODO: Planned sessions
// TODO: Send message button
const ClientDetails = ({
    client,
    getMoodRecords,
}) => {
    // const calculateAge = birthday => {
    //     var ageDifMs = Date.now() - birthday.getTime();
    //     var ageDate = new Date(ageDifMs);
    //     return Math.abs(ageDate.getUTCFullYear() - 1970);
    // };
    // const chartLabel = ({ percent, name, index }) => {
    //     return <text>{`${(percent * 100).toFixed(0)}% ${name}`}</text>;
    // };

    const moodchartKeys = [
        { color: '#f44336', name: 'High energy, unpleasant' },
        { color: '#F7C602', name: 'High energy, pleasant' },
        { color: '#42a5f5', name: 'Low energy, unpleasant' },
        { color: '#66bb6a', name: 'Low energy, pleasant' },
    ];

    useEffect(() => {
        if (client && !client.hasOwnProperty('moodRecords')) {
            getMoodRecords(client._id);
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
                        <h3 className={styles.id}>
                            Client ID: {client.shortId}
                        </h3>
                    </div>
                    <div className={styles.clientDetails}>
                        <div className={styles.sectionHeading}>
                            <h3>Personal details</h3>
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
                                        {/* {calculateAge(client.Birthdate)} */}
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
                                    {client.emergencyContact &&
                                        client.emergencyContact.name}{' '}
                                    <span className={styles.emergencyNumber}>
                                        <i className="la la-phone-alt" />
                                        {client.emergencyContact &&
                                            client.emergencyContact.phoneNumber}
                                    </span>
                                </p>
                            </div>
                            <div
                                className={`${styles.row} ${styles.diagnosis}`}
                            >
                                <strong className={styles.title}>
                                    Diagnosis
                                </strong>
                                <ul className={styles.cont}>
                                    <li>Panic Attack</li>
                                    <li>Anxiety</li>
                                    <li>Social Anxiety Disorder</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <section className={styles.assignmentsSection}>
                    <div className={styles.sectionHeading}>
                        <h3>Assignments</h3>
                        <Link to="/assignments/new">
                            <button className={`primary-btn`}>
                                <i className={`las la-plus`} /> New
                            </button>
                        </Link>
                    </div>
                    <div className={`card ${styles.assignments}`}>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Creation date</th>
                                    <th scope="col">Due date</th>
                                    <th scope="col" />
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Assignment #1</td>
                                    <td>28 Oct 2019 10:00</td>
                                    <td>4 Nov 2019 10:00</td>
                                    <td>
                                        <button className="primary-btn">
                                            Review
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Diary</td>
                                    <td>28 Oct 2019 11:36</td>
                                    <td>4 Nov 2019 10:00</td>
                                    <td>
                                        <button className="primary-btn">
                                            Review
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Gratitude Journal</td>
                                    <td>28 Oct 2019 11:37</td>
                                    <td>4 Oct 2019 10:00</td>
                                    <td />
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
                <section className={styles.sessionsSection}>
                    <div className={styles.sectionHeading}>
                        <h3>Sessions</h3>
                    </div>
                    <div className={`card ${styles.sessions}`}>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Notes</th>
                                    <th scope="col" />
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>28 Oct 2019 10:00</td>
                                    <td className={styles.notes}>
                                        Mrs. Robbins exhibits symptoms of
                                        anxiety. Anxiety symptoms are occurring
                                        daily. She reports occurrences of
                                        difficulty concentrating. When anxious,
                                        she reports fears of losing control or
                                        of dying. Mrs. Little describes an
                                        exaggerated startle response.
                                    </td>
                                    <td>4 Nov 2019 10:00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
            <div className={styles.col35}>
                <section className={styles.moodSection}>
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
                                        style={{ backgroundColor: entry.color }}
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
            </div>
            {/* <section className={styles.assessmentsSection}>
                <div className={styles.sectionHeading}>
                    <h3>Self-assessement</h3>
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
    getMoodRecords: PropTypes.func.isRequired,
};
const mapDispatchToProps = {
    getMoodRecords: clientActions.getMoodRecords,
};

export default connect(null, mapDispatchToProps)(ClientDetails);
