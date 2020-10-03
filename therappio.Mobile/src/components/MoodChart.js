import React, { useEffect } from 'react';
import { PieChart } from 'react-native-chart-kit';
import { Card, View, Text } from 'native-base';
import styles from '../theme/styles';
import Options from './Options';
import { selectLastWeekMoodRecords, selectLastMonthMoodRecords } from '../_selectors';
import { moodchartKeys } from '../_constants';

const MoodChart = ({ lastWeekRecords, lastMonthRecords }) => {
  const [currentView, setCurrentView] = useState('7 days');
  const [lastWeekMoodChartData, setLastWeekMoodChartData] = useState([]);
  const [lastMonthMoodChartData, setLastMonthMoodChartData] = useState([]);

  useEffect(() => {
    if (lastWeekRecords && lastWeekRecords.length) {
      const newLastWeekData = moodchartKeys
        .map(item => ({
          name: moodchartKeys[item.quadrant],
          value: lastWeekRecords.filter(record => record.mood.quadrant === item.quadrant).length,
          color: moodchartKeys[item.quadrant],
          legendFontColor: '#222',
          legendFontSize: 14,
        }))
        .filter(item => item.value !== 0);
      setLastWeekMoodChartData(newLastWeekData);
    }
    if (lastMonthRecords && lastMonthRecords.length) {
      const newLastMonthData = moodchartKeys
        .map(item => ({
          name: item.quadrant,
          value: lastMonthRecords.filter(record => record.mood.quadrant === item.quadrant).length,
          color: moodchartKeys[quadrant],
          legendFontColor: '#222',
          legendFontSize: 14,
        }))
        .filter(item => item.value !== 0);
      setLastMonthMoodChartData(newLastMonthData);
    }
  }, [lastWeekRecords, lastMonthRecords]);

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
            {chartData.map((data, index) => (
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
                <Text>{`${data.value}% ${data.name}`}</Text>
              </View>
            ))}
          </View>
        </View>
      </Card>
    </View>
  );
};

const mapStateToProps = (state, props) => ({
  lastWeekRecords: selectLastWeekMoodRecords(state, props.patientId),
  lastMonthRecords: selectLastMonthMoodRecords(state, props.patientId),
});

export default connect(mapStateToProps)(MoodChart);
