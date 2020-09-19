import { clientConstants, diagnosisConstants } from '../_constants';

const initialState = {
    isFetching: false,
    byId: {},
    errorMessage: '',
};

export function clients(state = initialState, action) {
    switch (action.type) {
        case clientConstants.FETCH_CLIENTS_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case clientConstants.FETCH_CLIENTS_SUCCESS: {
            const reduce = action.clients.reduce(
                (map, client) => ((map[client._id] = client), map),
                {}
            );
            return {
                ...state,
                isFetching: false,
                byId: action.clients.reduce(
                    (map, client) => ((map[client._id] = client), map),
                    {}
                ),
            };
        }

        case clientConstants.FETCH_CLIENTS_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.error,
            };

        case clientConstants.UPDATE_CLIENT_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case clientConstants.UPDATE_CLIENT_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                byId: { ...state.byId, [action.client._id]: action.client },
            };
        }

        case clientConstants.UPDATE_CLIENT_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.error,
            };

        case diagnosisConstants.CREATE_DIAGNOSIS_SUCCESS: {
            console.log('CLIENT Create diagnosis success');

            const newPatient = {
                ...state.byId[action.diagnosis.client],
            };
            newPatient.diagnosis = action.diagnosis._id;

            return {
                ...state,
                isFetching: false,
                byId: {
                    ...state.byId,
                    [action.diagnosis.client]: newPatient,
                },
            };
        }
        default:
            return state;
    }
}
