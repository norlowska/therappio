import { actions } from 'react-table';
import { assignmentConstants, clientConstants } from '../_constants';
import { compareValues } from '../_utilities';

const initialState = {
    isFetching: false,
    byId: {},
    allIds: [],
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
                allIds: Object.keys(action.clients),
            };
        }

        case clientConstants.FETCH_CLIENTS_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.error,
            };
        case assignmentConstants.FETCH_ASSIGNMENTS_SUCCESS:
            const assignments = action.assignments.map();
            const byId = { ...state.byId };
            assignments.forEach(assignment => {
                const { assignments: clientsAssignments } = byId[
                    assignment.client._id
                ];
                clientsAssignments = clientsAssignments.length
                    ? [...clientsAssignments, assignment._id]
                    : [assignment._id];
                byId[assignment.client._id].assignments = clientsAssignments;
            });
            return {
                ...state,
                byId,
            };
        default:
            return state;
    }
}
