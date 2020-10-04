import React from 'react';
import PropTypes from 'prop-types';
import { Modal, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Icon, View, Container, Content, Button, Text } from 'native-base';
import styles from '../theme/styles';
import { DiaryModal, GratitudeJournalModal, MoodMeterModal } from '../activities/journaling';
import { modalConstants } from '../_constants';
import MarkdownModal from './MarkdownModal';
import { modalActions } from '../_actions';
import EditProfileModal from './EditProfileModal';
import AssignmentModal from '../activities/assignments/AssignmentModal';

const MODAL_COMPONENTS = {
  [modalConstants.DIARY_MODAL]: DiaryModal,
  [modalConstants.GRATITUDE_JOURNAL_MODAL]: GratitudeJournalModal,
  [modalConstants.MOOD_METER_MODAL]: MoodMeterModal,
  [modalConstants.MARKDOWN_MODAL]: MarkdownModal,
  [modalConstants.EDIT_PROFILE_MODAL]: EditProfileModal,
  [modalConstants.ASSIGNMENT_MODAL]: AssignmentModal,
};

const ModalSetup = ({ modalType, modalProps, hideModal, modalTitle }) => {
  if (!modalType) return null;

  const SpecificModal = MODAL_COMPONENTS[modalType];
  return (
    <Modal visible={true} transparent={false} animationType='slide'>
      <Container style={styles.modal}>
        <View
          style={[
            styles.modalHeader,
            { justifyContent: modalTitle.length > 0 ? 'space-between' : 'flex-end' },
          ]}
        >
          {!!modalTitle && (
            <View>
              <Text style={styles.modalTitle}>{modalTitle}</Text>
            </View>
          )}
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
