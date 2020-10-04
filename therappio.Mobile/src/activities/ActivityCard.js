import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Card, View, Text, Badge } from 'native-base';
import Markdown from 'react-native-markdown-display';
import { modalActions } from '../_actions';
import styles from '../theme/styles';
import Colors from '../theme/Colors';

const markdownStyle = StyleSheet.create({
  paragraph: {
    color: '#333',
    fontSize: 13,
    fontFamily: 'Raleway-Light',
  },
});

const ActivityCard = ({ content, onPress, modal, showModal }) => {
  console.log('activity card', content);
  const handleClick = () => {
    if (modal) showModal(modal, { content: content.pages });
    else if (onPress) onPress();
  };

  const getTag = tag => {
    const words = tag.split('-').map(item => item.charAt(0).toUpperCase() + item.substring(1));
    return '#' + words.join('');
  };

  return (
    <TouchableOpacity onPress={handleClick}>
      <Card pointerEvents='none' style={styles.card}>
        {/* <View>
        <Text>{content.icon}</Text>
      </View> */}
        <View>
          <Text style={styles.primaryTitle}>{content.title}</Text>
          {content.description ? (
            <Markdown style={markdownStyle}>{content.description}</Markdown>
          ) : null}
          {content.tags && content.tags.length > 0 && (
            <Badge info style={{ backgroundColor: '#DBA344', marginTop: 10 }}>
              <Text style={{ color: '#616161', fontSize: 13, fontWeight: '600' }}>
                {getTag(content.tags[0])}
              </Text>
            </Badge>
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );
};

ActivityCard.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    pages: PropTypes.arrayOf(PropTypes.string),
    // icon: PropTypes.any,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  modal: PropTypes.string,
  onPress: PropTypes.func,
};

export default connect(null, { showModal: modalActions.showModal })(ActivityCard);
