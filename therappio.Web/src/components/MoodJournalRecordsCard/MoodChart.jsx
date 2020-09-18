import React, { useState } from 'react';
import { connect } from 'react-redux';
import { PieChart, Pie, Cell, Label } from 'recharts';
import { Button } from 'antd';
import {
    selectLastWeekMoodRecords,
    selectLastMonthMoodRecords,
} from '../../_selectors';
import { moodchartKeys } from '../../_constants';
import style from './MoodJournalRecordsCard.module.scss';

const MoodChart = ({ lastWeekRecords, lastMonthRecords }) => {
    const [currentView, setCurrentView] = useState('7 days');

    const lastWeekMoodChartData = lastWeekRecords.map(item => ({
        name: item.mood.name,
        value: item.mood.quadrant,
    }));
    const lastMonthMoodChartData = lastMonthRecords.map(item => ({
        name: item.mood.name,
        value: item.mood.quadrant,
    }));

    return (
        <div className="center-horizontal">
            <div className="buttons-group">
                {/*className={styles.selectPeriod}*/}
                <Button
                    onClick={() => setCurrentView('7 days')}
                    type={currentView === '7 days' ? 'primary' : 'default'}
                >
                    Last 7 days
                </Button>
                <Button
                    onClick={() => setCurrentView('30 days')}
                    type={currentView === '30 days' ? 'primary' : 'default'}
                >
                    Last 30 days
                </Button>
            </div>
            <PieChart width={410} height={240}>
                <Pie
                    data={
                        currentView === '7 days'
                            ? lastWeekMoodChartData
                            : lastMonthMoodChartData
                    }
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label={({ percent, ...rest }) => `${percent * 100}%`}
                >
                    {moodchartKeys.map((entry, index) => (
                        <Cell key={`cell${index}`} fill={entry.color} />
                    ))}
                </Pie>
            </PieChart>
            <div>
                {moodchartKeys.map((entry, index) => (
                    <div key={index}>
                        <div
                            style={{
                                height: '11px',
                                width: '11px',
                                borderRadius: '50%',
                                backgroundColor: entry.color,
                                display: 'inline-block',
                                marginRight: '7px',
                            }}
                        />
                        <span
                            style={{
                                color: entry.color,
                                fontSize: 13,
                                textTransform: 'lowercase',
                                fontWeight: 500,
                                marginBottom: '2px',
                            }}
                        >
                            {entry.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const mapStateToProps = (state, props) => ({
    lastWeekRecords: selectLastWeekMoodRecords(state, props.patientId),
    lastMonthRecords: selectLastMonthMoodRecords(state, props.patientId),
});

export default connect(mapStateToProps)(MoodChart);
