import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { PieChart } from 'react-native-chart-kit';
import { Card, View, Text, Button, Icon, Accordion } from 'native-base';
import { format, isSameYear } from 'date-fns';
import styles from '../theme/styles';
import Options from './Options';
import {
  selectMoodRecords,
  selectLastWeekMoodRecords,
  selectLastMonthMoodRecords,
} from '../_selectors';
import { moodchartKeys } from '../_constants';
import { moodRecordActions } from '../_actions';

const MoodChart = ({ moodRecords, lastWeekRecords, lastMonthRecords, deleteMood }) => {
  const [currentView, setCurrentView] = useState('Month View');
  const [lastWeekMoodChartData, setLastWeekMoodChartData] = useState([]);
  const [lastMonthMoodChartData, setLastMonthMoodChartData] = useState([]);

  useEffect(() => {
    if (lastWeekRecords && lastWeekRecords.length) {
      const newLastWeekData = moodchartKeys
        .map(item => ({
          name: item.quadrant,
          value: lastWeekRecords.filter(
            record =>
              record &&
              record.mood &&
              record.mood.quadrant &&
              record.mood.quadrant === item.quadrant
          ).length,
          color: item.color,
          legendFontColor: '#222',
          legendFontSize: 14,
        }))
        .filter(item => item.value !== 0);
      setLastWeekMoodChartData(newLastWeekData);
    }
  }, [lastWeekRecords]);

  useEffect(() => {
    if (lastMonthRecords && lastMonthRecords.length) {
      const newLastMonthData = moodchartKeys
        .map(item => ({
          name: item.quadrant,
          value: lastMonthRecords.filter(
            record =>
              record &&
              record.mood &&
              record.mood.quadrant &&
              record.mood.quadrant === item.quadrant
          ).length,
          color: item.color,
          legendFontColor: '#222',
          legendFontSize: 14,
        }))
        .filter(item => item.value !== 0);
      setLastMonthMoodChartData(newLastMonthData);
    }
  }, [lastMonthRecords]);

  const renderContent = content => {
    return content.content.map(item => {
      const createdAt = new Date(item.createdAt);
      const dateFormat = isSameYear(new Date(), createdAt)
        ? 'MMMM do, H:mm'
        : 'MMMM do, YYYY, H:mm';

      return (
        <View
          key={item._id}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
            marginHorizontal: 10,
          }}
        >
          <Text> {format(createdAt, dateFormat)}</Text>
          <View
            style={{
              backgroundColor: moodchartKeys[item.mood.quadrant - 1].color,
              borderColor: moodchartKeys[item.mood.quadrant - 1].color,
              borderRadius: 15,
              borderWidth: 1,
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 15,
                textShadowColor: '#888',
                textShadowOffset: { width: 2, height: 1 },
                textShadowRadius: 3,
              }}
            >
              {item.mood.name}
            </Text>
          </View>
          <Button
            bordered
            danger
            style={{ marginTop: 10, width: 'auto', alignSelf: 'flex-end' }}
            onPress={() => deleteMood(item._id)}
          >
            <Icon name='md-trash' style={{ color: 'red' }} />
          </Button>
        </View>
      );
    });
  };

  return (
    <View>
      <Text style={[styles.primaryTitle, { fontFamily: 'Raleway-Regular' }]}>Mood Stats</Text>
      <Card style={styles.card}>
        <View>
          <Options
            options={['Month View', 'Week View']}
            color='#438edb'
            onChange={view => setCurrentView(view)}
          ></Options>
        </View>
        {(currentView === 'Week View' && lastWeekMoodChartData.length > 0) ||
        (currentView === 'Month View' && lastMonthMoodChartData.length > 0) ? (
          <View style={{ flexDirection: 'row' }}>
            <PieChart
              data={currentView === 'Week View' ? lastWeekMoodChartData : lastMonthMoodChartData}
              chartConfig={{
                backgroundColor: '#e26a00',
                backgroundGradientFrom: '#fb8c00',
                backgroundGradientTo: '#ffa726',
                color: (opacity = 1) => `rgba(247,247,247, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(247, 247, 247, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#ffa726',
                },
              }}
              width={200}
              height={120}
              accessor='value'
              backgroundColor='transparent'
              paddingLeft='4'
              style={styles.piechart}
              hasLegend={false}
            ></PieChart>
            <View style={styles.chartLegend}>
              {moodchartKeys.map((data, index) => (
                <View style={styles.chartLegendElement} key={index}>
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: data.color,
                      marginRight: 10,
                    }}
                  ></View>
                  <Text>{data.name}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : (
          <Text style={{ marginTop: 15, fontStyle: 'italic', textAlign: 'center' }}>
            You have not provided any mood records in this time range
          </Text>
        )}
        <Accordion
          style={{ marginTop: 10 }}
          dataArray={[
            {
              title: 'Mood records',
              content: moodRecords,
            },
          ]}
          renderContent={renderContent}
        />
      </Card>
    </View>
  );
};

const mapStateToProps = (state, props) => ({
  moodRecords: selectMoodRecords(state),
  lastWeekRecords: selectLastWeekMoodRecords(state),
  lastMonthRecords: selectLastMonthMoodRecords(state),
});

const mapDispatchToProps = {
  deleteMood: moodRecordActions.deleteMoodRecord,
};

export default connect(mapStateToProps, mapDispatchToProps)(MoodChart);
