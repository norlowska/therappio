import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { format, isSameYear } from 'date-fns';
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
import { journalRecordActions, modalActions, moodRecordActions, userActions } from '../_actions';
import { modalConstants } from '../_constants';
import { selectJournalRecords, selectMoodRecords } from '../_selectors';
import { compareValues } from '../_utilities/compare';
import ModalSetup from '../components/ModalSetup';
import styles from '../theme/styles';
import Colors from '../theme/Colors';
import MoodChart from '../components/MoodChart';

function ProfileScreen({
  isFetching,
  getUserDetails,
  user,
  moodRecords,
  journalRecords,
  deleteJournalRecord,
  showModal,
  logout,
}) {
  const [journalEntries, setJournalEntries] = useState([]);

  useEffect(() => {
    if (!user || Object.keys(user).length === 0) getUserDetails();
  }, []);

  useEffect(() => {
    if (journalRecords.length > 0) {
      const newJournalEntries = journalRecords
        .map(item => {
          const createdAt = new Date(item.createdAt);
          const dateFormat = isSameYear(new Date(), createdAt)
            ? 'MMMM do, H:mm'
            : 'MMMM do, YYYY, H:mm';

          return {
            id: item._id,
            date: format(createdAt, dateFormat),
            tag: item.type === 'diary' ? 'Diary' : 'Gratitude Journal',
            content: item.content,
            createdAt: item.createdAt,
          };
        })
        .sort(compareValues('createdAt', 'desc'));
      setJournalEntries(newJournalEntries);
    }
  }, [journalRecords]);

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
        <Icon name='md-arrow-dropdown' style={{ color: '#777' }} />
      </View>
    );
  };

  const renderEntryContent = item => {
    const selectedModal =
      item.tag === 'Diary' ? modalConstants.DIARY_MODAL : modalConstants.GRATITUDE_JOURNAL_MODAL;
    return (
      <>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#d3d3d3',
            padding: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => showModal(selectedModal, { editMode: true, journalRecord: item })}
          >
            <Text>{item.content}</Text>
          </TouchableOpacity>
          <Button
            bordered
            danger
            style={{ marginTop: 10, width: 'auto', alignSelf: 'flex-end' }}
            onPress={() => deleteJournalRecord(item.id)}
          >
            <Icon name='md-trash' style={{ color: 'red' }} />
          </Button>
        </View>
      </>
    );
  };

  return (
    <Container>
      <Header>
        <Right>
          <Button transparent onPress={() => logout()}>
            <Icon
              name='logout'
              type='MaterialCommunityIcons'
              style={{
                fontSize: 25,
                marginTop: 15,
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
              <Text style={{ color: '#fff' }}>{user && user.email}</Text>
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
              <MoodChart />
              <View>
                <Text style={[styles.primaryTitle, { fontFamily: 'Raleway-Regular' }]}>
                  Journal Entries
                </Text>
                {journalEntries.length ? (
                  <View>
                    <Accordion
                      dataArray={journalEntries}
                      animation={true}
                      expanded={true}
                      renderHeader={renderEntryHeader}
                      renderContent={renderEntryContent}
                      style={{ borderRadius: 8 }}
                    />
                  </View>
                ) : (
                  <Text>You have not added any journal entry yet</Text>
                )}
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
  journalRecords: selectJournalRecords(state),
  moodRecords: selectMoodRecords(state),
});

const mapDispatchToProps = {
  fetchJournalRecords: journalRecordActions.fetchJournalRecords,
  fetchMoodRecords: moodRecordActions.fetchMoodRecords,
  getUserDetails: userActions.getDetails,
  logout: userActions.logout,
  showModal: modalActions.showModal,
  deleteJournalRecord: journalRecordActions.deleteJournalRecord,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
