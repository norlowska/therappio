import React from 'react';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import { NavLink } from 'react-router-dom';
import { Card, Table, Button } from 'antd';
import { selectClientTherapySessions } from '../../_selectors';
import style from './SessionsCard.module.scss';

const columns = [
    {
        key: 'session_no',
        title: '#',
        align: 'center',
        dataIndex: 'session_no',
    },
    {
        key: 'date',
        title: 'Date',
        align: 'center',
        dataIndex: 'date',
        render: (text, record, index) => (
            <>{dayjs(record.date).format('D MMM YYYY  HH:mm')}</>
        ),
    },
    {
        key: 'notes',
        title: 'Notes',
        align: 'center',
        dataIndex: 'notes',
        className: style.notes,
    },
    {
        key: 'actions',
        title: '',
        align: 'center',
        dataIndex: 'actions',
        render: (text, record, index) => (
            <Button className="table-icon-btn" type="link" shape="circle">
                <i className="las la-chevron-circle-right" title="Read more" />
            </Button>
        ),
    },
];

const SessionsCard = ({ therapySessions, patientId }) => {
    const handleAdd = e => {};
    return (
        <Card
            title="SESSIONS"
            extra={
                <Button
                    onClick={handleAdd}
                    type="primary"
                    style={{ marginBottom: 16 }}
                    icon={<i className="las la-plus icon"></i>}
                >
                    Add session
                </Button>
            }
        >
            <Table
                rowKey={record => record._id}
                columns={columns}
                dataSource={therapySessions}
            ></Table>
        </Card>
    );
};

const mapStateToProps = (state, props) => ({
    therapySessions: selectClientTherapySessions(state, props.patientId),
});

export default connect(mapStateToProps, null)(SessionsCard);
