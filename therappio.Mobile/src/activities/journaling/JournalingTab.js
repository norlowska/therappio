import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import ActivityCard from '../ActivityCard';
import styles from '../../theme/styles';
import { modalConstants } from '../../_constants';

export default class JournalingTab extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Content style={styles.cardList}>
          <ActivityCard
            content={{
              title: 'Mood Meter',
              description: 'Identify your emotions and what caused them',
            }}
            modal={modalConstants.MOOD_METER_MODAL}
          />
          <ActivityCard
            content={{
              title: 'Diary',
              description: 'Record your thoughts and memories',
            }}
            modal={modalConstants.DIARY_MODAL}
          />
          <ActivityCard
            content={{
              title: 'Gratitude Journal',
              description: 'Focus on the positive and list 3 things you are grateful for',
            }}
            modal={modalConstants.GRATITUDE_JOURNAL_MODAL}
          />
        </Content>
      </Container>
    );
  }
}
