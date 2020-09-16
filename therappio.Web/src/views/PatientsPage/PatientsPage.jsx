import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import dayjs from 'dayjs';
import { Table, Button } from 'antd';
import { selectClients } from '../../_selectors';
import style from './PatientsPage.module.scss';

const columns = [
    {
        key: 'name',
        title: 'Name',
        align: 'center',
        dataIndex: ['firstName', 'lastName'],
        render: (text, record, index) => (
            <>
                {record.firstName} {record.lastName}
            </>
        ),
    },
    {
        key: '_id',
        title: 'Patient ID',
        align: 'center',
        dataIndex: '_id',
    },
    {
        ket: 'dob',
        title: 'DOB',
        align: 'center',
        dataIndex: 'dateOfBirth',
        render: (text, record, index) => (
            <>{dayjs(record.dateOfBirth).format('D MMM YYYY')}</>
        ),
    },
    // {
    //     key: 'age',
    //     title: 'Age',
    //     align: 'center',
    //     dataIndex: 'dateOfBirth',
    //     render: (text, record, index) => (
    //         <>{dayjs().diff(record.dateOfBirth, 'y')} yrs</>
    //     ),
    // },
    {
        key: 'gender',
        title: 'Gender',
        align: 'center',
        dataIndex: 'gender',
    },
    {
        key: 'action',
        title: '',
        align: 'center',
        dataIndex: '_id',
        render: (text, record, index) => (
            <NavLink to={`/clients/${record._id}`}>
                <Button
                    className="table-icon-btn"
                    type="link"
                    shape="circle"
                    icon={<i className={`la la-arrow-circle-right`} />}
                ></Button>
            </NavLink>
        ),
    },
];

const PatientsPage = ({ patients }) => {
    return (
        <div>
            <Table
                dataSource={patients}
                columns={columns}
                rowKey={record => record._id}
                className={style.patientsTable}
            ></Table>
        </div>
    );
};

const mapStateToProps = state => ({
    patients: selectClients(state),
});

export default connect(mapStateToProps)(PatientsPage);
