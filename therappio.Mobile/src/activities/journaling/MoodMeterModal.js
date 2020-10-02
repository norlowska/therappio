import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Form, Text, Item, Input, Button, Spinner } from 'native-base';
import Options from '../../components/Options';
import { moodRecordActions } from '../../_actions';
import styles from '../../theme/styles';
import { connect } from 'react-redux';

const moodQuadrants = {
  1: {
    value: 1,
    name: 'High Energy, Pleasant',
    color: '#ffeb3b',
    moods: ['alert', 'excited', 'elated', 'happy'],
  },
  2: {
    value: 2,
    name: 'High Energy, Unpleasant',
    color: '#f44336',
    moods: ['tense', 'nervous', 'stressed', 'upset'],
  },
  3: {
    value: 3,
    name: 'Low Energy, Unpleasant',
    color: '#42a5f5',
    moods: ['sad', 'depressed', 'bored', 'fatigued'],
  },
  4: {
    value: 4,
    name: 'Low Energy, Pleasant',
    color: '#66bb6a',
    moods: ['content', 'serene', 'relaxed', 'calm'],
  },
};

const SelectQuadrant = ({ selectQuadrant, isFetching }) => {
  return (
    <>
      <Text style={[styles.title, { marginBottom: 20, fontSize: 22 }]}>How are you feeling?</Text>
      <View style={styles.quadrantsContainer}>
        {[moodQuadrants[2], moodQuadrants[1], moodQuadrants[3], moodQuadrants[4]].map(quadrant => (
          <TouchableOpacity
            key={quadrant.value}
            style={[styles.quadrant, { backgroundColor: quadrant.color }]}
            onPress={() => selectQuadrant(quadrant.value)}
          >
            <View>
              {quadrant.name.split(',').map((name, index) => (
                <Text
                  key={index}
                  style={[styles.quadrantName, quadrant.value === 1 ? { color: '#616161' } : null]}
                >
                  {name}
                </Text>
              ))}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

const DescribeMood = ({ loading, quadrant, saveMood }) => {
  const [mood, setMood] = useState('');
  const [comment, setComment] = useState('');
  const { color, value, moods } = moodQuadrants[quadrant];

  useEffect(() => {
    console.log(mood);
  }, [mood]);

  return (
    <>
      <Text style={[styles.title, { marginBottom: 15 }]}>I feel</Text>
      <View>
        <Options quadrant={quadrant} options={moods} color={color} onChange={setMood} />
      </View>
      <View>
        <Text style={[styles.title, { marginTop: 20, fontSize: 22 }]}>Comments</Text>
        <Form>
          <Item onChangeText={text => setComment(text)}>
            <Input style={{ borderColor: color }} />
          </Item>
        </Form>
      </View>
      <Button
        style={[
          {
            backgroundColor: color,
            marginTop: 30,
            alignSelf: 'flex-end',
            paddingHorizontal: 20,
            elevation: 5,
            shadowColor: '#000',
            shadowRadius: 3.84,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
          },
        ]}
        onPress={() => saveMood(mood, comment)}
      >
        {loading ? (
          <Spinner color='#eee' />
        ) : (
          <Text
            style={{
              textShadowColor: '#7a7a7a',
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 3,
            }}
          >
            Save
          </Text>
        )}
      </Button>
    </>
  );
};

const MoodMeterModal = ({ createMoodRecord, isFetching }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [quadrant, setQuadrant] = useState(null);

  useEffect(() => {
    if (quadrant) setCurrentStep(2);
  }, [quadrant]);

  const saveMood = (moodName, comment) => {
    console.log(moodName, quadrant, comment);
    const newMoodRecord = {
      createdAt: Date.now(),
      mood: {
        name: moodName,
        quadrant,
      },
      comment,
    };

    createMoodRecord(newMoodRecord);
  };

  const getCurrentContent = () => {
    switch (currentStep) {
      case 1:
        return <SelectQuadrant selectQuadrant={setQuadrant} />;
      case 2:
        return <DescribeMood loading={isFetching} saveMood={saveMood} quadrant={quadrant} />;
    }
  };
  return getCurrentContent();
};

const mapDispatchToProps = {
  createMoodRecord: moodRecordActions.createMoodRecord,
};

export default connect(
  state => ({
    isFetching: state.moodRecords.isFetching,
  }),
  mapDispatchToProps
)(MoodMeterModal);
