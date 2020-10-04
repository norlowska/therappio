import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Tabs, Tab, TabHeading, Text, ScrollableTab } from 'native-base';
import { AssessmentsTab, JournalingTab, AssignmentsTab, ResourcesTab } from './index';
import styles from '../theme/styles';
import ModalSetup from '../components/ModalSetup';
import { assignmentActions } from '../_actions';
import { selectAssignments } from '../_selectors';

function ActivitiesListsScreen({ fetchAssignments, assignments }) {
  useEffect(() => {
    if (!assignments.length) fetchAssignments();
  }, []);

  return (
    <Container>
      <Tabs
        tabContainerStyle={[styles.screenPadding, { backgroundColor: '#438edb' }]}
        renderTabBar={() => <ScrollableTab />}
        initialPage={1}
      >
        <Tab heading={'Journaling'}>
          <JournalingTab />
        </Tab>
        <Tab heading={'Assignments'}>
          <AssignmentsTab />
        </Tab>
        <Tab heading={'Resources'}>
          <ResourcesTab />
        </Tab>
        <Tab heading={'Assesssments'}>
          <AssessmentsTab />
        </Tab>
      </Tabs>
      <ModalSetup />
    </Container>
  );
}

ActivitiesListsScreen.navigationOptions = {
  headerShown: false,
};

const mapStateToProps = (state, props) => ({
  assignments: selectAssignments(state),
});

const mapDispatchToProps = {
  fetchAssignments: assignmentActions.fetchAssignments,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesListsScreen);
