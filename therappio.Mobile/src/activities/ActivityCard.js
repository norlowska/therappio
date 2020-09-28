import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Card, View, Text } from "native-base";
import Markdown from "react-native-markdown-display";

import styles from "../theme/styles";

const markdownStyle = StyleSheet.create({
  paragraph: {
    color: "#333",
    fontSize: 13,
    fontFamily: "Raleway-Light"
  }
});

const ActivityCard = ({ content, onPress }) => {
  const handleClick = () => {
    onPress(content.pages);
  };

  return (
    <TouchableOpacity onPress={handleClick}>
      <Card pointerEvents="none" style={styles.card}>
        {/* <View>
        <Text>{content.icon}</Text>
      </View> */}
        <View>
          <Text style={styles.primaryTitle}>{content.title}</Text>
          {content.description ? (
            <Markdown style={markdownStyle}>{content.description}</Markdown>
          ) : null}
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
    tags: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  onPress: PropTypes.func.isRequired
};

export default ActivityCard;
