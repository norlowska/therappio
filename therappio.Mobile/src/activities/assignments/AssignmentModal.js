import React, { useState, useEffect } from 'react';
import { Button, Form, Item, Text, View, Spinner } from 'native-base';
import { assignmentActions } from '../../_actions';
import ShortTextField from './ShortTextField';
import LongTextField from './LongTextField';
import SelectField from './SelectField';
import DatePicker from './DatePicker';
import DateTimePicker from './DateTimePicker';
import TimePicker from './TimePicker';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { isBefore } from 'date-fns';

const AssignmentModal = ({ assignment, updateAssignment, isFetching }) => {
  const [formData, setFormData] = useState(assignment);

  useEffect(() => {
    if (assignment) initForm(assignment.fields);
  }, [assignment]);

  const initForm = fields => {
    let _formData = {};

    fields.forEach((item, index) => {
      _formData[item._id] = item;
    });
    setFormData(_formData);
  };

  const getFormElement = element => {
    const { type, answer, options, question } = element;
    const props = {
      type,
      answer,
      options,
      question,
      name: element._id,
      key: element._id,
      onChange: handleInputChange,
    };

    switch (type) {
      case 'short':
        return <ShortTextField {...props} />;
      case 'long':
        return <LongTextField {...props} />;
      case 'select':
      case 'single-choice':
        return <SelectField {...props} />;
      case 'date':
        return <DatePicker {...props} />;
      case 'datetime':
        return <DateTimePicker {...props} />;
      case 'time':
        return <TimePicker {...props} />;
      default:
        return <ShortTextField {...props} />;
    }
  };

  const handleInputChange = (value, id) => {
    const _formData = { ...formData };
    if (!_formData[id] || _formData[id].answer === 0) _formData[id].answer = [];
    _formData[id].answer[0] = value;
    setFormData(_formData);
  };

  const handleSubmitForm = () => {
    const newAssignment = {
      ...assignment,
      fields: Object.keys(formData).map(key => formData[key]),
      status: isBefore(new Date(), new Date(assignment.dueDate)) ? 'On time' : 'Late',
    };
    updateAssignment(newAssignment);
  };

  return (
    <ScrollView style={{ paddingHorizontal: 10, marginVertical: 10 }}>
      <Form>
        {Object.keys(formData).map((item, index) => getFormElement(formData[item]))}
        <View style={{ display: 'flex', alignItems: 'flex-end' }}>
          <Button onPress={handleSubmitForm} style={{ marignTop: 10, width: 'auto' }}>
            {isFetching ? <Spinner color='#eee' /> : <Text>Submit</Text>}
          </Button>
        </View>
      </Form>
    </ScrollView>
  );
};

const mapStateToProps = (state, props) => ({
  isFetching: state.assignments.isFetching,
});

const mapDispatchToProps = {
  updateAssignment: assignmentActions.updateAssignment,
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentModal);
