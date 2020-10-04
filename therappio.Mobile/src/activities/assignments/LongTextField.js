import React from 'react';
import { Textarea, H3, View, Item } from 'native-base';

const LongTextField = props => {
  const { question, answer, name, onChange } = props;

  return (
    <View style={{ marginHorizontal: 5, marginBottom: 15 }}>
      <View>
        <H3 style={{ color: '#888888', fontSize: 15, marginBottom: 5 }}>{question}</H3>
      </View>
      <Textarea
        rowSpan={5}
        bordered
        onChangeText={text => onChange(text, name)}
        name={name}
        value={answer && answer.length > 0 ? answer[0] : ''}
        style={{ paddingVertical: 10, borderRadius: 5 }}
      />
    </View>
  );
};

export default LongTextField;
