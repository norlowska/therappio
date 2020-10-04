import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { Card, View, Text, Badge } from 'native-base';
import { format, isBefore, isAfter } from 'date-fns';
import { selectAssignments } from '../../_selectors';
import { modalConstants } from '../../_constants';
import styles from '../../theme/styles';
import { modalActions } from '../../_actions';
import { compareValues } from '../../_utilities/compare';

const AssignmentCard = ({ assignment, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card pointerEvents='none' style={styles.card}>
        <View>
          <Text style={styles.primaryTitle}>{assignment.title}</Text>
          <Text>Due date: {format(new Date(assignment.dueDate), 'MMMM do, h:mm')}</Text>
          <Badge
            primary={
              assignment.status === 'Not submitted' &&
              isBefore(new Date(), new Date(assignment.dueDate))
            }
            danger={
              assignment.status === 'Late' || isAfter(new Date(), new Date(assignment.dueDate))
            }
            success={assignment.status === 'On time'}
            style={{ marginTop: 10 }}
          >
            <Text style={{ fontSize: 13, fontWeight: '600' }}>{assignment.status}</Text>
          </Badge>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const AssignmentsTab = ({ assignments, showModal }) => {
  return (
    <View style={{ paddingHorizontal: 10, marginVertical: 10 }}>
      {assignments
        .map(item => (
          <AssignmentCard
            key={item._id}
            assignment={item}
            onPress={() =>
              showModal(modalConstants.ASSIGNMENT_MODAL, { assignment: item }, item.title || '')
            }
          />
        ))
        .sort(compareValues('createdAt', 'desc'))}
    </View>
  );
};

const mapStateToProps = (state, props) => ({
  assignments: selectAssignments(state),
});

const mapDispatchToProps = {
  showModal: modalActions.showModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentsTab);
