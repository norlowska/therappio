import React, { Component } from 'react';
import * as Linking from 'expo-linking';
import { Container, Content } from 'native-base';
import ActivityCard from '../ActivityCard';
import BigFiveTest from './BigFiveTest';
import HighlySensitivePersonTest from './HighlySensitivePersonTest';
import PatientHealthQuestionnaire from './PatientHealthQuestionnaire';
import AnxietyTest from './AnxietyTest';
import DepressionTest from './DepressionTest';
import styles from '../../theme/styles';

const BIG_FIVE_TEST = <BigFiveTest />;
const HSP_TEST = <HighlySensitivePersonTest />;
const PATIENT_HEALTH_QUESTIONNAIRE = <PatientHealthQuestionnaire />;
const ANXIETY_TEST = <AnxietyTest />;
const DEPRESSION_TEST = <DepressionTest />;

export default class AssessmentsTab extends Component {
  constructor(props) {
    super(props);

    this._openWebsite = this._openWebsite.bind(this);
  }

  _openWebsite(URL) {
    Linking.openURL(URL);
  }
  render() {
    return (
      <Container>
        <Content style={styles.cardList}>
          <ActivityCard
            content={{
              title: '16 Personalities Test',
              description:
                'Find out your personality type to better understand yourself and other people',
            }}
            onPress={() =>
              this._openWebsite('https://www.16personalities.com/free-personality-test')
            }
          />
          <ActivityCard
            content={{
              title: 'The Big Five Personality Test',
              description:
                'See how you score for Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism, and understand how these factors affect your life, work and relationships.',
            }}
            onPress={() => this._onCardPress(BIG_FIVE_TEST)}
          />
          <ActivityCard
            content={{
              title: 'Are You Highly Sensitivie?',
              description:
                'Do you feel everything in the world around them more intensely, from emotions to sights and sounds? Take this test to find out if you are Highly Sensitive Person.',
            }}
            onPress={() => this._onCardPress(HSP_TEST)}
          />
          <ActivityCard
            content={{
              title: 'Health Questionnaire',
              description: `Monitor the severity of depression`,
            }}
            onPress={() => this._onCardPress(PATIENT_HEALTH_QUESTIONNAIRE)}
          />
          <ActivityCard
            content={{
              title: 'Anxiety Test',
              description:
                'Are you missing out on opportunities and happiness because of fears and worries? Is anxiety interfering with your life?',
            }}
            onPress={() => this._onCardPress(ANXIETY_TEST)}
          />
          <ActivityCard
            content={{
              title: 'Depression Test',
              description: `At times everybody gets down in the dumps, but if life is consistently getting you down and your lows are making it hard to function, you may be depressed. 
                Find out whether your slump is critical with this depression test.`,
            }}
            onPress={() => this._onCardPress(DEPRESSION_TEST)}
          />
        </Content>
      </Container>
    );
  }
}
