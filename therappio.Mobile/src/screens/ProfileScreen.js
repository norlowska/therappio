import React, { useEffect } from 'react';
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
  Spinner,
} from 'native-base';

import styles from '../theme/styles';
import { connect } from 'react-redux';
import { journalRecordActions, modalActions, moodRecordActions, userActions } from '../_actions';
import Colors from '../theme/Colors';
import ModalSetup from '../components/ModalSetup';
import { modalConstants } from '../_constants';

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

function ProfileScreen({
  isFetching,
  fetchJournalRecords,
  fetchMoodRecords,
  getUserDetails,
  user,
  moodRecords,
  journalRecords,
  showModal,
  logout,
}) {
  useEffect(() => {
    console.log('use effect', user);
    if (!user || Object.keys(user).length === 0) getUserDetails();
  }, []);

  useEffect(() => {
    console.log('user in profile screen', user);
  }, [user]);

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
          <Button transparent onPress={() => logout()}>
            <Icon
              name='logout'
              type='MaterialCommunityIcons'
              style={{
                fontSize: 29,
                marginTop: 21,
              }}
            />
          </Button>
        </Right>
      </Header>
      {isFetching ? (
        <Spinner color={Colors.primaryColor} />
      ) : (
        <>
          <View style={styles.profileContainer}>
            <View>
              <Text
                style={{
                  fontSize: 22,
                  fontFamily: 'Raleway-SemiBold',
                  color: '#fff',
                  marginBottom: 5,
                }}
              >
                {user ? `Hello, ${user.fullName}` : 'Hello!'}
              </Text>
              <Text style={{ color: '#fff' }}>srobbins@yahoo.com</Text>
              <Button
                rounded
                light
                bordered
                small
                style={{ marginTop: 10, width: 105, textAlign: 'center' }}
                onPress={() => showModal(modalConstants.EDIT_PROFILE_MODAL, null, 'Edit profile')}
              >
                <Text uppercase={false}>Edit profile</Text>
              </Button>
            </View>
          </View>
          <Content contentContainerStyle={styles.profileEntriesContainer}>
            <View>
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
        </>
      )}
      <ModalSetup />
    </Container>
  );
}

ProfileScreen.navigationOptions = {
  headerShown: false,
};

const mapStateToProps = (state, props) => ({
  isFetching:
    state.moodRecords.isFetching || state.journalRecords.isFetching || state.auth.isFetching,
  user: state.auth.user,
});

const mapDispatchToProps = {
  fetchJournalRecords: journalRecordActions.fetchJournalRecords,
  fetchMoodRecords: moodRecordActions.fetchMoodRecords,
  getUserDetails: userActions.getDetails,
  logout: userActions.logout,
  showModal: modalActions.showModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
