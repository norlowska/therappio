import React, { useEffect } from 'react';
import { Card, Container, Content, Text, View, Spinner } from 'native-base';
import ActivityCard from '../activities/ActivityCard';
import styles from '../theme/styles';
import * as articles from '../activities/readings/articles';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import ModalSetup from '../components/ModalSetup';
import { selectAssignments, selectLastNotSubmittedAssignment } from '../_selectors';
import { modalConstants } from '../_constants';
import { assignmentActions, modalActions } from '../_actions';
import { TouchableOpacity } from 'react-native-gesture-handler';

function HomeScreen({ lastAssignment, fetchAssignments, isFetching, assignments, showModal }) {
  useEffect(() => {
    if (!assignments || assignments.length === 0) fetchAssignments();
  }, []);

  return (
    <Container>
      <View style={styles.welcomeContainer}>
        <Text H1 style={styles.welcomeText}>
          Hello!
        </Text>
        {lastAssignment && lastAssignment.status === 'Not submitted' && (
          <TouchableOpacity
            onPress={() =>
              showModal(
                modalConstants.ASSIGNMENT_MODAL,
                { assignment: lastAssignment },
                lastAssignment.title
              )
            }
          >
            <View>
              <Text style={[styles.paragraph, { color: 'white' }]}>You have assignment to do:</Text>
              <Card style={styles.card}>
                <Text style={styles.primaryTitle}>{lastAssignment.title}</Text>
                <Text>Due date: {format(new Date(lastAssignment.dueDate), 'MMMM do, h:mm')}</Text>
              </Card>
            </View>
          </TouchableOpacity>
        )}
      </View>
      <Content contentContainerStyle={styles.container}>
        {isFetching ? (
          <Spinner />
        ) : (
          <>
            <Text style={styles.title}>Recommended activities</Text>
            <ActivityCard
              content={{
                title: 'Gratitude Journal',
                description: 'Focus on the positive and list 3 things you are grateful for',
              }}
              modal={modalConstants.GRATITUDE_JOURNAL_MODAL}
            />
            <ActivityCard content={articles.allOrNothing} modal={modalConstants.MARKDOWN_MODAL} />
          </>
        )}
      </Content>
      <ModalSetup />
    </Container>
  );
}

HomeScreen.navigationOptions = {
  headerShown: false,
};

const mapStateToProps = (state, props) => ({
  isAuthenticated: state.auth.isAuthenticated,
  lastAssignment: selectLastNotSubmittedAssignment(state),
  isFetching:
    state.auth.isFetching ||
    state.journalRecords.isFetching ||
    state.moodRecords.isFetching ||
    state.assignments.isFetching,
  assignments: selectAssignments(state),
});

const mapDispatchToProps = {
  showModal: modalActions.showModal,
  fetchAssignments: assignmentActions.fetchAssignments,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
