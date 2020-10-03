import React, { useEffect } from 'react';
import { connect } from 'react-redux';
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
import ModalSetup from '../components/ModalSetup';
import Markdown from 'react-native-markdown-display';
import styles from '../theme/styles';
import Colors from '../theme/Colors';

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
      onPress={modalActions.showModal(
        item.tag === 'Diary' ? modalConstants.DIARY_MODAL : modalConstants.GRATITUDE_JOURNAL_MODAL,
        { editMode: true, content: item.content }
      )}
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
    if (!user || Object.keys(user).length === 0) getUserDetails();
  }, []);

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

  const journalEntries = journalRecords.map(item => {
    const createdAt = new Date(item.createdAt);
    const dateFormat = isSameYear(new Date(), createdAt) ? 'MMMM do, H:mm' : 'MMMM do, YYYY, H:mm';
    return {
      date: format(createdAt, dateFormat),
      tag: item.type === 'diary' ? 'Diary' : 'Gratitude Journal',
      content: item.content,
    };
  });

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
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
