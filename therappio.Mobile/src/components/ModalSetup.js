import React from 'react';
import PropTypes from 'prop-types';
import { Modal, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Icon, View, Container, Content, Button } from 'native-base';
import styles from '../theme/styles';
import { DiaryModal, GratitudeJournalModal, MoodMeterModal } from '../activities/journaling';
import { modalConstants } from '../_constants';
import MarkdownModal from './MarkdownModal';
import { modalActions } from '../_actions';

const MODAL_COMPONENTS = {
  [modalConstants.DIARY_MODAL]: DiaryModal,
  [modalConstants.GRATITUDE_JOURNAL_MODAL]: GratitudeJournalModal,
  [modalConstants.MOOD_METER_MODAL]: MoodMeterModal,
  [modalConstants.MARKDOWN_MODAL]: MarkdownModal,
};

const ModalSetup = ({ modalType, modalProps, hideModal }) => {
  if (!modalType) return null;

  const SpecificModal = MODAL_COMPONENTS[modalType];

  return (
    <Modal visible={true} transparent={false} animationType='slide'>
      <Container style={styles.modal}>
        <View style={styles.closeModal}>
          <Button onPress={hideModal} transparent>
            <Icon
              name='close'
              type='MaterialCommunityIcons'
              style={{
                fontSize: 34,
                color: '#222',
              }}
            />
          </Button>
        </View>
        {/* </TouchableOpacity> */}
        <View style={styles.modalContent}>
          <SpecificModal {...modalProps} />
        </View>
      </Container>
    </Modal>
  );
};

ModalSetup.propTypes = {
  modal: PropTypes.shape({ modalType: PropTypes.string, modalProps: PropTypes.object }),
};

export default connect(state => state.modal, { hideModal: modalActions.hideModal })(ModalSetup);
