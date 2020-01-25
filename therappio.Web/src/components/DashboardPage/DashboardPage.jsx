import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import style from './DashboardPage.module.scss';
// import '!style-loader!css-loader!react-big-calendar/lib/css/react-big-calendar.css';

// TODO: Next patient above schedule
// TODO: Fetch events (sessions) for therapist
// TODO: Add session
// TODO: save defaultView type in locale
const localizer = momentLocalizer(moment);

export default class DashboardPage extends Component {
    render () {
        const events = [
            {
                id: 0,
                title: 'Session: Ruth Roberts',
                start: new Date(2019, 11, 4, 10, 0, 0),
                end: new Date(2019, 11, 4, 11, 0, 0),
            },
            {
                id: 1,
                title: 'Session: Anthony Heckel',
                start: new Date(2019, 11, 4, 11, 15, 0),
                end: new Date(2019, 11, 4, 12, 15, 0),
            },
            {
                id: 2,
                title: 'Session: Harold Daley',
                start: new Date(2019, 11, 4, 14, 30, 0),
                end: new Date(2019, 11, 4, 15, 30, 0),
            },
        ];
        const patient = {
            UserId: 1,
            Email: 'jan@nowak.pl',
            FirstName: 'Jan',
            LastName: 'Nowak',
            PhoneNumber: '725554614',
            PESEL: '82022777317',
            Birthdate: new Date(1972, 10, 5),
            Gender: 'Male',
            Address: 'ul. Przykładowa 15 m. 6, 03-946 Przykładowo',
        };
        return (
            <main>
                <div className="sidebar">
                    <div className={style.welcome}>
                        <h2>Welcome, Doctor Philip!</h2>
                    </div>
                    <div className={style.nextPatient}>
                        <h3>Your next patient</h3>
                        <Link
                            to={`/patients/${patient.UserId}`}
                            key={patient.UserId}
                        >
                            <div className={'patientCard'}>
                                <div className={'patientInfo'}>
                                    <div
                                        className={'name'}
                                    >{`${patient.FirstName} ${patient.LastName}`}</div>
                                    <div
                                        className={'id'}
                                    >{`Patient ID: ${patient.UserId}`}</div>
                                    <div className={'phone'}>
                                        <i className={'la la-phone-alt'} />
                                        <span className={'phoneNumber'}>
                                            {patient.PhoneNumber}
                                        </span>
                                    </div>
                                </div>
                                <div className={'checkin-btn'}>
                                    <button className={'primary-btn'}>
                                        Check in
                                    </button>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className={style.sessionsSchedule}>
                    <div className={style.header}>
                        <h2>Schedule</h2>
                        <button className={`primary-btn ${style.addSession}`}>
                            <i className={`las la-plus`} /> Add event
                        </button>
                    </div>
                    <Calendar
                        localizer={localizer}
                        events={events}
                        defaultView={'day'}
                        views={['month', 'week', 'day']}
                        startAccessor="start"
                        endAccessor="end"
                        min={new Date(2019, 11, 4, 9, 0, 0)}
                        max={new Date(2019, 11, 4, 19, 0, 0)}
                    />
                </div>
            </main>
        );
    }
}
