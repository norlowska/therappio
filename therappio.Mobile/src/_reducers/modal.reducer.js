import { modalConstants } from '../_constants';

const initialState = {
  modalType: null,
  modalProps: {},
};

export function modal(state = initialState, action) {
  switch (action.type) {
    case modalConstants.SHOW_MODAL:
      return {
        modalType: action.modalType,
        modalProps: action.modalProps,
      };
    case modalConstants.HIDE_MODAL:
      return initialState;
    default:
      return state;
  }
}
