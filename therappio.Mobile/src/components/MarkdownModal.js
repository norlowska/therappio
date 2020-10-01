import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { Button, Text } from 'native-base';
import { modalActions } from '../_actions';

const markdownStyle = StyleSheet.create({
  heading1: {
    fontFamily: 'Raleway-Bold',
    fontSize: 32,
    color: '#2f95dc',
    marginBottom: 35,
  },
  heading2: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 24,
    marginTop: 20,
    marginBottom: 10,
    color: '#2f95dc',
  },
  paragraph: {
    color: '#333',
    fontSize: 15,
    marginBottom: 40,
    fontFamily: 'Raleway-Light',
  },
});

const MarkdownModal = ({ content, hideModal }) => {
  const getButtonText = () => {
    const random = Math.floor(Math.random() * 2);
    switch (random) {
      case 0:
        return 'Got it!';
      case 1:
        return 'Ok';
    }
  };

  return (
    <>
      {content.map((item, index) => (
        <Markdown key={index} style={markdownStyle}>
          {item}
        </Markdown>
      ))}
      <Button
        style={{
          marginTop: 30,
          marginBottom: 5,
          alignSelf: 'flex-end',
          paddingHorizontal: 20,
        }}
        onPress={hideModal}
      >
        <Text>{getButtonText()}</Text>
      </Button>
    </>
  );
};

MarkdownModal.propTypes = {
  content: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(null, { hideModal: modalActions.hideModal })(MarkdownModal);
