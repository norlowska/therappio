import { modalConstants } from '../_constants';

export const modalActions = {
  showModal,
  hideModal,
};

function showModal(type, props = null) {
  return { type: modalConstants.SHOW_MODAL, modalType: type, modalProps: props };
}

function hideModal() {
  return { type: modalConstants.HIDE_MODAL };
}
