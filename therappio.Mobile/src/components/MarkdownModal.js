import React from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import Markdown from "react-native-markdown-display";
import ModalSetup from "./ModalSetup";

const markdownStyle = StyleSheet.create({
  heading1: {
    fontFamily: "Raleway-Bold",
    fontSize: 32,
    color: "#2f95dc",
    marginBottom: 35
  },
  heading2: {
    fontFamily: "Raleway-SemiBold",
    fontSize: 24,
    marginTop: 20,
    marginBottom: 10,
    color: "#2f95dc"
  },
  paragraph: {
    color: "#333",
    fontSize: 15,
    marginBottom: 40,
    fontFamily: "Raleway-Light"
  }
});

const MarkdownModal = ({ visible, content, onClose }) => {
  return (
    <ModalSetup visible={visible} onClose={onClose}>
      <Markdown style={markdownStyle}>{content[0]}</Markdown>
    </ModalSetup>
  );
};

MarkdownModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  content: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClose: PropTypes.func.isRequired
};

export default MarkdownModal;
