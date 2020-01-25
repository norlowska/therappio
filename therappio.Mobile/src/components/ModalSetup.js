import React from "react";
import PropTypes from "prop-types";
import { Modal, TouchableOpacity } from "react-native";
import { Icon, View, Container, Content, Button } from "native-base";
import styles from "../theme/styles";

const ModalSetup = ({ visible, children, onClose }) => {
  return (
    <Modal visible={visible} transparent={false} animationType="slide">
      <Container style={styles.modal}>
        {/* <TouchableOpacity onPress={onClose} style={styles.closeModal}> */}
        <View style={styles.closeModal}>
          <Button onPress={onClose} transparent>
            <Icon
              name="close"
              type="MaterialCommunityIcons"
              style={{
                fontSize: 34,
                color: "#222"
              }}
            />
          </Button>
        </View>
        {/* </TouchableOpacity> */}
        <View style={styles.modalContent}>{children}</View>
      </Container>
    </Modal>
  );
};

ModalSetup.propTypes = {
  visible: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  onClose: PropTypes.func.isRequired
};

export default ModalSetup;
