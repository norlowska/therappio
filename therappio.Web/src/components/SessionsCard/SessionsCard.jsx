import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import { Card, Table, Button } from 'antd';
import { selectClientTherapySessions } from '../../_selectors';
import { therapySessionActions } from '../../_actions';
import { SessionFormModal } from '../index';
import style from './SessionsCard.module.scss';

const SessionsCard = ({
    therapySessions,
    patientId,
    deleteSession,
    therapyEnded,
}) => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editedSession, setEditedSession] = useState(null);

    const handleSessionClick = (e, session) => {
        setEditedSession(session);
        setIsFormVisible(true);
    };

    const handleDeleteSession = (e, id) => deleteSession(id);
    const columns = React.useMemo(
        () => [
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
                    <>{format(new Date(record.date), 'd MMM yyyy  HH:mm')}</>
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
                    <>
                        <Button
                            className="table-icon-btn"
                            type="link"
                            shape="circle"
                            onClick={e => handleSessionClick(e, record)}
                        >
                            <i
                                className="las la-chevron-circle-right icon"
                                title="Read more"
                            />
                        </Button>
                        {!therapyEnded && (
                            <Button
                                className="table-icon-btn"
                                type="link"
                                shape="circle"
                                onClick={e =>
                                    handleDeleteSession(e, record._id)
                                }
                                icon={
                                    <i
                                        className="las la-trash icon"
                                        title="Delete session"
                                    />
                                }
                            />
                        )}
                    </>
                ),
            },
        ],
        []
    );

    return (
        <>
            <Card
                title="SESSIONS"
                extra={
                    !therapyEnded && (
                        <Button
                            onClick={e => setIsFormVisible(true)}
                            type="primary"
                            style={{ marginBottom: 16 }}
                            icon={<i className="las la-plus icon"></i>}
                        >
                            Add session
                        </Button>
                    )
                }
            >
                <Table
                    rowKey={record => record._id}
                    columns={columns}
                    dataSource={therapySessions}
                ></Table>
            </Card>
            {isFormVisible && (
                <SessionFormModal
                    sessionNo={
                        therapySessions &&
                        therapySessions.length &&
                        !editedSession
                            ? therapySessions[0].session_no + 1
                            : 1
                    }
                    session={editedSession}
                    patient={patientId}
                    setVisible={setIsFormVisible}
                />
            )}
        </>
    );
};

const mapStateToProps = (state, props) => ({
    therapySessions: selectClientTherapySessions(state, props.patientId),
});

const mapDispatchToProps = {
    deleteSession: therapySessionActions.deleteTherapySession,
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionsCard);
