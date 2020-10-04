import React from 'react';
import { Input, H3, View, Item } from 'native-base';

const ShortTextField = props => {
  const { question, answer, onChange, name } = props;

  return (
    <View style={{ marginBottom: 15, marginHorizontal: 5 }}>
      <View>
        <H3 style={{ color: '#888888', fontSize: 15, marginBottom: 5 }}>{question}</H3>
      </View>
      <Item>
        <Input
          onChangeText={text => onChange(text, name)}
          defaultValue={answer && answer.length > 0 ? answer[0] : ''}
        />
      </Item>
    </View>
  );
};

export default ShortTextField;
