import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, Form, Text, Item, Textarea, Button } from 'native-base';
import { journalRecordActions } from '../../_actions';
import styles from '../../theme/styles';

const DiaryModal = ({ createJournalRecord }) => {
  const [content, setContent] = useState('');

  const handleSavePress = e => {
    const newRecord = {
      createdAt: Date.now(),
      type: 'diary',
      content,
    };
    createJournalRecord(newRecord);
  };

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
        <Text>Save</Text>
      </Button>
    </View>
  );
};

const mapDispatchToProps = {
  createJournalRecord: journalRecordActions.createJournalRecord,
};

export default connect(null, mapDispatchToProps)(DiaryModal);
