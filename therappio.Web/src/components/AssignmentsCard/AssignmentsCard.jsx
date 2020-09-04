import React from 'react';
import dayjs from 'dayjs';
import { Card, Table, Button } from 'antd';
import style from './AssignmentsCard.module.scss';
import { NavLink } from 'react-router-dom';

const columns = [
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
            if (record.status === 'On time' || record.status === 'Late') {
                return (
                    <Button
                        className="table-icon-btn"
                        type="link"
                        shape="circle"
                        // to={`/clients/${row.original.client.shortId}/assignment/${row.original.shortId}`}
                    >
                        <i
                            className="las la-chevron-circle-right"
                            title="Review"
                        />
                    </Button>
                );
            } else if (record.status === 'Not submitted') {
                return (
                    <>
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
                        <Button
                            className="table-icon-btn"
                            type="link"
                            shape="circle"
                            onClick={() => deleteAssignment(row.original._id)}
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
];

const AssignmentsCard = ({ assignments, patientId }) => {
    const handleAdd = e => {};
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

export default AssignmentsCard;
