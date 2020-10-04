import React, { useState } from 'react';
import { Label, View, H3 } from 'native-base';
import { format } from 'date-fns';
import { DateTimePicker as RNDateTimePicker } from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { onChange } from 'react-native-reanimated';

const DateTimePicker = props => {
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const { question, answer, name, onChange } = props;

  return (
    <TouchableOpacity
      onPress={() => setShowDateTimePicker(true)}
      style={{ marginBottom: 15, marginHorizontal: 10 }}
    >
      <View>
        <H3 style={{ color: '#888888', fontSize: 15, marginBottom: 5 }}>{question}</H3>
      </View>
      {showDateTimePicker ? (
        <RNDateTimePicker
          value={answer && answer.length > 0 ? new Date(answer[0]) : new Date()}
          mode={'datetime'}
          onChange={value => onChange(value, name)}
          style={{ marginBottom: 0 }}
          name={name}
        />
      ) : (
        <Label style={{ fontSize: 15 }}>
          {format(answer && answer.length > 0 ? new Date(answer[0]) : new Date(), 'd MMM yyyy')}
        </Label>
      )}
    </TouchableOpacity>
  );
};

export default DateTimePicker;
