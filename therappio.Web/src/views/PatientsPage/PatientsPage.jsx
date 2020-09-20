import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import dayjs from 'dayjs';
import { Table, Button } from 'antd';
import { selectClients } from '../../_selectors';
import { PatientFormModal } from '../../components';
import style from './PatientsPage.module.scss';

const PatientsPage = ({ patients }) => {
    const [isFormVisible, setIsFormVisible] = useState(false);

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
                <div className="buttons-group">
                    <NavLink to={`/clients/${record._id}`}>
                        <Button
                            className="table-icon-btn"
                            type="link"
                            shape="circle"
                            icon={
                                <i
                                    className={`la la-arrow-circle-right icon`}
                                />
                            }
                        ></Button>
                    </NavLink>
                </div>
            ),
        },
    ];

    return (
        <div>
            <Button
                type="primary"
                onClick={() => setIsFormVisible(true)}
                icon={<i className={`las la-plus icon`} />}
            >
                Add
            </Button>
            <Table
                dataSource={patients}
                columns={columns}
                rowKey={record => record._id}
                className={style.patientsTable}
            ></Table>
            {isFormVisible && (
                <PatientFormModal setVisible={setIsFormVisible} />
            )}
        </div>
    );
};

const mapStateToProps = state => ({
    patients: selectClients(state),
});

export default connect(mapStateToProps)(PatientsPage);
