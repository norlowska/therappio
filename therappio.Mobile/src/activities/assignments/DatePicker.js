import React, { useState } from 'react';
import { Label, View, H3 } from 'native-base';
import { format } from 'date-fns';
import { DateTimePicker } from '@react-native-community/datetimepicker';
import { onChange } from 'react-native-reanimated';

const DatePicker = props => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { question, answer, name } = props;

  return (
    <View
      onPress={() => setShowDatePicker(true)}
      style={{ marginBottom: 15, marginHorizontal: 10 }}
    >
      <View>
        <H3 style={{ color: '#888888', fontSize: 15, marginBottom: 5 }}>{question}</H3>
      </View>
      {showDatePicker ? (
        <DateTimePicker
          value={answer && answer.length > 0 ? new Date(answer[0]) : new Date()}
          mode={'date'}
          onChange={value => onChange(value, name)}
          style={{ marginBottom: 0 }}
        />
      ) : (
        <Label style={{ fontSize: 15 }}>
          {format(answer && answer.length > 0 ? new Date(answer[0]) : new Date(), 'd MMM yyyy')}
        </Label>
      )}
    </View>
  );
};

export default DatePicker;
