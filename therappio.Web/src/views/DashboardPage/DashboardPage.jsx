import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import style from './DashboardPage.module.scss';

// TODO: Next client above schedule
// TODO: Fetch events (sessions) for therapist
// TODO: Add session
// TODO: save defaultView type in locale
const localizer = momentLocalizer(moment);

const DashboardPage = props => {
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
    const client = {
        UserId: 1,
        Email: 'jan@nowak.pl',
        FirstName: 'Jan',
        LastName: 'Nowak',
        PhoneNumber: '725554614',
        PESEL: '82022777317',
        Birthdate: new Date(1972, 10, 5),
        Gender: 'ale',
        Address: 'ul. Przykładowa 15 m. 6, 03-946 Przykładowo',
    };

    return (
        <>
            <Row>
                <Col span={21}>
                    <h2>Schedule</h2>
                </Col>
                <Col className={`${style.addEventColumn} clearfix`}>
                    <Button type="primary" icon={<i className="las la-plus" />}>
                        Add event
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
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
                </Col>
            </Row>
        </>
    );
};

DashboardPage.propTypes = {
    user: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
    }),
};

const mapStateToProps = state => ({ user: state.auth.user });

export default connect(mapStateToProps)(DashboardPage);
