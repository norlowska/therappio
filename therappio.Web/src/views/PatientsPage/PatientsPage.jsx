import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { format } from 'date-fns';
import { Table, Button, Input } from 'antd';
import { selectClients } from '../../_selectors';
import { PatientFormModal } from '../../components';
import { clientActions } from '../../_actions';
import style from './PatientsPage.module.scss';

const PatientsPage = ({ patients, fetchPatients, loading }) => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [filterredPatients, setFilterredPatients] = useState([]);

    useEffect(() => {
        if (patients && patients.length) setFilterredPatients(patients);
    }, [patients]);

    const columns = [
        {
            key: 'name',
            title: 'Name',
            align: 'center',
            dataIndex: 'fullName',
            sorter: (a, b) => {
                if (a.lastName < b.lastName) {
                    return -1;
                }
                if (a.lastName > b.lastName) {
                    return 1;
                }
                return 0;
            },
            sortDirections: ['ascend', 'descend'],
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
            render: (text, record, index) => {
                return (
                    <>
                        {record.dateOfBirth &&
                            format(new Date(record.dateOfBirth), 'd MMM yyyy')}
                    </>
                );
            },
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
    const handleInput = e => {
        const newFilterredPatients = patients.filter(
            item =>
                item.fullName.includes(e.target.value) ||
                item._id.includes(e.target.value)
        );
        setFilterredPatients(newFilterredPatients);
    };

    return (
        <div>
            <div className={style.patientsListContainer}>
                <Input
                    placeholder="Type name or ID"
                    onInput={handleInput}
                    prefix={<i className="la la-search"></i>}
                    className={style.searchInput}
                />
                <div className="buttons-group">
                    <Button
                        type="primary"
                        onClick={() => setIsFormVisible(true)}
                        icon={<i className={`las la-plus icon`} />}
                    >
                        Add
                    </Button>
                    <Button
                        shape="circle"
                        icon={<i className="las la-sync-alt"></i>}
                        title="Refresh"
                        onClick={fetchPatients}
                    />
                </div>
            </div>
            <Table
                dataSource={filterredPatients}
                columns={columns}
                rowKey={record => record._id}
                className={style.patientsTable}
                loading={loading}
            ></Table>
            {isFormVisible && (
                <PatientFormModal setVisible={setIsFormVisible} />
            )}
        </div>
    );
};

const mapStateToProps = state => ({
    patients: selectClients(state),
    loading: state.clients.isFetching,
});

const mapDispatchToProps = {
    fetchPatients: clientActions.fetchClients,
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientsPage);
