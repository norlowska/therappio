import React from 'react';
import { Card, Container, Content, Text, View } from 'native-base';
import ActivityCard from '../activities/ActivityCard';
import styles from '../theme/styles';
import * as articles from '../activities/readings/articles';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import ModalSetup from '../components/ModalSetup';
import { selectLastNotSubmittedAssignment } from '../_selectors';
import { modalActions } from '../_actions';
import { modalConstants } from '../_constants';

function HomeScreen({ lastAssignment, hideModal, showModal }) {
  console.log('home screen');
  return (
    <Container>
      <View style={styles.welcomeContainer}>
        <Text H1 style={styles.welcomeText}>
          Hello!
        </Text>
        {lastAssignment && Object.keys(lastAssignment) > 0 && (
          <View>
            <Text style={styles.paragraph}>You have assignment to do:</Text>
            <Card style={styles.card}>
              <Text style={styles.primaryTitle}>{lastAssignment.title}</Text>
              <Text>Due date: {format(new Date(assignment.dueDate), 'MMMM do, h:mm')}</Text>
            </Card>
          </View>
        )}
      </View>
      <Content contentContainerStyle={styles.container}>
        <Text style={styles.title}>Recommended activities</Text>
        <ActivityCard
          content={{
            title: 'Gratitude Journal',
            description: 'Focus on the positive and list 3 things you are grateful for',
          }}
          modal={modalConstants.GRATITUDE_JOURNAL_MODAL}
        />
        <ActivityCard content={articles.allOrNothing} modal={modalConstants.MARKDOWN_MODAL} />
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
});

const mapDispatchToProps = {
  hideModal: modalActions.hideModal,
  showModal: modalActions.showModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
