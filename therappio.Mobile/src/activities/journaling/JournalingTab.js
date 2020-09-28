import React, { Component } from "react";
import { Container, Content } from "native-base";
import ActivityCard from "../ActivityCard";
import MoodMeterModal from "./MoodMeterModal";
import DiaryModal from "./DiaryModal";
import GratitudeJournalModal from "./GratitudeJournalModal";
import styles from "../../theme/styles";
import ModalSetup from "../../components/ModalSetup";

export const MOOD_METER = <MoodMeterModal />;
export const DIARY = <DiaryModal />;
export const GRATITUDE_JOURNAL = <GratitudeJournalModal />;

export default class JournalingTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      modalContent: <></>
    };

    this._onCardPress = this._onCardPress.bind(this);
    this._onModalClose = this._onModalClose.bind(this);
  }
  _onCardPress(content) {
    this.setState({ isModalVisible: true, modalContent: content });
  }

  _onModalClose() {
    this.setState({ isModalVisible: false });
  }

  render() {
    return (
      <Container>
        <Content style={styles.cardList}>
          <ModalSetup
            visible={this.state.isModalVisible}
            onClose={this._onModalClose}
          >
            {this.state.modalContent}
          </ModalSetup>

          <ActivityCard
            content={{
              title: "Mood Meter",
              description: "Identify your emotions and what caused them"
            }}
            onPress={() => this._onCardPress(MOOD_METER)}
          />
          <ActivityCard
            content={{
              title: "Diary",
              description: "Record your thoughts and memories"
            }}
            onPress={() => this._onCardPress(DIARY)}
          />
          <ActivityCard
            content={{
              title: "Gratitude Journal",
              description:
                "Focus on the positive and list 3 things you are grateful for"
            }}
            onPress={() => this._onCardPress(GRATITUDE_JOURNAL)}
          />
        </Content>
      </Container>
    );
  }
}
