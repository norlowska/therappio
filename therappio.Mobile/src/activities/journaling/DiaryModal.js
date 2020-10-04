import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Form, Text, Item, Textarea, Button, Spinner } from 'native-base';
import { journalRecordActions } from '../../_actions';
import styles from '../../theme/styles';

const DiaryModal = ({
  createJournalRecord,
  updateJournalRecord,
  user,
  isFetching,
  editMode,
  journalRecord,
}) => {
  const [content, setContent] = useState('');

  const handleSavePress = e => {
    const newRecord = {
      createdAt: Date.now(),
      type: 'diary',
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
    if (editMode) setContent(journalRecord.content);
  }, []);

  return (
    <View>
      <Text style={[styles.title, { marginBottom: 20, fontSize: 22 }]}>
        {`What's on your mind?`}
      </Text>
      <Form>
        <Item>
          <Textarea
            bordered
            rowSpan={8}
            style={{ width: '100%', borderRadius: 4, paddingVertical: 10 }}
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

export default connect(mapStateToProps, mapDispatchToProps)(DiaryModal);
