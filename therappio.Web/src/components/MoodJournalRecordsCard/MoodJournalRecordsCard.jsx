import React, { useState } from 'react';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import { Card, Table, Button } from 'antd';
import {
    selectClientJournalRecords,
    selectClientMoodRecords,
} from '../../_selectors';
import style from './MoodJournalRecordsCard.module.scss';

const moodchartKeys = [
    { color: '#f44336', name: 'High energy, unpleasant' },
    { color: '#F7C602', name: 'High energy, pleasant' },
    { color: '#42a5f5', name: 'Low energy, unpleasant' },
    { color: '#66bb6a', name: 'Low energy, pleasant' },
];

const moodColumns = [
    {
        key: 'date',
        title: 'Date',
        align: 'center',
        dataIndex: 'createdAt',
        render: (text, record, index) => (
            <>{dayjs(record.createdAt).format('D MMM YYYY  HH:mm')}</>
        ),
    },
    {
        key: 'mood_name',
        title: 'Name',
        align: 'center',
        dataIndex: 'name',
        render: (text, record, index) => (
            <span
                style={{
                    color: moodchartKeys[record.mood.quadrant - 1].color,
                }}
            >
                {record.mood.name}
            </span>
        ),
    },
];

const journalColumns = [
    {
        key: 'date',
        title: 'Date',
        align: 'center',
        dataIndex: 'createdAt',
        render: (text, record, index) => (
            <>{dayjs(record.createdAt).format('D MMM YYYY  HH:mm')}</>
        ),
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

const MoodJournalRecordsCard = ({ moodRecords, journalRecords }) => {
    const [activeKey, setActiveKey] = useState('mood');

    const contentList = {
        mood: (
            <Table
                rowKey={record => record._id}
                columns={moodColumns}
                dataSource={moodRecords}
            />
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
                tabList={tabList}
                activeTabKey={activeKey}
                // tabBarExtraContent={<a href="#">More</a>}
                onTabChange={key => setActiveKey(key)}
            >
                {contentList[activeKey]}
            </Card>
        </>
    );
};

const mapStateToProps = (state, props) => ({
    journalRecords: selectClientJournalRecords(state, props.patientId),
    moodRecords: selectClientMoodRecords(state, props.patientId),
});

export default connect(mapStateToProps)(MoodJournalRecordsCard);
