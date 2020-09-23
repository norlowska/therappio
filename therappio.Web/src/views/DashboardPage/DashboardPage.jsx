import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Button, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { history } from '../../_utilities';
import style from './DashboardPage.module.scss';
import {
    format,
    parse,
    startOfWeek,
    getDay,
    addHours,
    startOfDay,
    endOfDay,
} from 'date-fns';
import { therapyService } from '../../_services';

const locales = {
    'en-US': require('date-fns/locale/en-US'),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const DashboardPage = ({ therapist }) => {
    const [data, setData] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    const handleRangeChange = range => {
        const from = range.length
            ? startOfDay(range[0])
            : startOfDay(range.start);
        const to = range.length
            ? endOfDay(range[range.length - 1])
            : endOfDay(range.end);
        if (!isFetching) {
            fetchTherapies(startOfDay(from), endOfDay(to));
        }
    };

    const handleSelectEvent = event => history.push(`/clients/${event.client}`);

    const fetchTherapies = (from, to) => {
        setIsFetching(true);
        therapyService
            .getTherapiesBetween(
                format(from, "yyyy-MM-dd'T'HH:mm"),
                format(to, "yyyy-MM-dd'T'HH:mm"),
                therapist._id
            )
            .then(response => {
                let events = [];

                response.therapies.forEach(therapy => {
                    therapy.plansDocs.forEach(plan => {
                        plan.sessions.forEach((session, idx) => {
                            events = [
                                ...events,
                                {
                                    start: new Date(session),
                                    end: addHours(new Date(session), 1),
                                    id: `${plan._id}session${idx + 1}`,
                                    title: `${therapy.clientObj.firstName} ${therapy.clientObj.lastName} ${therapy.clientObj._id}`,
                                    client: therapy.client,
                                },
                            ];
                        });
                    });
                });
                setData(events);
                setIsFetching(false);
            })
            .catch(err => {
                setIsFetching(false);
                console.log(err);
            });
    };

    useEffect(() => {
        if (therapist && therapist._id && !isFetching) {
            const today = startOfDay(new Date());
            fetchTherapies(addHours(today, 8), addHours(today, 22));
        }
    }, [therapist]);

    return (
        <>
            <Row>
                <Col span={21}>
                    <h2>Schedule</h2>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Calendar
                        localizer={localizer}
                        events={data}
                        defaultView={'day'}
                        views={['month', 'week', 'day']}
                        startAccessor="start"
                        endAccessor="end"
                        onRangeChange={handleRangeChange}
                        min={addHours(startOfDay(new Date()), 8)}
                        max={addHours(startOfDay(new Date()), 21)}
                        onSelectEvent={handleSelectEvent}
                    />
                </Col>
            </Row>
        </>
    );
};

const mapStateToProps = state => ({ therapist: state.auth.user });

export default connect(mapStateToProps)(DashboardPage);
