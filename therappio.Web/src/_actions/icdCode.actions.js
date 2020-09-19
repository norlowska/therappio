import { icdCodeConstants } from '../_constants';
import { icdCodeService } from '../_services';

export const icdCodeActions = {
    fetchIcdCodes,
};

function fetchIcdCodes(codes) {
    return dispatch => {
        dispatch(request());
        icdCodeService
            .getCodes(codes)
            .then(diagnoses => {
                dispatch(success(diagnoses));
            })
            .catch(error => {
                dispatch(failure(error.message));
                // dispatch(alertActions.error(error.toString()));
            });
    };
    function request() {
        return { type: icdCodeConstants.FETCH_CODES_REQUEST };
    }
    function success(diagnoses) {
        return {
            type: icdCodeConstants.FETCH_CODES_SUCCESS,
            diagnoses,
        };
    }
    function failure(error) {
        return { type: icdCodeConstants.FETCH_CODES_FAILURE, error };
    }
}
