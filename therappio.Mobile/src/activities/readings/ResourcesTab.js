import React, { Component } from 'react';
import * as Linking from 'expo-linking';
import { Container, Content } from 'native-base';
import ActivityCard from '../ActivityCard';
import * as articles from './articles';
import styles from '../../theme/styles';
import { modalConstants } from '../../_constants';

export default class ResourcesTab extends Component {
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
            content={articles.breathingExercise}
            onPress={() => this._openWebsite(articles.breathingExercise.resource)}
          />
          <ActivityCard content={articles.allOrNothing} modal={modalConstants.MARKDOWN_MODAL} />
          {/* <ActivityCard content={articles.alwaysBeingRight} /> */}
          <ActivityCard content={articles.catastrophizing} modal={modalConstants.MARKDOWN_MODAL} />
          <ActivityCard
            content={articles.disqualifyingThePositive}
            modal={modalConstants.MARKDOWN_MODAL}
          />
          <ActivityCard
            content={articles.emotionalReasoning}
            modal={modalConstants.MARKDOWN_MODAL}
          />
          <ActivityCard content={articles.fallacyOfChange} modal={modalConstants.MARKDOWN_MODAL} />
          <ActivityCard
            content={articles.fallacyOfFairness}
            modal={modalConstants.MARKDOWN_MODAL}
          />
          <ActivityCard content={articles.fortuneTelling} modal={modalConstants.MARKDOWN_MODAL} />
          <ActivityCard content={articles.labeling} modal={modalConstants.MARKDOWN_MODAL} />
          {/* <ActivityCard content={articles.magnificationAndMinimization} /> */}
          <ActivityCard content={articles.mentalFilter} modal={modalConstants.MARKDOWN_MODAL} />
          <ActivityCard content={articles.mindReading} modal={modalConstants.MARKDOWN_MODAL} />
          <ActivityCard content={articles.overgeneralizing} modal={modalConstants.MARKDOWN_MODAL} />
          <ActivityCard content={articles.personalizing} modal={modalConstants.MARKDOWN_MODAL} />
          <ActivityCard content={articles.shouldStatements} modal={modalConstants.MARKDOWN_MODAL} />
        </Content>
      </Container>
    );
  }
}
