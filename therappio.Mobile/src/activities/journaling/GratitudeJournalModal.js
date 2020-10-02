import React, { useState } from 'react';
import { View, Form, Text, Item, Textarea, Button } from 'native-base';
import styles from '../../theme/styles';
import { moodRecordActions } from '../../_actions';
import { connect } from 'react-redux';

const GratitudeJournalModal = ({ createJournalRecord }) => {
  const [content, setContent] = useState('');

  const handleSavePress = e => {
    const newRecord = {
      createdAt: Date.now(),
      type: 'gratitude',
      content,
    };
    createJournalRecord(newRecord);
  };

  return (
    <View>
      <Text style={[styles.title, { marginBottom: 20, fontSize: 17 }]}>
        {`Writing gratitude will help you identify positive aspects of even the worst days.`}
      </Text>
      <Text style={[styles.title, { marginBottom: 20, fontSize: 22 }]}>
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
        <Text>Save</Text>
      </Button>
    </View>
  );
};

const mapDispatchToProps = {
  createJournalRecord: moodRecordActions.createJournalRecord,
};

export default connect(null, mapDispatchToProps)(GratitudeJournalModal);
