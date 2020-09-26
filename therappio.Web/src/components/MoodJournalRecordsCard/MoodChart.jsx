import React, { useState, useEffect } from 'react';
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
    const [lastWeekMoodChartData, setLastWeekMoodChartData] = useState([]);
    const [lastMonthMoodChartData, setLastMonthMoodChartData] = useState([]);
    useEffect(() => {
        if (lastWeekRecords && lastWeekRecords.length) {
            const newLastWeekData = moodchartKeys
                .map(item => ({
                    name: item.quadrant,
                    value: lastWeekRecords.filter(
                        record => record.mood.quadrant === item.quadrant
                    ).length,
                }))
                .filter(item => item.value !== 0);
            setLastWeekMoodChartData(newLastWeekData);
        }
        if (lastMonthRecords && lastMonthRecords.length) {
            const newLastMonthData = moodchartKeys
                .map(item => ({
                    name: item.quadrant,
                    value: lastMonthRecords.filter(
                        record => record.mood.quadrant === item.quadrant
                    ).length,
                }))
                .filter(item => item.value !== 0);
            setLastMonthMoodChartData(newLastMonthData);
        }
    }, [lastWeekRecords, lastMonthRecords]);

    return (
        <div className="center-horizontal">
            <div className="buttons-group">
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
            {(currentView === '7 days' && lastWeekRecords.length) ||
            (currentView === '30 days' && lastMonthRecords.length) ? (
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
                        label={({ percent, ...rest }) =>
                            `${Math.round(percent * 100)}%`
                        }
                    >
                        {currentView === '7 days'
                            ? lastWeekMoodChartData.map((entry, index) => (
                                  <Cell
                                      key={`cell${entry.index}`}
                                      fill={moodchartKeys[entry.name - 1].color}
                                  />
                              ))
                            : lastMonthMoodChartData.map((entry, index) => (
                                  <Cell
                                      key={`cell${entry.index}`}
                                      fill={moodchartKeys[entry.name - 1].color}
                                  />
                              ))}
                    </Pie>
                </PieChart>
            ) : (
                <div style={{ margin: '12px 0' }}>
                    <i>No data provided in last {currentView}</i>
                </div>
            )}
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
