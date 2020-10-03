import { modalConstants } from '../_constants';

export const modalActions = {
  showModal,
  hideModal,
};

function showModal(type, props = null, title = '') {
  console.log('show modal action', type, props, title);
  return { type: modalConstants.SHOW_MODAL, modalType: type, modalProps: props, modalTitle: title };
}

function hideModal() {
  return { type: modalConstants.HIDE_MODAL };
}
