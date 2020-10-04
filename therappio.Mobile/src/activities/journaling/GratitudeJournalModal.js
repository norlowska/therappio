import React, { useState, useEffect } from 'react';
import { View, Form, Text, Item, Textarea, Button, Spinner } from 'native-base';
import styles from '../../theme/styles';
import { journalRecordActions } from '../../_actions';
import { connect } from 'react-redux';

const GratitudeJournalModal = ({
  createJournalRecord,
  updateJournalRecord,
  isFetching,
  editMode,
  journalRecord,
}) => {
  const [content, setContent] = useState('');

  const handleSavePress = e => {
    const newRecord = {
      createdAt: Date.now(),
      type: 'gratitude',
      content,
    };

    if (editMode) {
      updateJournalRecord({
        ...newRecord,
        createdAt: journalRecord.createdAt,
        modifiedAt: Date.now(),
        content,
        id: journalRecord.id,
      });
    } else createJournalRecord(newRecord);
  };

  useEffect(() => {
    if (editMode) {
      setContent(journalRecord.content);
    }
  }, []);

  return (
    <View>
      <Text style={[styles.title, { marginBottom: 20, marginHorizontal: 20, fontSize: 17 }]}>
        {`Writing gratitude will help you identify positive aspects of even the worst days.`}
      </Text>
      <Text style={[styles.title, { marginBottom: 20, marginHorizontal: 20, fontSize: 22 }]}>
        {`Today I'm grateful for`}
      </Text>
      <Form style={{ alignSelf: 'center' }}>
        <Item>
          <Textarea
            bordered
            rowSpan={8}
            style={{
              width: '100%',
              borderRadius: 4,
              paddingVertical: 10,
            }}
            onChangeText={text => setContent(text)}
            defaultValue={content}
          />
        </Item>
      </Form>
      <Button
        style={{
          marginTop: 30,
          alignSelf: 'flex-end',
          paddingHorizontal: 20,
        }}
        onPress={handleSavePress}
      >
        {isFetching ? <Spinner color='#eee'></Spinner> : <Text>Save</Text>}
      </Button>
    </View>
  );
};

const mapStateToProps = (state, props) => ({
  isFetching: state.journalRecords.isFetching,
});

const mapDispatchToProps = {
  createJournalRecord: journalRecordActions.createJournalRecord,
  updateJournalRecord: journalRecordActions.updateJournalRecord,
};

export default connect(mapStateToProps, mapDispatchToProps)(GratitudeJournalModal);
