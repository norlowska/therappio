import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import { Card, Table, Button } from 'antd';
import { assignmentActions } from '../../_actions';
import { selectClientAssignments } from '../../_selectors';
import style from './AssignmentsCard.module.scss';

const AssignmentsCard = ({ assignments, patientId, deleteAssignment }) => {
    const columns = useMemo(
        () => [
            {
                key: 'title',
                title: 'Title',
                align: 'center',
                dataIndex: 'title',
            },
            {
                key: 'createdAt',
                title: 'Created at',
                align: 'center',
                dataIndex: 'createdAt',
                render: (text, record, index) => (
                    <>{dayjs(record.createdAt).format('D MMM YYYY  HH:mm')}</>
                ),
            },
            {
                key: 'dueDate',
                title: 'Due date',
                align: 'center',
                dataIndex: 'dueDate',
                render: (text, record, index) => (
                    <>{dayjs(record.dueDate).format('D MMM YYYY  HH:mm')}</>
                ),
            },
            {
                key: 'status',
                title: 'Status',
                align: 'center',
                dataIndex: 'status',
            },
            {
                key: 'actions',
                title: '',
                align: 'center',
                dataIndex: 'actions',
                render: (text, record, index) => {
                    if (
                        record.status === 'On time' ||
                        record.status === 'Late'
                    ) {
                        return (
                            <NavLink
                                to={`/clients/${patientId}/assignment/${record._id}`}
                            >
                                <Button
                                    className="table-icon-btn"
                                    type="link"
                                    shape="circle"
                                    icon={
                                        <i
                                            className="las la-chevron-circle-right"
                                            title="Review"
                                        />
                                    }
                                    // to={`/clients/${row.original.client.shortId}/assignment/${row.original.shortId}`}
                                />
                            </NavLink>
                        );
                    } else if (record.status === 'Not submitted') {
                        return (
                            <>
                                <NavLink
                                    to={`/clients/${patientId}/assignment/${record._id}/edit`}
                                >
                                    <Button
                                        // to={`/clients/${row.original.client.shortId}/assignment/${row.original.shortId}/edit`}
                                        className="table-icon-btn"
                                        type="link"
                                        shape="circle"
                                        icon={
                                            <i
                                                className="las la-pen icon"
                                                title="Edit assignment"
                                            />
                                        }
                                    />
                                </NavLink>
                                <Button
                                    className="table-icon-btn"
                                    type="link"
                                    shape="circle"
                                    onClick={() => deleteAssignment(record._id)}
                                    icon={
                                        <i
                                            className="las la-trash icon"
                                            title="Delete assignment"
                                        />
                                    }
                                />
                            </>
                        );
                    } else return null;
                },
            },
        ],
        []
    );

    const handleAdd = e => {};

    const handleDelete = (e, id) => {};

    return (
        <Card
            title="ASSIGNMENTS"
            extra={
                <NavLink to={`/clients/${patientId}/assignments/new`}>
                    <Button
                        onClick={handleAdd}
                        type="primary"
                        style={{ marginBottom: 16 }}
                        icon={<i className="las la-plus icon"></i>}
                    >
                        Add assignment
                    </Button>
                </NavLink>
            }
        >
            <Table
                rowKey={record => record._id}
                columns={columns}
                dataSource={assignments}
            ></Table>
        </Card>
    );
};

const mapStateToProps = (state, props) => ({
    assignments: selectClientAssignments(state, props.patientId),
});

const mapDispatchToProps = {
    deleteAssignment: assignmentActions.deleteAssignment,
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentsCard);
