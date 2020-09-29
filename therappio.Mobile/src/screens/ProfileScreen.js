import React from 'react';
import {
  Accordion,
  Card,
  Container,
  Header,
  Right,
  Button,
  Icon,
  View,
  Content,
  Text,
  Thumbnail,
} from 'native-base';
import { PieChart } from 'react-native-chart-kit';
import Options from '../components/Options';
import styles from '../theme/styles';

const renderEntryHeader = item => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#d3d3d3',
      }}
    >
      <Text
        style={{
          fontFamily: 'Raleway-Light',
          fontSize: 17,
          marginVertical: 10,
        }}
      >
        {item.date}
      </Text>
      <View
        style={{
          borderColor: '#438edb',
          borderRadius: 15,
          borderWidth: 1,
          justifyContent: 'center',
          paddingHorizontal: 10,
          paddingVertical: 5,
        }}
      >
        <Text style={{ color: '#438edb' }}>{item.tag}</Text>
      </View>
    </View>
  );
};

const renderEntryContent = item => {
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: '#d3d3d3',
        padding: 10,
      }}
    >
      <Text>{item.content}</Text>
    </View>
  );
};

export default function ProfileScreen() {
  const chartData = [
    {
      name: `High energy, unpleasant`,
      value: 30,
      color: '#f44336',
      legendFontColor: '#222',
      legendFontSize: 14,
    },
    {
      name: 'High energy, pleasant',
      value: 35,
      color: '#ffeb3b',
      legendFontColor: '#222',
      legendFontSize: 14,
    },
    {
      name: 'Low energy, unpleasant',
      value: 20,
      color: '#42a5f5',
      legendFontColor: '#222',
      legendFontSize: 14,
    },
    {
      name: 'Low energy, pleasant',
      value: 15,
      color: '#66bb6a',
      legendFontColor: '#222',
      legendFontSize: 14,
    },
  ];

  const journalEntries = [
    {
      date: 'November 20th, 8:54',
      tag: 'Diary',
      content: `Last night, I slept pretty well. I don't remember my dreams, but I do remember getting up around 12 and 4 because Eloise was up.
      When I went into her room at 4, she was very chatty and I was worried she was going to be up for the day. Fortunately after I left the room,
      she popped her pacifier back in and was asleep.`,
    },
    {
      date: 'November 19th, 21:17',
      tag: 'Gratitude Journal',
      content: '',
    },
    {
      date: 'November 16th, 11:31',
      tag: 'Diary',
      content: '',
    },
  ];

  return (
    <Container>
      <Header>
        <Right>
          <Button transparent>
            <Icon
              name='settings'
              type='MaterialCommunityIcons'
              style={{
                fontSize: 29,
                marginTop: 21,
              }}
            />
          </Button>
        </Right>
      </Header>
      <View style={styles.profileContainer}>
        <Thumbnail
          style={{ height: 140, width: 140, borderRadius: 70, marginRight: 15 }}
          source={{ uri: 'https://i.pravatar.cc/500' }}
        ></Thumbnail>
        <View>
          <Text
            style={{
              fontSize: 22,
              fontFamily: 'Raleway-SemiBold',
              color: '#fff',
            }}
          >
            Sharon Robbins
          </Text>
          <Text style={{ color: '#fff' }}>srobbins@yahoo.com</Text>
          <Button
            rounded
            light
            bordered
            small
            style={{ marginTop: 10, width: 105, textAlign: 'center' }}
          >
            <Text uppercase={false}>Edit profile</Text>
          </Button>
        </View>
      </View>
      <Content contentContainerStyle={styles.profileEntriesContainer}>
        <View>
          <Text style={[styles.primaryTitle, { fontFamily: 'Raleway-Regular' }]}>Mood Stats</Text>
          <Card style={styles.card}>
            <View>
              <Options
                options={['Month View', 'Week View']}
                color='#438edb'
                onChange={() => console.log('A DUPA Z TYM')}
              ></Options>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <PieChart
                data={chartData}
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
          <View>
            <Text style={[styles.primaryTitle, { fontFamily: 'Raleway-Regular' }]}>
              Journal Entries
            </Text>
            <View>
              {/* {journalEntries.map((entry, index) => (
                 <Card
                  style={[
                    styles.card,
                    { flexDirection: "row", justifyContent: "space-between" }
                  ]}
                  key={index}
                > */}
              <Accordion
                dataArray={journalEntries}
                animation={true}
                expanded={true}
                renderHeader={renderEntryHeader}
                renderContent={renderEntryContent}
                style={{ borderRadius: 8 }}
              />
              {/* <Text
                    style={{
                      fontFamily: "Raleway-Light",
                      fontSize: 17,
                      marginVertical: 10
                    }}
                  >
                    {entry.date}
                  </Text>
                  <View
                    style={{
                      borderColor: "#438edb",
                      borderRadius: 15,
                      borderWidth: 1,
                      justifyContent: "center",
                      paddingHorizontal: 10,
                      paddingVertical: 5
                    }}
                  >
                    <Text style={{ color: "#438edb" }}>{entry.tag}</Text>
                  </View>
              </Card>
              ))} */}
            </View>
          </View>
        </View>
      </Content>
    </Container>
  );
}

ProfileScreen.navigationOptions = {
  headerShown: false,
};
