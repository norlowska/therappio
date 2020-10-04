import React from 'react';
import { Picker, H3, View } from 'native-base';

const SelectField = props => {
  const { question, answer, options, name, onChange } = props;
  return (
    <View style={{ marginBottom: 15, marginHorizontal: 5 }}>
      <View>
        <H3 style={{ color: '#888888', fontSize: 15, marginBottom: 5 }}>{question}</H3>
      </View>
      <Picker selectedValue={answer && answer.length > 0 ? answer[0] : null}>
        {options.map((item, index) => (
          <Picker.Item key={index} label={item} value={item} />
        ))}
      </Picker>
    </View>
  );
};

export default SelectField;
