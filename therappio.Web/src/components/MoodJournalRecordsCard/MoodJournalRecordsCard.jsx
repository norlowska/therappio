import React, { useState } from 'react';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import { Card, Table, Button } from 'antd';
import {
    selectPatientJournalRecords,
    selectPatientMoodRecords,
} from '../../_selectors';
import { moodchartKeys } from '../../_constants';
import MoodChart from './MoodChart';
import style from './MoodJournalRecordsCard.module.scss';

const moodColumns = [
    {
        key: 'date',
        title: 'Date',
        align: 'center',
        dataIndex: 'createdAt',
        render: (text, record, index) => (
            <>{format(new Date(record.createdAt), 'd MMM yyyy  HH:mm')}</>
        ),
        defaultSortOrder: 'descend',
    },
    {
        key: 'mood_name',
        title: 'Name',
        align: 'center',
        dataIndex: 'name',
        render: (text, record, index) => {
            return (
                <span
                    style={{
                        color: moodchartKeys[record.mood.quadrant - 1].color,
                    }}
                >
                    {record.mood.name}
                </span>
            );
        },
    },
];

const journalColumns = [
    {
        key: 'date',
        title: 'Date',
        align: 'center',
        dataIndex: 'createdAt',
        render: (text, record, index) => (
            <>{format(new Date(record.createdAt), 'd MMM yyyy  HH:mm')}</>
        ),
        defaultSortOrder: 'descend',
    },
    {
        key: 'type',
        title: 'Type',
        align: 'center',
        dataIndex: 'type',
    },
];

const tabList = [
    {
        key: 'mood',
        tab: 'Mood Records',
    },
    {
        key: 'journal',
        tab: 'Journal Records',
    },
];

const MoodJournalRecordsCard = ({
    moodRecords,
    journalRecords,
    patientId,
    inProgress,
}) => {
    const [activeKey, setActiveKey] = useState('mood');

    const contentList = {
        mood: (
            <>
                <MoodChart patientId={patientId} />
                <Table
                    rowKey={record => record._id}
                    columns={moodColumns}
                    dataSource={moodRecords}
                />
            </>
        ),
        journal: (
            <Table
                rowKey={record => record._id}
                columns={journalColumns}
                dataSource={journalRecords}
                expandable={{
                    expandedRowRender: record => (
                        <p style={{ margin: 0 }}>{record.content}</p>
                    ),
                    expandRowByClick: true,
                }}
            />
        ),
    };

    return (
        <>
            <Card
                className={style.card}
                tabList={tabList}
                activeTabKey={activeKey}
                onTabChange={key => setActiveKey(key)}
            >
                {inProgress ? (
                    contentList[activeKey]
                ) : (
                    <i>Therapy has not started yet.</i>
                )}
            </Card>
        </>
    );
};

const mapStateToProps = (state, props) => ({
    journalRecords: selectPatientJournalRecords(state, props.patientId),
    moodRecords: selectPatientMoodRecords(state, props.patientId),
});

export default connect(mapStateToProps)(MoodJournalRecordsCard);
