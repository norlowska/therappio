import React, { Component } from 'react';
import * as Linking from 'expo-linking';
import { Container, Content } from 'native-base';
import ActivityCard from '../ActivityCard';
import MarkdownModal from '../../components/MarkdownModal';
import * as articles from './articles';
import styles from '../../theme/styles';

export default class ResourcesTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      modalData: [''],
    };

    this._onCardPress = this._onCardPress.bind(this);
    this._onModalClose = this._onModalClose.bind(this);
    this._openWebsite = this._openWebsite.bind(this);
  }

  _openWebsite(URL) {
    Linking.openURL(URL);
  }

  _onCardPress(article) {
    this.setState({ isModalVisible: true, modalData: article });
  }

  _onModalClose() {
    this.setState({ isModalVisible: false });
  }

  render() {
    return (
      <Container>
        <Content style={styles.cardList}>
          <MarkdownModal
            visible={this.state.isModalVisible}
            content={this.state.modalData}
            onClose={this._onModalClose}
          />
          <ActivityCard
            content={articles.breathingExercise}
            onPress={() => this._openWebsite(articles.breathingExercise.resource)}
          />
          <ActivityCard content={articles.allOrNothing} onPress={this._onCardPress} />
          {/* <ActivityCard content={articles.alwaysBeingRight} /> */}
          <ActivityCard content={articles.catastrophizing} onPress={this._onCardPress} />
          <ActivityCard content={articles.disqualifyingThePositive} onPress={this._onCardPress} />
          <ActivityCard content={articles.emotionalReasoning} onPress={this._onCardPress} />
          <ActivityCard content={articles.fallacyOfChange} onPress={this._onCardPress} />
          <ActivityCard content={articles.fallacyOfFairness} onPress={this._onCardPress} />
          <ActivityCard content={articles.fortuneTelling} onPress={this._onCardPress} />
          <ActivityCard content={articles.labeling} onPress={this._onCardPress} />
          {/* <ActivityCard content={articles.magnificationAndMinimization} /> */}
          <ActivityCard content={articles.mentalFilter} onPress={this._onCardPress} />
          <ActivityCard content={articles.mindReading} onPress={this._onCardPress} />
          <ActivityCard content={articles.overgeneralizing} onPress={this._onCardPress} />
          <ActivityCard content={articles.personalizing} onPress={this._onCardPress} />
          <ActivityCard content={articles.shouldStatements} onPress={this._onCardPress} />
        </Content>
      </Container>
    );
  }
}
